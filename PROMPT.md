Project summary

You're looking at the "Phishing & Packet Analysis Training Platform" — a small Vite + React + TypeScript application used to teach or demo phishing detection and packet analysis concepts. The `project/` folder contains the full front-end app.

Goals for an assistant

- Quickly understand the repo layout and how to run the app locally.
- Identify and fix TypeScript/ESLint/build issues.
- Propose UI/UX or accessibility improvements.
- Add tests, CI, or deployment scripts when requested.

How to run (local)

```powershell
cd project
npm install
npm run dev
```

Quick context for a code assistant

- Use the `project/src` folder as the canonical source.
- TypeScript config lives at `project/tsconfig.app.json` and `project/tsconfig.json`.
- Vite + Tailwind are used for dev server and styling.
- `postcss.config.js` is CommonJS (module.exports).

Example prompt to paste into ChatGPT when asking for help

"I have the following repository: a Vite + React + TypeScript frontend in `project/` that uses Tailwind. I'm seeing TypeScript errors about missing JSX intrinsic elements and some PostCSS load errors. The repo root now contains a `project/` folder with a `package.json` and TypeScript config. Please inspect `project/src/components/EmailAnalyzer.tsx` and `project/src/components/MainMenu.tsx` for TS and lint errors, fix types, and ensure `npm run dev` starts without errors. Also make sure `project/dist/` is ignored in `.gitignore` and not committed. Run lint and typecheck and summarize the changes you make."

Notes

- If you want the assistant to modify files, provide brief constraints (no history rewrite, or allow force-push) so it can choose safe git operations.
- If the assistant adds or modifies configuration files, ask it to run the project's lint/typecheck/build commands and report results.

