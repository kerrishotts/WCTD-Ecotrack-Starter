// Lab 2, step 4: total points and a bar per category.
//
// Props: log (the whole action log).
// Reuse your Session 1 functions (already imported below): no new math!
//
// Show:
//   - a heading: <h2 id="score-title">Your impact</h2>
//   - the total in <p className="big" aria-label="Total points">{total}</p>
//   - STRETCH: one bar per category. The CSS classes bars, bar, fill and
//     cat-<category> are ready in App.css.

import { totalPoints, pointsByCategory } from "../ecotrack.js";
import { CATEGORIES } from "../data/sampleLog.js";
import Todo from "./Todo.jsx";

export default function ScoreBoard({ log }) {
  return (
    <section className="card score" aria-labelledby="score-title">
      <h2 id="score-title">Your impact</h2>
      <Todo name="ScoreBoard" step={4} />
    </section>
  );
}
