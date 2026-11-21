// About: what EcoTrack is for, how points work, and the impact so far.
// Judges look for a clear problem, a clear solution, and who built it.

import { Link } from "react-router";
import { totalPoints, co2Saved, POINTS } from "../ecotrack.js";
import { CATEGORIES } from "../data/sampleLog.js";
import { SITE } from "../siteConfig.js";

const GOALS = [
  { number: 3, name: "Good Health and Well-being", why: "Cleaner air and more walking and biking mean healthier people." },
  { number: 11, name: "Sustainable Cities and Communities", why: "Live air quality helps people see how their city is doing." },
  { number: 13, name: "Climate Action", why: "Every logged action estimates the CO₂ it saved." },
];

export default function AboutPage({ log }) {
  const done = log.filter((action) => action.done).length;

  return (
    <div className="stack">
      <title>About · EcoTrack</title>

      <section className="card">
        <h2>About EcoTrack</h2>
        <p className="lead-text">
          Climate change can feel too big for one person. EcoTrack makes it personal: log the small things you do,
          like biking instead of getting a ride, and watch them add up.
        </p>
        <div className="stats">
          <div className="stat">
            <span className="stat-number">{done}</span>
            <span className="muted">actions done</span>
          </div>
          <div className="stat">
            <span className="stat-number">{totalPoints(log)}</span>
            <span className="muted">points earned</span>
          </div>
          <div className="stat">
            <span className="stat-number">{co2Saved(log)} kg</span>
            <span className="muted">of CO₂ saved (estimate)</span>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>The goals we’re working toward</h2>
        <ul className="goals">
          {GOALS.map((goal) => (
            <li key={goal.number}>
              <span className="goal-number">SDG {goal.number}</span>
              <div>
                <h3>{goal.name}</h3>
                <p className="muted">{goal.why}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>How points work</h2>
        <table className="points-table">
          <thead>
            <tr><th>Category</th><th>Points per action</th></tr>
          </thead>
          <tbody>
            {CATEGORIES.map((category) => (
              <tr key={category}>
                <td className="capitalize">{category}</td>
                <td>{POINTS[category]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted small">CO₂ numbers are rough estimates, meant to show scale rather than exact science.</p>
      </section>

      <section className="card">
        <h2>Who built this</h2>
        <p>
          EcoTrack was built by <strong>{SITE.team}</strong> at the We Connect The Dots Hack-A-Thon, with AI as one of
          our teammates. Want to see how we used it? It’s all in our AI Log.
        </p>
        <p>
          Questions or ideas? <Link to="/contact">Get in touch</Link>.
        </p>
      </section>
    </div>
  );
}
