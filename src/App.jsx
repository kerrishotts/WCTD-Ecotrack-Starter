// App owns the data. Every other component gets what it needs as props.

import { useState } from "react";
import Header from "./components/Header.jsx";
import ActionForm from "./components/ActionForm.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import ActionList from "./components/ActionList.jsx";
import ActionCard from "./components/ActionCard.jsx";
import { sampleLog } from "./data/sampleLog.js";
import { addAction, toggleDone, filterByCategory, newAction } from "./ecotrack.js";

const today = () => new Date().toISOString().slice(0, 10);

export default function App() {
  // TODO (Lab step 4): the log never changes yet. Store it in state instead:
  // useState gives you the current value and a function to replace it.
  const log = sampleLog;

  // TODO (Lab step 4): the filter is stuck on "all". Store it in state too.
  const category = "all";

  function handleToggle(id) {
    // TODO (Lab step 4): replace the log with a NEW log where this action
    // is toggled. Your Session 1 toggleDone function does the hard part.
    console.log("TODO: toggle action", id);
  }

  function handleAdd(fields) {
    // TODO (Lab step 5): build a full action with newAction(fields, { id, date })
    // and add it to the log with addAction. Use Date.now() for the id and
    // today() for the date.
    console.log("TODO: add action", fields);
  }

  const visible = filterByCategory(log, category);

  return (
    <>
      <Header title="EcoTrack." tagline="Small actions, big impact." />
      <main className="wrap layout">
        <div className="side">
          <ActionForm onAdd={handleAdd} />
          <ScoreBoard log={log} />
        </div>
        <section className="card" aria-labelledby="actions-title">
          <div className="list-head">
            <h2 id="actions-title">Your actions</h2>
            <CategoryFilter value={category} onChange={(c) => console.log("TODO: filter by", c)} />
          </div>

          {/* Step 2 preview: one card on its own. Delete this in step 3. */}
          <ul className="action-list" style={{ marginBottom: 12 }}>
            <ActionCard {...sampleLog[0]} onToggle={handleToggle} />
          </ul>

          <ActionList actions={visible} onToggle={handleToggle} />
        </section>
      </main>
      <footer className="wrap footer">
        EcoTrack supports UN SDGs 3, 11 and 13 · Session 1 engine room: <a href="/engine.html">/engine.html</a>
      </footer>
    </>
  );
}
