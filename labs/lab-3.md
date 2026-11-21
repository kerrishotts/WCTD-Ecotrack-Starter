# Lab 3: EcoTrack Goes Live

**Session 3 · 60 minutes · work in pairs**

This is the last lab. EcoTrack becomes a real, multi-page app: it remembers your actions, shows live air quality for your city, has Home, About and Contact pages, and is ready for judges. Everything you build today, your hackathon project will need too.

By the end of this lab you will have:

- Written two **custom hooks**, one that saves data and one that fetches it
- Used `useEffect` with a **dependency array** and a **cleanup function**
- Added **pages** with React Router
- Written a **validation** function for a contact form
- Had AI **review your code**, and decided what to keep

---

## 0. Get set up (5 min)

```bash
git checkout session-3-start
npm install          # new package this session: React Router
npm run dev          # the app
npm run check:lab3   # the Lab 3 checks (in a second terminal)
```

> **Node version:** this session needs Node.js 22.22 or newer. Check with `node --version`. If yours is older, install the current LTS from [nodejs.org](https://nodejs.org).

Most of the 13 checks fail for now. A couple already pass, and that's expected (read the check names to see why).

| File | What it is |
| --- | --- |
| `src/hooks/useLocalStorage.js` | Step 1 |
| `src/hooks/useAirQuality.js` | Step 2 |
| `src/components/AirQualityPanel.jsx` | **Worked example**: shows a different message for each status |
| `src/App.jsx` | Step 3: the routes |
| `src/components/Layout.jsx` | Step 3: the navigation links |
| `src/pages/` | The pages, already written |
| `src/validation.js` | Step 4 |
| `src/lab3.test.jsx` | The checks |

> **AI today: code reviewer.** Write your code first, then ask AI to review it in step 5. Using it to explain an error message is fine at any time.

---

## 1. A hook that remembers (10 min)

In Session 2, refreshing the page lost everything. Open `src/hooks/useLocalStorage.js`. Right now it's just `useState`. Make it save to the browser.

`useLocalStorage(key, initialValue)` should work exactly like `useState`, but:

1. **Start** from the saved value if there is one: `localStorage.getItem(key)`, turned back into data with `JSON.parse`. If nothing is saved, use `initialValue`.
2. **Save** every time the value changes, using `useEffect` with `[key, value]` as its dependencies: `localStorage.setItem(key, JSON.stringify(value))`.
3. Return `[value, setValue]`.

`App.jsx` already uses it for the log.

<details>
<summary>Hint: reading only once</summary>

Pass a **function** to `useState`, and React runs it only on the first render:
`useState(() => { const saved = localStorage.getItem(key); return saved !== null ? JSON.parse(saved) : initialValue; })`
</details>

<details>
<summary>Hint: why JSON?</summary>

localStorage can only store **strings**. `JSON.stringify` turns your array into a string; `JSON.parse` turns it back.
</details>

<details>
<summary>Hint: what if storage is blocked?</summary>

Some browsers block storage in private mode, and then `localStorage` throws an error. Wrap both the read and the save in `try { … } catch { … }` so the app keeps working anyway.
</details>

✅ The 3 **Step 1** checks pass. Mark an action done, refresh the page: it's still done.

---

## 2. Live air quality (15 min)

Open `src/hooks/useAirQuality.js`. It should fetch the air quality whenever `cityName` changes, and report what's happening:

| status | meaning | also set |
| --- | --- | --- |
| `"idle"` | no city chosen yet | |
| `"loading"` | waiting for the server | |
| `"success"` | got it! | `city` and `reading` |
| `"error"` | something went wrong | `error` (a message) |

Inside a `useEffect` that depends on `[cityName]`:

1. If there's no `cityName`, set the result to `IDLE` and stop.
2. Set the status to `"loading"`.
3. Call your Session 1 functions: `findCity(cityName)`, then `getAirQuality(city.latitude, city.longitude)`.
4. On success, set `"success"` with `city` and `reading`. If anything throws, set `"error"` with `err.message`.
5. **Return a cleanup function** that stops an old, slow answer from overwriting a newer one.

`AirQualityPanel.jsx` is done already. Read it: it shows how to display each status.

<details>
<summary>Hint: async inside useEffect</summary>

The effect function itself can't be `async`. Define an async function inside it and call it:
```js
useEffect(() => {
  async function load() { /* await things here */ }
  load();
}, [cityName]);
```
</details>

<details>
<summary>Hint: the cleanup (the "ignore" pattern)</summary>

```js
let ignore = false;
// ...after each await:  if (!ignore) setResult(...)
return () => { ignore = true; };
```
If the user picks a new city before the first answer arrives, React runs the cleanup, so the old answer is ignored. Try the **Fetch Lifecycle** demo to see why this matters.
</details>

✅ The 3 **Step 2** checks pass, and the panel on the Home page shows your city's air quality.

---

## 3. Pages (10 min)

EcoTrack needs Home, About and Contact pages: the judges' rubric requires them. The pages are already written in `src/pages/`. Your job is to connect them.

1. In `App.jsx`, inside the `<Route element={<Layout />}>`, add routes for:
   - `path="about"` → `<AboutPage log={log} />`
   - `path="contact"` → `<ContactPage />`
   - `path="*"` → `<NotFoundPage />` (the `*` matches anything else)
2. In `Layout.jsx`, add `NavLink`s for **About** (`/about`) and **Contact** (`/contact`), next to the Home link.

<details>
<summary>Hint: what's Outlet?</summary>

`Layout` draws the nav and footer, and `<Outlet />` is the hole where the current page goes. Every route nested inside the Layout route is drawn there.
</details>

<details>
<summary>Hint: Link vs &lt;a href&gt;</summary>

`<a href="/about">` reloads the whole page from the server. `<Link to="/about">` (and `NavLink`) swaps the page instantly without losing your state. `NavLink` also adds `class="active"` to the link for the page you're on, and the CSS highlights it.
</details>

✅ The 3 **Step 3** checks pass. Click through all three pages, then type a made-up address like `/banana`.

---

## 4. Contact form validation (10 min)

Open `src/validation.js`. `validateContact({ name, email, message })` returns an object with one message per problem:

| Field | Rule | Message |
| --- | --- | --- |
| `name` | not empty (after trimming spaces) | `Please enter your name.` |
| `email` | looks like `something@something.something` | `Please enter a valid email address.` |
| `message` | at least 20 characters (after trimming) | `Your message needs at least 20 characters.` |

If everything is fine, it returns `{}`. The Contact page already calls it and shows the messages.

<details>
<summary>Hint: checking an email</summary>

`EMAIL_PATTERN.test(email.trim())` is already in the file: it returns `true` when the text looks like an email. It's a regular expression; ask AI to explain it piece by piece if you're curious.
</details>

✅ All 13 Lab 3 checks pass.

---

## 5. AI code review + the judge checklist (10 min)

1. **Pick one piece of code you wrote today** (`useAirQuality` is a great choice).
2. Ask Continue for a review, not a rewrite:
   > Review this React hook. I'm a student learning React. List up to 5 suggestions about bugs, readability and edge cases, most important first. Explain each one. Don't rewrite the whole file.
3. **Accept at least one** suggestion and make the change. **Reject at least one**, and write one sentence on why.
4. Add both decisions to `AI-LOG.md`.
5. With your partner, go through `docs/JUDGE-CHECKLIST.md`. Fix the first thing that isn't ticked.

✅ Two AI Log entries (one accepted, one rejected), and at least one checklist fix.

---

## Stretch goals

- **Compare two cities** with `Promise.all`: which has cleaner air right now?
- **Your impact over time**: group done actions by `date` and show points per day.
- **Make it yours**: change `src/siteConfig.js` to your team's name and accounts.
- **Exercises 5–7** on `/exercises.html`: TipOfTheDay, SignupForm and Clock.

---

## Done when

- [ ] All Lab 3 checks pass (`npm run check:lab3`), and Lab 2's still do (`npm run check:ui` runs both)
- [ ] Refreshing keeps your actions; live air quality works for your city
- [ ] Home, About, Contact and a 404 page all work from the nav
- [ ] `AI-LOG.md` has your code review: one suggestion accepted, one rejected
- [ ] `npm run build` finishes with no errors

**Stuck or fell behind?** The finished app is on the `session-3-done` branch: `git stash && git checkout session-3-done && npm install`.

---

## From EcoTrack to your hackathon project

EcoTrack's structure works for almost any project. In the last 15 minutes, map your team's idea onto it:

| EcoTrack | Your project |
| --- | --- |
| The action log (state in App, saved with `useLocalStorage`) | What data does your app keep? |
| `ActionForm`, `ActionCard`, `ScoreBoard` | What are your main components? |
| Open-Meteo air quality (`useAirQuality`) | Is there live data you could fetch? |
| Home, About, Contact | What goes on each page for your idea? |
| UN SDGs 3, 11, 13 | Which goal does your project address? |

Write each answer as a GitHub issue. That's your team's to-do list for the hackathon.
