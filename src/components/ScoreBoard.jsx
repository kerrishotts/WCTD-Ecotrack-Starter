// Lab 2, step 4: total points and a bar per category.
//
// Props: log (the whole action log).
// It reuses your Session 1 functions: no new math needed!

import { totalPoints, pointsByCategory } from "../ecotrack.js";
import { CATEGORIES } from "../data/sampleLog.js";

export default function ScoreBoard({ log }) {
  const total = totalPoints(log);
  const byCategory = pointsByCategory(log);

  return (
    <section className="card score" aria-labelledby="score-title">
      <h2 id="score-title">Your impact</h2>
      <p className="big" aria-label="Total points">{total}</p>
      <p className="muted">points earned</p>
      <ul className="bars">
        {CATEGORIES.map((category) => {
          const points = byCategory[category] ?? 0;
          const percent = total === 0 ? 0 : Math.round((points / total) * 100);
          return (
            <li key={category}>
              <span className="bar-label">{category}</span>
              <span className="bar">
                <span className={`fill cat-${category}`} style={{ width: `${percent}%` }} />
              </span>
              <span className="bar-value">{points}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
