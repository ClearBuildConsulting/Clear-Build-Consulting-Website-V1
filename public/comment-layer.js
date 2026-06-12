/* ══════════ Clear Build Consulting · comment-layer.js ══════════
   Client comment capture. Click-anchor (cards/bubbles/panels) + text-highlight (prose).
   Progressive enhancement, no framework. Config via window.CB_COMMENTS:
     { engagement, artefact,
       submit:{ mode:"relay"|"form"|"demo", url:"..." },
       token:"<hmac bearer>",            // relay mode
       banner:"...optional instruction..." }
   Submit honesty (D-15): green "sent" ONLY on HTTP 201. Fail loud otherwise. */
(function(){
  var C = window.CB_COMMENTS || {};
  if(!C.submit) C.submit = {mode:"demo"};
  var MODE = C.submit.mode || "demo";
  var ENG = C.engagement || "UNKNOWN";
  var ART = C.artefact || "artefact";
  var AUTHK = "cb-author";
  var LSTORE = "cbc-"+ART+"-local";   // the client's own local record of what they sent
  var sent = JSON.parse(localStorage.getItem(LSTORE)||"[]");
  var current=null, pendingRange=null;

  // ── chrome: banner, toolbar, drawer, dialog ──
  function el(html){var d=document.createElement("div");d.innerHTML=html.trim();return d.firstChild;}
  var banner = el('<div class="cbc-demo">'+(C.banner||
     '<b>Highlight</b> any sentence to comment on it, or click a <b>💬</b> on any card or bubble.')+'</div>');
  document.body.appendChild(banner);

  var selTool = el('<div class="cbc-seltool" id="cbcSelTool">'+
    '<button type="button" id="cbcSelComment">💬 Comment</button>'+
    '<span class="cbc-sep"></span>'+
    '<button type="button" id="cbcSelCopy">⎘ Copy</button></div>');
  document.body.appendChild(selTool);

  var tabBtn = el('<button class="cbc-tab" id="cbcTab">YOUR COMMENTS<span class="cbc-tabn" id="cbcTabN">0</span></button>');
  document.body.appendChild(tabBtn);

  var drawer = el('<aside class="cbc-drawer" id="cbcDrawer">'+
    '<div class="cbc-dh"><h3>Your comments</h3>'+
    '<p>A record of what you have sent on this document.</p>'+
    '<button class="cbc-x" id="cbcClose">&times;</button></div>'+
    '<div class="cbc-rows" id="cbcRows"><div class="cbc-empty" id="cbcEmpty">No comments yet.<br>'+
    'Highlight a sentence, or click a 💬.</div></div>'+
    '<div class="cbc-df">Sent straight to the Clear Build Consulting team.</div></aside>');
  document.body.appendChild(drawer);

  var pop = el('<dialog class="cbc-pop" id="cbcPop"><form method="dialog" id="cbcForm">'+
    '<div class="cbc-pop-h"><span class="cbc-re" id="cbcRe">Re:</span>'+
    '<span class="cbc-lbl" id="cbcLbl"></span><div class="cbc-quote" id="cbcQuote"></div></div>'+
    '<div class="cbc-pop-b">'+
    '<label for="cbcAuthor">Your name</label>'+
    '<input id="cbcAuthor" autocomplete="name" placeholder="e.g. Neil" required>'+
    '<label for="cbcBody">Comment</label>'+
    '<textarea id="cbcBody" placeholder="What would you change about this?" required></textarea>'+
    '<div class="cbc-actions"><span class="cbc-state" id="cbcState"></span>'+
    '<button type="button" class="cbc-btn ghost" id="cbcCancel">Cancel</button>'+
    '<button type="submit" class="cbc-btn go" id="cbcSubmit">Submit</button></div>'+
    '</div></form></dialog>');
  document.body.appendChild(pop);

  var $=function(id){return document.getElementById(id);};
  var reEl=$("cbcRe"), lblEl=$("cbcLbl"), quoteEl=$("cbcQuote"),
      authEl=$("cbcAuthor"), bodyEl=$("cbcBody"), stateEl=$("cbcState"),
      submitBtn=$("cbcSubmit"), rowsEl=$("cbcRows"), emptyEl=$("cbcEmpty"), tabN=$("cbcTabN");

  // ── anchor resolution (H1 text-scrape; H2 reads data-cb-anchor) ──
  function anchorOf(elm){
    if(!elm||!elm.dataset) return null;
    if(elm.dataset.cbAnchor) return elm.dataset.cbAnchor;
    var idEl=elm.querySelector?elm.querySelector(".oc-id, .bid"):null;
    var t=idEl?idEl.textContent:(elm.textContent||"");
    var m=t.match(/([OE]-\d{2})/);
    if(m) return m[1];
    if(elm.classList&&elm.classList.contains("panel")) return "PANEL-"+(elm.getAttribute("data-cb-i")||"?");
    return null;
  }
  function labelOf(elm,anchor){
    if(!elm) return anchor;
    var n=elm.querySelector&&elm.querySelector(".oc-name");
    if(n) return anchor+" · "+n.textContent.trim();
    if(elm.classList&&elm.classList.contains("panel")){
      var t=elm.querySelector(".vh-title"); return t?("View · "+t.textContent.replace(/DRAFT/i,'').trim()):anchor;
    }
    return anchor;
  }
  function nearestAnchor(node){
    var elm=node.nodeType===3?node.parentElement:node;
    while(elm&&elm!==document.body){
      if(elm.classList&&(elm.classList.contains("oc")||elm.classList.contains("panel")||
         elm.classList.contains("bub")||(elm.tagName==="B"&&elm.closest&&elm.closest(".tv-list")))){
        var a=anchorOf(elm); if(a) return {el:elm,anchor:a};
      }
      elm=elm.parentElement;
    }
    return {el:null,anchor:"DOC"};
  }
  function localCountFor(a){return sent.filter(function(c){return c.anchor===a;}).length;}

  // ── instrument block-level anchors ──
  var hosts=[];
  document.querySelectorAll(".oc").forEach(function(elm){
    if(!anchorOf(elm))return; elm.classList.add("cbc-host");
    var b=el('<button class="cbc-dot" type="button">💬</button>');
    b.setAttribute("data-cb-for",anchorOf(elm)); elm.appendChild(b); hosts.push({el:elm,dot:b});
  });
  document.querySelectorAll(".panel").forEach(function(elm,i){
    elm.setAttribute("data-cb-i",i+1); var hdr=elm.querySelector(".v-header")||elm; hdr.classList.add("cbc-host");
    var b=el('<button class="cbc-dot" type="button" style="top:14px;right:14px">💬</button>');
    b.setAttribute("data-cb-for","PANEL-"+(i+1)); b.setAttribute("data-cb-panel",i+1); hdr.appendChild(b);
  });
  document.querySelectorAll(".bub").forEach(function(elm){ if(anchorOf(elm)){elm.classList.add("cbc-click");elm.tabIndex=0;} });
  document.querySelectorAll(".tv-list b").forEach(function(elm){ if(anchorOf(elm)){elm.classList.add("cbc-click");elm.tabIndex=0;} });

  function openFor(elm,anchor,label,quote){
    current={el:elm,anchor:anchor,label:label,quote:quote||""};
    reEl.textContent="Re: "+anchor; lblEl.textContent=label||"";
    if(quote){quoteEl.textContent="“"+quote+"”";quoteEl.classList.add("show");}
    else{quoteEl.textContent="";quoteEl.classList.remove("show");}
    authEl.value=localStorage.getItem(AUTHK)||""; bodyEl.value="";
    stateEl.className="cbc-state"; stateEl.textContent="";
    submitBtn.disabled=false; submitBtn.textContent="Submit";
    if(typeof pop.showModal==="function") pop.showModal(); else pop.setAttribute("open","");
    setTimeout(function(){(authEl.value?bodyEl:authEl).focus();},40);
  }

  // ── text selection -> toolbar ──
  function hideSelTool(){selTool.classList.remove("show");}
  function isInDoc(node){
    var elm=node.nodeType===3?node.parentElement:node; if(!elm) return false;
    if(elm.closest&&(elm.closest(".cbc-drawer")||elm.closest(".cbc-pop")||elm.closest(".cbc-demo")||elm.closest(".cbc-seltool"))) return false;
    return true;
  }
  document.addEventListener("mouseup",function(e){
    if(e.target.closest&&e.target.closest(".cbc-seltool")) return;
    setTimeout(function(){
      var sel=window.getSelection();
      if(!sel||sel.isCollapsed||!sel.rangeCount){hideSelTool();return;}
      var txt=sel.toString().trim(); if(txt.length<2){hideSelTool();return;}
      var range=sel.getRangeAt(0); if(!isInDoc(range.startContainer)){hideSelTool();return;}
      pendingRange=range.cloneRange();
      var r=range.getBoundingClientRect();
      selTool.style.left=(window.scrollX+r.left+r.width/2)+"px";
      selTool.style.top=(window.scrollY+r.top-46)+"px";
      selTool.style.transform="translateX(-50%)";
      selTool.classList.add("show");
    },10);
  });
  document.addEventListener("scroll",hideSelTool,true);
  $("cbcSelCopy").addEventListener("click",function(){
    var txt=(window.getSelection().toString()||"").trim();
    if(navigator.clipboard) navigator.clipboard.writeText(txt);
    var b=this,old=b.innerHTML; b.innerHTML="✓ Copied"; setTimeout(function(){b.innerHTML=old;},1100);
  });
  $("cbcSelComment").addEventListener("click",function(){
    if(!pendingRange) return;
    var quote=pendingRange.toString().trim(), na=nearestAnchor(pendingRange.startContainer);
    hideSelTool();
    openFor(na.el,na.anchor,na.el?labelOf(na.el,na.anchor):"Whole document",quote);
  });

  // ── click anchors ──
  document.addEventListener("click",function(e){
    var dot=e.target.closest(".cbc-dot");
    if(dot){e.preventDefault();
      var host=dot.closest(".oc")||dot.closest(".v-header")||dot.closest(".panel");
      var anchor=dot.getAttribute("data-cb-for"), panelI=dot.getAttribute("data-cb-panel");
      var srcEl=panelI?document.querySelectorAll(".panel")[panelI-1]:host;
      openFor(srcEl,anchor,labelOf(srcEl,anchor),""); return;
    }
    var clk=e.target.closest(".bub.cbc-click, .tv-list b.cbc-click");
    if(clk){e.preventDefault(); var a=anchorOf(clk); if(a) openFor(clk,a,labelOf(clk,a),"");}
  });
  $("cbcCancel").addEventListener("click",function(){pop.close();});

  // ── submit (3 transports) ──
  function payload(author,body){
    return {engagement:ENG,artefact:ART,anchor:current.anchor,anchorLabel:current.label,
      quote:current.quote||"",body:body,author:author,
      clientId:(current.clientId||(current.clientId=(crypto.randomUUID?crypto.randomUUID():String(Date.now())))),
      token:C.token||""};
  }
  function onSent(rec){
    stateEl.className="cbc-state sent"; stateEl.innerHTML="✓ sent";
    if(current.quote&&pendingRange){try{wrapRange(pendingRange);}catch(_){}}
    pendingRange=null;
    sent.push(rec); localStorage.setItem(LSTORE,JSON.stringify(sent));
    markHost(current); renderRows(); drawer.classList.add("open");
    setTimeout(function(){pop.close();},650);
  }
  function onError(msg){
    stateEl.className="cbc-state error"; stateEl.innerHTML="⚠ "+(msg||"not saved")+", retry";
    submitBtn.disabled=false; submitBtn.textContent="Retry";
  }
  $("cbcForm").addEventListener("submit",function(e){
    e.preventDefault();
    if(submitBtn.disabled) return;                         // in-flight lock
    var author=authEl.value.trim(), body=bodyEl.value.trim();
    if(!author||!body) return;
    localStorage.setItem(AUTHK,author);
    submitBtn.disabled=true;
    stateEl.className="cbc-state saving"; stateEl.innerHTML='<span class="cbc-spin"></span> saving';  // AMBER
    var p=payload(author,body);

    if(MODE==="demo"){                                     // simulated, for QA before backend exists
      setTimeout(function(){ onSent({anchor:p.anchor,label:p.anchorLabel,quote:p.quote,author:author,body:body,ts:new Date().toISOString()}); },650);
      return;
    }
    if(MODE==="form"){                                     // fallback: open prefilled MS Form, its page confirms
      var u=new URL(C.submit.url);
      // field mapping is set when the Form is built; we pass anchor/author/quote/body as query
      u.searchParams.set("anchor",p.anchor); u.searchParams.set("author",author);
      u.searchParams.set("quote",p.quote); u.searchParams.set("engagement",ENG); u.searchParams.set("artefact",ART);
      window.open(u.toString(),"_blank","noopener");
      onSent({anchor:p.anchor,label:p.anchorLabel,quote:p.quote,author:author,body:body,ts:new Date().toISOString()});
      return;
    }
    // relay (default): POST JSON, green ONLY on 201
    fetch(C.submit.url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)})
      .then(function(r){
        if(r.status===201) return r.json().catch(function(){return {};}).then(function(){ onSent({anchor:p.anchor,label:p.anchorLabel,quote:p.quote,author:author,body:body,ts:new Date().toISOString()}); });
        if(r.status===401) return onError("link expired");
        if(r.status===429) return onError("too many, wait a moment");
        return onError("not saved");
      })
      .catch(function(){ onError("no connection"); });
  });

  function wrapRange(range){
    var mark=document.createElement("mark"); mark.className="cbc-hl";
    try{ range.surroundContents(mark); }
    catch(_){ var frag=range.extractContents(); mark.appendChild(frag); range.insertNode(mark); }
    window.getSelection().removeAllRanges();
  }
  function markHost(c){
    var h=hosts.filter(function(x){return x.el===c.el;})[0];
    if(h){h.dot.classList.add("cbc-has");
      var n=localCountFor(c.anchor), bd=h.dot.querySelector(".cbc-badge");
      if(!bd){bd=document.createElement("span");bd.className="cbc-badge";h.dot.appendChild(bd);} bd.textContent=n;
    }
    if(c.el&&c.el.classList&&(c.el.classList.contains("bub")||c.el.tagName==="B")) c.el.classList.add("cbc-has");
  }
  function esc(s){var d=document.createElement("div");d.textContent=s==null?"":String(s);return d.innerHTML;}
  function renderRows(){
    tabN.textContent=sent.length;
    if(!sent.length){rowsEl.innerHTML="";rowsEl.appendChild(emptyEl);return;}
    rowsEl.innerHTML="";
    sent.slice().reverse().forEach(function(c){
      var q=c.quote?'<div class="cbc-rq">“'+esc(c.quote)+'”</div>':'';
      var d=el('<div class="cbc-row"><div class="cbc-rt"><span class="cbc-ra">'+esc(c.anchor)+
        '</span><span class="cbc-rs">sent</span></div>'+q+'<div class="cbc-rb">'+esc(c.body)+
        '</div><div class="cbc-rm">'+esc(c.author)+' · '+new Date(c.ts).toLocaleString()+'</div></div>');
      rowsEl.appendChild(d);
    });
  }
  tabBtn.addEventListener("click",function(){drawer.classList.toggle("open");});
  $("cbcClose").addEventListener("click",function(){drawer.classList.remove("open");});

  renderRows();
  sent.forEach(function(c){
    var host=hosts.filter(function(x){return anchorOf(x.el)===c.anchor;})[0];
    if(host) markHost({el:host.el,anchor:c.anchor});
    document.querySelectorAll(".bub.cbc-click, .tv-list b.cbc-click").forEach(function(elm){
      if(anchorOf(elm)===c.anchor) elm.classList.add("cbc-has");
    });
  });
})();
