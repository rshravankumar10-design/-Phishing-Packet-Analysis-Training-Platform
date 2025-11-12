# Phishing & Packet Analysis Training Platform

A small Vite + React + TypeScript project for training on phishing detection and packet analysis. This repository contains a demo UI, analysis components, and configuration for local development with Tailwind CSS.

How to run

```powershell
cd project
npm install
npm run dev        # start dev server
npm run lint       # run ESLint
npm run typecheck  # run TypeScript checks
npm run build      # build production assets
```

Files of interest
- `project/src/components` — React components (UI)
- `project/src/utils` — helper utilities
- `project/vite.config.ts` — Vite config
- `project/postcss.config.js` — PostCSS + Tailwind config

Notes
- This repo ignores `project/dist/` (build output). If you need to produce a distributable, run `npm run build` in `project`.

See `PROMPT.md` for a ready-to-use ChatGPT prompt that explains the repo to a new contributor.