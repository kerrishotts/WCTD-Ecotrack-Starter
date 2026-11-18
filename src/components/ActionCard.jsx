// Lab 2, step 2: one action in the list.
//
// Props: every field of an action (id, title, category, points, done, ...)
// plus onToggle, a function to call with the action's id.
//
// Build an <li> that shows:
//   - the title (in an <h3>)
//   - the category and the points, like "20 pts"
//   - a button that says "Mark done" (or "Undo" if the action is done)
//     and calls onToggle(id) when clicked
//
// Look at Header.jsx and CategoryFilter.jsx for examples.
// The CSS classes in App.css are ready for you: action, action--done,
// action-text, meta, badge, done-label, toggle.

export default function ActionCard({ id, title, category, points, done, onToggle }) {
  return (
    <li className="todo">
      TODO: build <code>ActionCard</code> (Lab 2, step 2) for “{title}”
    </li>
  );
}
