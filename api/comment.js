// ══════════ Clear Build Consulting · /api/comment ══════════
// The single stateless relay. Holds the only secret (Sites.Selected app-only).
// Verifies an HMAC bearer link, validates the comment, writes one row to the
// CB-Comments Microsoft List. Fails loud. No DB, no second integration.
//
// Required Vercel env vars:
//   CB_TENANT_ID, CB_GRAPH_CLIENT_ID, CB_GRAPH_CLIENT_SECRET,
//   CB_SITE_ID, CB_LIST_ID, CB_TOKEN_SECRET
// Optional: CB_TEAMS_WEBHOOK, CB_ALLOWED_ANCHORS (comma list; else pattern check)

const crypto = require("crypto");

const ANCHOR_RE = /^(?:[OE]-\d{2}|PANEL-\d+|DOC)$/;     // H1 shape guard
const MAX_BODY = 4000, MAX_QUOTE = 1000;

// in-memory, module-scoped, ephemeral. Loss is harmless (D-10 / section 6.1 #4).
const tokenHits = new Map();                            // tokenSig -> [timestamps]
let cachedToken = null, cachedExp = 0;

function b64urlDecode(s){ return Buffer.from(s.replace(/-/g,"+").replace(/_/g,"/"), "base64").toString("utf8"); }

function verifyToken(token, secret){
  if(!token || token.indexOf(".") < 0) return null;
  const [payload, sig] = token.split(".");
  const expect = crypto.createHmac("sha256", secret).update(payload).digest("base64")
    .replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
  // constant-time compare
  const a = Buffer.from(sig), b = Buffer.from(expect);
  if(a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let claims; try{ claims = JSON.parse(b64urlDecode(payload)); }catch(_){ return null; }
  if(claims.exp && Date.now()/1000 > claims.exp) return null;       // expired link
  return claims;                                                     // {eng, artefact, author, authorEmail, exp}
}

function rateLimited(sig){
  const now = Date.now(), win = 10*60*1000, cap = 20;
  const hits = (tokenHits.get(sig) || []).filter(t => now - t < win);
  hits.push(now); tokenHits.set(sig, hits);
  return hits.length > cap;
}

async function graphAppToken(){
  if(cachedToken && Date.now() < cachedExp) return cachedToken;
  const body = new URLSearchParams({
    client_id: process.env.CB_GRAPH_CLIENT_ID,
    client_secret: process.env.CB_GRAPH_CLIENT_SECRET,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials"
  });
  const r = await fetch(`https://login.microsoftonline.com/${process.env.CB_TENANT_ID}/oauth2/v2.0/token`,
    { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body });
  if(!r.ok) throw new Error("token "+r.status);
  const j = await r.json();
  cachedToken = j.access_token; cachedExp = Date.now() + (j.expires_in-300)*1000;  // ~55 min
  return cachedToken;
}

async function readBody(req){
  if(req.body){ return typeof req.body === "string" ? JSON.parse(req.body) : req.body; }
  return await new Promise((res, rej) => {
    let d=""; req.on("data",c=>d+=c); req.on("end",()=>{ try{res(JSON.parse(d||"{}"));}catch(e){rej(e);} }); req.on("error",rej);
  });
}

module.exports = async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({error:"method"});
  let p; try{ p = await readBody(req); }catch(_){ return res.status(400).json({error:"bad json"}); }

  const secret = process.env.CB_TOKEN_SECRET;
  const claims = verifyToken(p.token, secret);
  if(!claims) return res.status(401).json({error:"bad token"});                 // biggest spam filter
  if(claims.eng !== p.engagement || claims.artefact !== p.artefact)
    return res.status(401).json({error:"token scope"});                         // token bound to its artefact

  const sig = (p.token.split(".")[1]||"").slice(0,32);
  if(rateLimited(sig)) return res.status(429).json({error:"rate"});

  // validation
  const anchor = String(p.anchor||"");
  const allowEnv = (process.env.CB_ALLOWED_ANCHORS||"").split(",").map(s=>s.trim()).filter(Boolean);
  const anchorOk = allowEnv.length ? allowEnv.includes(anchor) : ANCHOR_RE.test(anchor);
  if(!anchorOk) return res.status(400).json({error:"anchor"});
  const body = String(p.body||"").slice(0, MAX_BODY).trim();
  if(!body) return res.status(400).json({error:"empty"});
  const quote = String(p.quote||"").slice(0, MAX_QUOTE);
  const author = claims.author || String(p.author||"").slice(0,80);             // token is authoritative
  const now = new Date().toISOString();

  const fields = {
    Title: `${p.artefact}:${anchor}`,
    ClientId: String(p.clientId||"").slice(0,64),
    Engagement: String(p.engagement).slice(0,64),
    Artefact: String(p.artefact).slice(0,128),
    Anchor: anchor,
    AnchorLabel: String(p.anchorLabel||"").slice(0,256),
    Quote: quote,                          // stored as text, never rendered as HTML downstream
    CommentAuthor: author,                 // "Author" is a reserved read-only SharePoint field
    AuthorEmail: claims.authorEmail || "",
    Body: body,
    Status: "New",
    Source: "relay",
    CreatedAt: now,
    ReceivedAt: now
  };

  let token;
  try{ token = await graphAppToken(); }
  catch(e){ return res.status(502).json({error:"store auth unavailable"}); }    // fail loud

  const url = `https://graph.microsoft.com/v1.0/sites/${process.env.CB_SITE_ID}/lists/${process.env.CB_LIST_ID}/items`;
  let gr;
  try{
    gr = await fetch(url, { method:"POST",
      headers:{ "Authorization":"Bearer "+token, "Content-Type":"application/json" },
      body: JSON.stringify({ fields }) });
  }catch(e){ return res.status(502).json({error:"store unreachable"}); }
  if(!gr.ok){
    const detail = await gr.text().catch(()=> "");
    console.error("graph item create failed", gr.status, detail.slice(0,300));
    return res.status(502).json({error:"store rejected"});                       // never a silent drop
  }

  // optional sanctioned push (one line, synchronous)
  if(process.env.CB_TEAMS_WEBHOOK){
    try{ await fetch(process.env.CB_TEAMS_WEBHOOK, { method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ text: `New comment on ${p.artefact} ${anchor} from ${author}: ${body.slice(0,140)}` }) }); }
    catch(_){ /* push is best-effort; the row is already saved */ }
  }

  return res.status(201).json({ ok:true });
};
