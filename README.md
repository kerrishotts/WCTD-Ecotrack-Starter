# EcoTrack

**WCTD Level III · Advanced JavaScript & React**

EcoTrack is the running example for Level III. It's a small app where you log sustainable actions (biking to school, a meatless lunch, composting) and check live air quality for your city. Each session adds a layer:

| Session | You build | Branches |
| --- | --- | --- |
| 1: Modern JavaScript | The engine: pure functions and live data | `session-1-start` → `session-1-done` |
| 2: Thinking in React | The UI: components, props and state | `session-2-start` → `session-2-done` *(coming soon)* |
| 3: Real apps | Live data panel, pages, saved progress | `session-3-start` → `session-3-done` *(coming soon)* |

EcoTrack supports UN Sustainable Development Goals **3** (Good Health), **11** (Sustainable Cities) and **13** (Climate Action).

## Getting started

You need [Node.js](https://nodejs.org) (version 20 or newer) and VS Code.

```bash
npm install
npm run dev
```

Then open the link Vite prints (usually http://localhost:5173).

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server; the page reloads when you save |
| `npm run check` | Run the lab checks in the terminal |
| `npm run build` | Build the production version into `dist/` |
| `node exercises/session-1.js` | Run the Session 1 exercises |

The Session 1 interactive demos are in `demos/session-1-demos.html`. Open the file in any browser; no server needed.

## What's where

```
index.html               the engine room page
src/
  ecotrack.js            Lab 1: pure functions for the action log
  airQuality.js          Lab 1: fetching live air quality
  data/sampleLog.js      sample actions to test with
  checks.js              the automatic lab checks
  main.js                connects everything to the page
labs/lab-1.md            Lab 1 instructions
exercises/session-1.js   Session 1 exercises
demos/                   interactive concept demos (open in a browser)
AI-LOG.md                your team's AI Log (judges read this!)
```

## Fell behind?

Every session has a finished branch. To jump ahead:

```bash
git stash                     # save your work first
git checkout session-1-done
```

## Data

Air quality, city search and temperature data come from [Open-Meteo](https://open-meteo.com/). It's free and needs no API key, so there are no secrets in this repo.
