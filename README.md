# Topic Planner

A web app that shapes a systematic-review topic on the PRISMA 2020 statement, right in the
browser. It writes a review question from its parts (PICO, PICo, PEO or PCC), points to where
published reviews are listed, builds the search string (in PubMed's, Scopus's and Web of
Science's own syntax too), logs what each source found, draws the PRISMA 2020 flow from the
screening numbers and says whether the topic is the right size and how many hours of work it
holds, then fills the PRISMA 2020 checklists (Page et al., 2021, reproduced under CC BY 4.0) and
writes the plan as a Word file.

- **Nothing leaves the device.** Plans are kept in the browser's own storage. There is no backend,
  no database and no API, and the page's security policy lets its scripts reach only the site
  itself and Hugging Face, where the optional model is fetched from once the visitor turns it on.
- **Up to three candidate topics** can be kept and compared side by side; a plan can be saved as
  a file and opened on another device.
- **An optional AI helper.** A small language model (Qwen2.5-0.5B-Instruct, Apache-2.0, about
  790 MB, run in the browser with transformers.js on WebGPU, fetched at a fixed revision of its
  files) reads the parts of the question from a sentence, suggests other words for the search and
  titles for the review, and can be turned off again.
- The planner carries the statement PRISMA asks its endorsers to carry (complete the checklist and
  include a flow diagram when reporting a systematic review) and links the PRISMA website for the
  templates and extensions.
- Light and dark themes, keyboard accessible, respects `prefers-reduced-motion`, prints cleanly.
- **Current browsers.** Chrome and Edge 111, Firefox 114 and Safari 16.4 or later (the build
  target). An older browser gets a plain notice that it needs an update
  (`public/browser-check.js`), not a broken page.

## Proof of concept

This is an **unofficial proof of concept in its beta testing stage**. It was built diligently and
meticulously with the help of AI, but it can still make mistakes, so every result needs human
verification. See [NOTICE.md](NOTICE.md).

## Stack

React 19, TypeScript, Vite 8 and Tailwind CSS 4. [fflate](https://github.com/101arrowz/fflate)
zips the Word file; [transformers.js](https://github.com/huggingface/transformers.js) and ONNX
Runtime Web run the optional model. Every library is free and open source.

## Getting started

Requires Node 24 (see `.nvmrc`).

```sh
ONNXRUNTIME_NODE_INSTALL=skip npm ci
npm run dev       # http://localhost:5290
```

(`ONNXRUNTIME_NODE_INSTALL=skip` stops onnxruntime-node's install script from fetching CUDA
binaries the browser build never uses.)

## Scripts

| Script              | What it does                                               |
| ------------------- | ---------------------------------------------------------- |
| `npm run dev`       | Development server                                         |
| `npm run build`     | Type-check and build to `dist/`                            |
| `npm run preview`   | Serve the build (with its Content Security Policy) on 5291 |
| `npm run typecheck` | TypeScript only                                            |
| `npm run lint`      | ESLint                                                     |
| `npm run format`    | Prettier (`format:check` to check only)                    |
| `npm test`          | Vitest (`test:watch` to keep running)                      |
| `npm run audit`     | `npm audit` at any severity, then registry signatures      |
| `npm run verify`    | All of the above in order, as the deploy workflow runs it  |

## How it works

- `src/topic/plan.ts`: the plan, its question frames, the search sources and string, the PRISMA
  flow, the verdict on the topic's size and how a saved plan is read back.
- `src/topic/prisma.ts`: the PRISMA 2020 checklists (main and abstracts).
- `src/topic/docx.ts` and `src/topic/word.ts`: the plan as a Word file.
- `src/topic/ai.ts` and `src/topic/ai.worker.ts`: the optional model, in a worker.
- `src/components/Topic.tsx`: the planner's five steps (Question, Criteria, Search, Screen, Plan).

## Security and privacy

- Production builds carry a strict Content Security Policy as a `<meta>` tag: scripts, styles,
  fonts and the workers come only from the site, and `connect-src 'self' https://huggingface.co
https://*.hf.co` limits the page's scripts (fetch, XHR, WebSocket, beacons) to the site itself and
  to Hugging Face, which the model is fetched from only after the visitor turns it on;
  `'wasm-unsafe-eval'` lets ONNX Runtime compile that model's WebAssembly (served by the site under
  `ort/`), not JavaScript. The theme and the browser check run from `public/theme-boot.js` and
  `public/browser-check.js`, so no inline script is needed.
- The browser keeps the theme choice (`localStorage`, key `topic-theme`) and the plans
  (`topic-plans`; `topic-plan` is the single plan of an earlier version, taken over on load), plus
  what it found out about the model (`topic-ai`, `topic-ai-probe`, `topic-ai-verified`). No
  accounts, cookies or analytics.
- A saved plan is read under known keys only and cut to sane lengths; text is always rendered as
  text, never as HTML, and the Word file escapes it and strips control characters.
- Dependencies: `npm run verify` runs `npm audit` at any severity and checks every package's npm
  registry signature on every deploy, after `npm ci` installs exactly the versions in
  `package-lock.json`, and `.github/workflows/audit.yml` repeats them every Monday.

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`:

1. In the repository settings, under **Pages**, set **Source** to **GitHub Actions**.
2. Push to `main` (or run the workflow manually). It runs `npm run verify` and publishes `dist/`.

The workflow passes `BASE_PATH=/<repo>/`, which Vite uses for every asset URL (local builds keep
`/`), and `VITE_REPO_URL`, which adds a "View source" link to the footer. The build also writes
`404.html` as a copy of `index.html`. Pages cannot send custom headers, so the CSP ships as a
`<meta>` tag, which cannot set `frame-ancestors`; hosts that support headers should add one.

## License

- **Code:** [MIT](LICENSE).
- **PRISMA 2020 checklists** (`src/topic/prisma.ts`): Page et al., 2021, CC BY 4.0.
- **Bundled libraries and fonts:** see `public/THIRD_PARTY_LICENSES.txt` (also linked from the
  site's footer).

See [NOTICE.md](NOTICE.md) for the full notices.
