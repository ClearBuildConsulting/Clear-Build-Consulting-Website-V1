# ClearBuild Consulting Website
**Owner:** Mike Anderson, ClearBuild Consulting
**Repo:** ClearBuildConsulting/Clear-Build-Consulting-Website-V1
**Live site:** www.clearbuildconsultant.co.uk

---

## Stack

- React 19 + TypeScript
- Vite (dev server + build)
- react-router-dom v7 (client-side routing)
- lucide-react (icons)
- No CSS framework — custom styles

## Structure

```
/
├── App.tsx              ← Router and layout wrapper
├── index.tsx            ← Entry point
├── index.html
├── types.ts
├── pages/               ← One file per route
│   ├── Home.tsx
│   ├── About.tsx
│   ├── AIAdvisory.tsx
│   ├── BuiltEnv.tsx
│   ├── DomesticTender.tsx
│   └── Contact.tsx
└── components/          ← Shared UI components
    ├── Navbar.tsx
    ├── Footer.tsx
    ├── Button.tsx
    ├── Logo.tsx
    └── assets/
```

## Dev commands

```bash
npm install       # install dependencies
npm run dev       # local dev server
npm run build     # production build
npm run preview   # preview production build
```

## Brand reference

Authoritative brand spec (colours, typography, logo paths) lives in the sibling workspace:
`../clearbuild-os/clearbuild-os/.claude/skills/clearbuild-brand.md`

Logo assets: `../clearbuild-os/clearbuild-os/assets/branding/`

## Session rules

- UK English only — no US spellings
- No hype language (see clearbuild-os identity.md for full banned word list)
- Match existing code style — no reformatting unrelated code
- Do not add dependencies without checking with Mike first
