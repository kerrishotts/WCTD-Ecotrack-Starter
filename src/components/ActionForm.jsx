// Lab 2, step 5: a form for logging a new action.
//
// Props: onAdd, a function to call with { title, category }.
//
// The inputs must be "controlled": keep their values in state with
// useState, set `value`, and update the state in `onChange`.
//
// The tests look for:
//   - an input labeled "What did you do?"
//   - a select labeled "Category" (one <option> per category)
//   - a button "Add action" that is disabled while the title is empty
// When the form is submitted:
//   1. call event.preventDefault()  (remember Level II?)
//   2. call onAdd({ title, category }) with the title trimmed
//   3. clear the title box

import { useState } from "react";
import { CATEGORIES } from "../data/sampleLog.js";

export default function ActionForm({ onAdd }) {
  return (
    <form className="card action-form">
      <h2>Log an action</h2>
      <p className="todo">
        TODO: build <code>ActionForm</code> (Lab 2, step 5)
      </p>
    </form>
  );
}
