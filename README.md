# EcoTrack

**WCTD Level III · Advanced JavaScript & React**

EcoTrack is a small app where you log sustainable actions (biking to school, a meatless lunch, composting), watch your impact add up, and check live air quality for your city. It's the running example for Level III, built one layer per session:

| Session | You build | Branches |
| --- | --- | --- |
| 1: Modern JavaScript | The engine: pure functions and live data | `session-1-start` → `session-1-done` |
| 2: Thinking in React | The UI: components, props and state | `session-2-start` → `session-2-done` |
| 3: Real apps | Saved progress, live air quality, pages, demo-ready | `session-3-start` → `session-3-done` |

`session-3-done` is the finished app, and a good skeleton for your own hackathon project.

EcoTrack supports UN Sustainable Development Goals **3** (Good Health), **11** (Sustainable Cities) and **13** (Climate Action).

## Getting started

You need [Node.js](https://nodejs.org) **22.22 or newer** (check with `node --version`) and VS Code.

```bash
npm install
npm run dev
```

Then open the link Vite prints (usually http://localhost:5173).

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server; the page reloads when you save |
| `npm run check:lab3` | Run the Lab 3 checks (hooks, live data, pages, validation) |
| `npm run check:lab2` | Run the Lab 2 checks (components and state) |
| `npm run check:ui` | Run all React checks (Labs 2 and 3) |
| `npm run check` | Run the Lab 1 checks (the engine functions) |
| `npm test` | Run the React checks in watch mode: they re-run every time you save |
| `npm run build` | Build the production version into `dist/` |

## Pages

| Address | What it is |
| --- | --- |
| `/` | Home: the tracker and live air quality |
| `/about` | About: the goals, how points work, and your impact |
| `/contact` | Contact: a validated form and share buttons |
| `/exercises.html` | Session 2 and 3 exercises |
| `/engine.html` | The Session 1 engine room |

## What's where

```
src/
  main.jsx               starts React, inside a BrowserRouter
  App.jsx                owns the log and maps addresses to pages
  App.css                all the styles
  siteConfig.js          your team's name and social accounts: edit me!
  pages/                 HomePage, AboutPage, ContactPage, NotFoundPage
  components/            Layout (nav + footer), ActionCard, ActionList,
                         ActionForm, ScoreBoard, CategoryFilter,
                         AirQualityPanel, SocialLinks, Header
  hooks/
    useLocalStorage.js   like useState, but saved in the browser
    useAirQuality.js     fetches live air quality for a city
  validation.js          contact form rules
  ecotrack.js            the Session 1 engine (pure functions)
  airQuality.js          Open-Meteo requests
  data/sampleLog.js      sample actions
  lab2.test.jsx          Lab 2 checks
  lab3.test.jsx          Lab 3 checks
  exercises/             Session 2 and 3 exercises
labs/                    lab instructions (lab-1.md, lab-2.md, lab-3.md)
docs/
  JUDGE-CHECKLIST.md     go through this before demo day
  DEMO-SCRIPT.md         a 3-minute demo template
demos/                   interactive concept demos (open in a browser)
AI-LOG.md                your team's AI Log (judges read this!)
```

## Make it yours

1. Change `src/siteConfig.js`: your team name, share text and social accounts.
2. Replace the sample data in `src/data/sampleLog.js` (or start with an empty array).
3. Go through `docs/JUDGE-CHECKLIST.md`.

## Hosting

`npm run build` creates a `dist/` folder you can host anywhere that serves static files. Because the app has its own pages (`/about`, `/contact`), the host must send `index.html` for addresses it doesn't recognize. `public/staticwebapp.config.json` already does this for Azure Static Web Apps.

## Fell behind?

Every session has a finished branch. To jump ahead:

```bash
git stash                     # save your work first
git checkout session-3-done
npm install                   # in case new packages were added
```

## Data

Air quality, city search and temperature data come from [Open-Meteo](https://open-meteo.com/). It's free and needs no API key, so there are no secrets in this repo.
