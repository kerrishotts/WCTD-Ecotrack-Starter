// The tracker: everything you built in Session 2, plus live air quality.
//
// The log lives in App (the About page needs it too), so it arrives as a
// prop. The category filter is only used here, so its state lives here.

import { useState } from "react";
import ActionForm from "../components/ActionForm.jsx";
import ScoreBoard from "../components/ScoreBoard.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ActionList from "../components/ActionList.jsx";
import AirQualityPanel from "../components/AirQualityPanel.jsx";
import { filterByCategory } from "../ecotrack.js";

export default function HomePage({ log, onAdd, onToggle }) {
  const [category, setCategory] = useState("all");
  const visible = filterByCategory(log, category);

  return (
    <div className="layout">
      <title>EcoTrack · Track your impact</title>
      <div className="side">
        <ActionForm onAdd={onAdd} />
        <ScoreBoard log={log} />
        <AirQualityPanel />
      </div>
      <section className="card" aria-labelledby="actions-title">
        <div className="list-head">
          <h2 id="actions-title">Your actions</h2>
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
        <ActionList actions={visible} onToggle={onToggle} />
      </section>
    </div>
  );
}
