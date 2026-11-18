// Lab 2, step 5: a form for logging a new action.
//
// Props: onAdd, a function to call with { title, category }.
// The inputs are "controlled": their values live in state.

import { useState } from "react";
import { CATEGORIES } from "../data/sampleLog.js";

export default function ActionForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("transport");

  const trimmed = title.trim();

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    if (!trimmed) return;
    onAdd({ title: trimmed, category });
    setTitle(""); // clear the box for the next one
  }

  return (
    <form className="card action-form" onSubmit={handleSubmit}>
      <h2>Log an action</h2>

      <label htmlFor="action-title">What did you do?</label>
      <input
        id="action-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="e.g. Biked to school"
        autoComplete="off"
      />

      <label htmlFor="action-category">Category</label>
      <select
        id="action-category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button type="submit" disabled={!trimmed}>
        Add action
      </button>
    </form>
  );
}
