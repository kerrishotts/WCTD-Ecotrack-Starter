# EcoTrack

**WCTD Level III · Advanced JavaScript & React**

EcoTrack is the running example for Level III. It's a small app where you log sustainable actions (biking to school, a meatless lunch, composting) and check live air quality for your city. Each session adds a layer:

| Session | You build | Branches |
| --- | --- | --- |
| 1: Modern JavaScript | The engine: pure functions and live data | `session-1-start` → `session-1-done` |
| 2: Thinking in React | The UI: components, props and state | `session-2-start` → `session-2-done` |
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
| `npm run check:ui` | Run the Lab 2 checks (React components) |
| `npm run check` | Run the Lab 1 checks (the engine functions) |
| `npm test` | Run the Lab 2 checks in watch mode: they re-run every time you save |
| `npm run build` | Build the production version into `dist/` |

## Pages

| Page | What it is |
| --- | --- |
| `/` | The EcoTrack React app (Lab 2) |
| `/exercises.html` | Session 2 exercises: edit `src/exercises/session-2.jsx` |
| `/engine.html` | The Session 1 engine room and live air quality panel |

## What's where

```
index.html               the React app's page
src/
  main.jsx               starts React
  App.jsx                owns the data (state) and lays out the page
  App.css                all the styles
  components/            one file per component
    Header.jsx           worked example
    CategoryFilter.jsx   worked example
    ActionCard.jsx       Lab 2, step 2
    ActionList.jsx       Lab 2, step 3
    ScoreBoard.jsx       Lab 2, step 4
    ActionForm.jsx       Lab 2, step 5
  lab2.test.jsx          the Lab 2 checks
  ecotrack.js            the Session 1 engine (pure functions)
  airQuality.js          fetching live air quality
  data/sampleLog.js      sample actions to test with
  checks.js              the Lab 1 checks
  exercises/session-2.jsx  Session 2 exercises
labs/                    lab instructions (lab-1.md, lab-2.md)
exercises/session-1.js   Session 1 exercises
demos/                   interactive concept demos (open in a browser)
AI-LOG.md                your team's AI Log (judges read this!)
```

## Fell behind?

Every session has a finished branch. To jump ahead:

```bash
git stash                     # save your work first
git checkout session-2-done
npm install                   # in case new packages were added
```

## Data

Air quality, city search and temperature data come from [Open-Meteo](https://open-meteo.com/). It's free and needs no API key, so there are no secrets in this repo.
