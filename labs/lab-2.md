# Lab 2: EcoTrack Gets a Face

**Session 2 · 60 minutes · work in pairs**

In Lab 1 you built EcoTrack's engine. Now you'll build its user interface in React. Your Session 1 functions (`toggleDone`, `totalPoints`, `filterByCategory`, …) are already in `src/ecotrack.js`, and React will call them for you.

By the end of this lab you will have:

- Built components that receive data through **props**
- Rendered a list with `map` and `key`
- Stored changing data in **state** with `useState`
- Built a **controlled form**
- Asked AI for a second opinion on your design, and judged its answer

---

## 0. Get set up (5 min)

```bash
npm install          # new packages this session: React and the test tools
npm run dev          # the app
npm run check:ui     # the Lab 2 checks (run this in a second terminal)
```

Open the app. You'll see orange **TODO** boxes where components still need building. All 13 checks fail for now.

| File | What it is |
| --- | --- |
| `src/App.jsx` | Owns the data. You'll add state here in step 4 |
| `src/components/Header.jsx` | **Worked example**: the simplest component |
| `src/components/CategoryFilter.jsx` | **Worked example**: props in, events out |
| `src/components/ActionCard.jsx` | Step 2 |
| `src/components/ActionList.jsx` | Step 3 |
| `src/components/ScoreBoard.jsx` | Step 4 |
| `src/components/ActionForm.jsx` | Step 5 |
| `src/lab2.test.jsx` | The checks. Read these if you're unsure what a component should do |

> **Rule for today: no AI writing components.** AI is your *design partner* (step 1) and your *explainer* (when an error message confuses you). You write the JSX.

---

## 1. Sketch it, then ask for a second opinion (10 min)

1. **On paper**, sketch the EcoTrack screen. Draw a box around every piece that could be its own component and name it. Then answer: *which component should own the action log?* Which ones just *display* it?
2. **AI checkpoint: second opinion.** Describe your sketch to Continue:
   > I'm building EcoTrack in React. My components are: App, Header, ActionForm, ScoreBoard, CategoryFilter, ActionList, ActionCard. ActionForm adds actions, ActionCard can mark one done, ScoreBoard shows totals. Where should the log's state live, and why? Don't write code; just explain.
3. **Compare.** Did the AI agree with your team? If you disagree, who's right? Use what you learned about *lifting state up* to decide.
4. Write one row in `AI-LOG.md` about what you asked, what it said, and who was right.

✅ Your team can explain why the log lives in `App`.

---

## 2. ActionCard (10 min)

Open `ActionCard.jsx`. Its props are every field of an action, plus `onToggle`.

Build an `<li>` that shows:

- the **title** in an `<h3>`
- the **category** and **points** (like `20 pts`)
- a **button** that says `Mark done`, or `Undo` if the action is done, and calls `onToggle(id)` when clicked

The preview card at the top of the list (in `App.jsx`) shows your work as you save.

<details>
<summary>Hint: the button's text</summary>

That's a ternary expression from Session 1: `{done ? "Undo" : "Mark done"}`
</details>

<details>
<summary>Hint: onClick</summary>

`onClick` needs a *function*, not a call. Write `onClick={() => onToggle(id)}`, not `onClick={onToggle(id)}`. The second one runs immediately, every time the card draws.
</details>

<details>
<summary>Hint: making it look right</summary>

The CSS is ready: `<li className="action cat-transport">`, add `action--done` when it's done. Inside: `action-text`, `meta`, `badge`, `done-label`, `toggle`. You can build the class name with a template literal: `` className={`action cat-${category}`} ``.
</details>

✅ The 4 **Step 2** checks pass.

---

## 3. ActionList (10 min)

Open `ActionList.jsx`. Its props are `actions` (an array) and `onToggle`.

- If `actions` is empty, show `<p className="empty">No actions yet. Add one!</p>`
- Otherwise, show `<ul className="action-list">` with one `<ActionCard>` per action

Then **delete the step 2 preview** in `App.jsx`.

<details>
<summary>Hint: passing every field at once</summary>

Spread syntax works on props too: `<ActionCard key={action.id} {...action} onToggle={onToggle} />`
</details>

<details>
<summary>Hint: "Each child in a list should have a unique key"</summary>

React needs a `key` on each item it creates with `map` so it can tell them apart. Use something unique and stable, like `action.id`. Not the array index!
</details>

✅ The 2 **Step 3** checks pass, and all 8 sample actions appear.

---

## 4. State: make it move (15 min)

Right now nothing changes when you click. That's because `log` in `App.jsx` is a plain constant.

1. In `App.jsx`, store the log in state: `const [log, setLog] = useState(sampleLog);`
2. Write `handleToggle(id)`: call `setLog` with a **new** log where that action is toggled. (Your Session 1 `toggleDone` does exactly this.)
3. Store the filter's `category` in state, starting at `"all"`, and pass the setter to `CategoryFilter`'s `onChange`.
4. Build `ScoreBoard.jsx`: show `totalPoints(log)` in `<p className="big" aria-label="Total points">`.

<details>
<summary>Hint: why not log.push or action.done = true?</summary>

React only re-draws when you give `setLog` a **new** array. If you change the old one, React thinks nothing happened (remember Mutation Detective?). `toggleDone` returns a new array, so `setLog(toggleDone(log, id))` works.
</details>

<details>
<summary>Hint: the updater form</summary>

`setLog((current) => toggleDone(current, id))` always uses the very latest log. It's a good habit, especially when updates happen quickly.
</details>

✅ The 3 **Step 4** checks pass. Click "Mark done" on the reusable bottle: the total goes from 70 to 75.

**Stretch:** draw a bar per category in `ScoreBoard` using `pointsByCategory`. The CSS classes `bars`, `bar`, `fill` and `cat-<category>` are ready.

---

## 5. ActionForm: controlled inputs (10 min)

Open `ActionForm.jsx`. Its only prop is `onAdd`.

1. Keep `title` and `category` in state (start category at `"transport"`).
2. Build an `<input>` labeled **What did you do?** and a `<select>` labeled **Category**, each with `value` and `onChange`.
3. Add a submit button, **Add action**, disabled while the title is empty.
4. On submit: `event.preventDefault()`, call `onAdd({ title, category })` with the title trimmed, then clear the title.
5. Back in `App.jsx`, write `handleAdd(fields)`: build an action with `newAction(fields, { id: Date.now(), date: today() })` and add it with `setLog` and `addAction`.

<details>
<summary>Hint: labels that tests (and screen readers) can find</summary>

Connect a label to its input with matching `htmlFor` and `id`:
`<label htmlFor="action-title">What did you do?</label>` `<input id="action-title" … />`
</details>

<details>
<summary>Hint: a controlled input</summary>

`<input value={title} onChange={(event) => setTitle(event.target.value)} />`. The input shows whatever is in state, and every keystroke updates the state.
</details>

✅ All 13 checks pass. You can add, mark done, and filter actions, and the score updates live.

---

## Stretch: remember the log

Refresh the page and your changes vanish. Save the log to `localStorage` so it survives a refresh. You'll need `useEffect`, which we cover properly in Session 3. Try reading [React's useEffect docs](https://react.dev/reference/react/useEffect) first, then ask AI to *explain* (not write) anything you don't understand.

---

## Done when

- [ ] All 13 checks pass (`npm run check:ui`)
- [ ] You can add an action, mark it done, and filter by category
- [ ] Your team can explain why the log's state lives in `App`
- [ ] `AI-LOG.md` has an entry for the step 1 design review

**Stuck or fell behind?** The finished version is on the `session-2-done` branch: `git stash && git checkout session-2-done`.
