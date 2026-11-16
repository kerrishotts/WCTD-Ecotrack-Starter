# Lab 1: The EcoTrack Engine

**Session 1 · 60 minutes · work in pairs**

In this lab you'll write the "engine" behind EcoTrack: the functions that add actions, total up points, and fetch live air quality. There's no React yet. In Session 2, React will use these exact functions to power the app, so write them carefully.

By the end of this lab you will have:

- Written pure functions that never mutate their inputs
- Used `map`, `filter` and `reduce` on an array of objects
- Fetched live data with `async` / `await` and handled errors
- Recorded your first entry in the team AI Log

---

## 0. Get set up (5 min)

```bash
npm install      # first time only
npm run dev      # opens the engine room page
```

Open the link Vite prints (usually http://localhost:5173). You'll see a list of checks, and right now they all say **TODO**. Your job is to turn them all **PASS**.

Prefer the terminal? Run `npm run check` in a second terminal.

Open these files in VS Code:

| File | What it is |
| --- | --- |
| `src/ecotrack.js` | The functions you'll write in steps 1–3 |
| `src/airQuality.js` | The fetch function you'll write in step 4 |
| `src/data/sampleLog.js` | The sample data. **Read it first!** |
| `src/checks.js` | The checks. Read these if you're unsure what a function should return |

> **Rule for today: no AI until step 3.** Steps 1 and 2 are where you build the skills to judge what AI gives you later.

---

## 1. Add and toggle (10 min)

In `src/ecotrack.js`, replace the `throw new Error("TODO …")` line in each function.

**`addAction(log, action)`** returns a *new* array with `action` on the end.

**`toggleDone(log, id)`** returns a *new* array where the action with that `id` has its `done` flipped. Every other action stays exactly the same.

<details>
<summary>Hint: addAction</summary>

`log.push(action)` changes the original array, and a check will catch that. Spread the old items into a new array instead: `[...log, action]`.
</details>

<details>
<summary>Hint: toggleDone</summary>

`map` returns a new array. For the matching action, return a *copy* with `done` flipped: `{ ...action, done: !action.done }`. For everything else, return the action unchanged.
</details>

✅ The `addAction` and `toggleDone` checks pass.

---

## 2. Totals and filters (10 min)

**`totalPoints(log)`** adds up the points of actions that are **done**. Planned actions don't count yet. The sample log should total **70**.

**`filterByCategory(log, category)`** returns only the actions in that category. If `category` is `"all"`, return the whole log.

<details>
<summary>Hint: totalPoints</summary>

Two steps chained together: `filter` to keep the done actions, then `reduce` to add up their `points`. Don't forget the starting value: `reduce((total, a) => total + a.points, 0)`.
</details>

✅ The `totalPoints` and `filterByCategory` checks pass, and the "by the numbers" card shows a total.

---

## 3. AI checkpoint: `pointsByCategory` (15 min)

`pointsByCategory(log)` should return points per category for **done** actions only:

```js
{ transport: 35, food: 10, energy: 15, waste: 10 }
```

This time, let AI write it, but you stay in charge.

1. **Ask with a short prompt.** In Continue, type exactly:
   > Write a JavaScript function pointsByCategory(log) that returns the total points for each category.
2. **Predict before you run.** Don't paste it yet. Read the AI's code and, *on paper*, work out what it would return for `sampleLog`. Write your prediction down.
3. **Paste and run the checks.** Did your prediction match the check's "actual" value? Did the check pass?
4. **Improve the prompt.** If it failed, what did the AI not know? Try again using the prompt template:
   > **Context:** EcoTrack log, an array of `{ id, title, category, points, co2Kg, date, done }` objects.
   > **Goal:** `pointsByCategory(log)` returns `{ [category]: totalPoints }`.
   > **Constraints:** only count actions where `done` is true; don't mutate `log`; use `filter` and `reduce`; explain each line.
5. **Explain it.** One partner explains the final code, line by line, to the other. If you can't explain a line, ask the AI about *that line*, or rewrite it yourself.

✅ The `pointsByCategory` checks pass **and** you can explain every line.

---

## 4. Live air quality (15 min)

Open `src/airQuality.js`. `findCity` is already written as a **worked example**. Read it carefully: it shows the pattern you'll follow.

Write **`getAirQuality(lat, lon)`**:

1. Build the URL:
   `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=LAT&longitude=LON&current=us_aqi,pm2_5`
2. `await fetch(url)`
3. If `res.ok` is false, `throw` an `Error` with a helpful message
4. `await res.json()`. The data you need is inside `current`: `{ time, us_aqi, pm2_5, … }`
5. Return `{ aqi, pm2_5, time }`

The checks use a **fake** `fetch`, so they work without internet. Once they pass, try the real thing: type a city into the **Air quality right now** panel and press **Check**.

<details>
<summary>Hint: the response shape</summary>

Open the URL above in your browser (put in real numbers, like `latitude=42.65&longitude=-73.75`) to see the actual JSON. Then destructure it: `const { current } = await res.json();`
</details>

✅ The `getAirQuality` checks pass and the live panel shows an AQI for your city.

---

## 5. Log it (5 min)

Add your first row to `AI-LOG.md` describing step 3: what you asked, what the AI gave you, whether your prediction matched, and what you changed.

---

## Stretch: `streak(log, today)`

How many days in a row, ending on `today`, had at least one **done** action? For the sample log, `streak(log, "2026-11-10")` is `2`.

<details>
<summary>Hint</summary>

Put every done action's `date` into a `Set`. Start at `today` and step backward one day at a time while the set has that date. To step back a day: `const d = new Date(\`${today}T00:00:00Z\`); d.setUTCDate(d.getUTCDate() - 1); d.toISOString().slice(0, 10)`.
</details>

---

## Done when

- [ ] All core checks pass
- [ ] The live air quality panel works for your city
- [ ] You can explain every line of `pointsByCategory`
- [ ] `AI-LOG.md` has its first entry

**Stuck or fell behind?** The finished version is on the `session-1-done` branch: `git checkout session-1-done`.
