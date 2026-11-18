// App owns the data. Every other component gets what it needs as props.

import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import ActionForm from "./components/ActionForm.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import ActionList from "./components/ActionList.jsx";
import { sampleLog } from "./data/sampleLog.js";
import { addAction, toggleDone, filterByCategory, newAction } from "./ecotrack.js";

const STORAGE_KEY = "ecotrack-log";
const today = () => new Date().toISOString().slice(0, 10);

// STRETCH: start from the saved log if there is one.
function loadLog() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : sampleLog;
  } catch {
    return sampleLog;
  }
}

export default function App() {
  const [log, setLog] = useState(loadLog);
  const [category, setCategory] = useState("all");

  // STRETCH: save the log whenever it changes (more on useEffect in Session 3).
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
    } catch {
      // storage can be unavailable (private browsing); the app still works
    }
  }, [log]);

  function handleToggle(id) {
    setLog((current) => toggleDone(current, id));
  }

  function handleAdd(fields) {
    const action = newAction(fields, { id: Date.now(), date: today() });
    setLog((current) => addAction(current, action));
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
            <CategoryFilter value={category} onChange={setCategory} />
          </div>
          <ActionList actions={visible} onToggle={handleToggle} />
        </section>
      </main>
      <footer className="wrap footer">
        EcoTrack supports UN SDGs 3, 11 and 13 · Session 1 engine room: <a href="/engine.html">/engine.html</a>
      </footer>
    </>
  );
}
