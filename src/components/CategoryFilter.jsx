// WORKED EXAMPLE: a component that shows a value and reports changes.
//
// Notice that CategoryFilter does NOT keep its own state. Its parent (App)
// owns the current category and passes it down as `value`. When a button
// is clicked, CategoryFilter calls `onChange` to tell the parent.
// This is called "lifting state up".

import { CATEGORIES } from "../data/sampleLog.js";

const OPTIONS = ["all", ...CATEGORIES];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="filter" role="group" aria-label="Filter by category">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={option === value ? "chip chip--on" : "chip"}
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
