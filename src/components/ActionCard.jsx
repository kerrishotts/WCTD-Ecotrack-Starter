// Lab 2, step 2: one action in the list.
//
// Props: every field of an action (id, title, category, points, done, ...)
// plus onToggle, a function to call with the action's id.

export default function ActionCard({ id, title, category, points, done, onToggle }) {
  return (
    <li className={done ? `action action--done cat-${category}` : `action cat-${category}`}>
      <div className="action-text">
        <h3>{title}</h3>
        <p className="meta">
          <span className="badge">{category}</span>
          <span>{points} pts</span>
          {done && <span className="done-label">✓ Done</span>}
        </p>
      </div>
      <button type="button" className="toggle" onClick={() => onToggle(id)}>
        {done ? "Undo" : "Mark done"}
      </button>
    </li>
  );
}
