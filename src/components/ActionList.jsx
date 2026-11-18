// Lab 2, step 3: the list of actions.
//
// Props: actions (an array) and onToggle (passed through to each card).

import ActionCard from "./ActionCard.jsx";

export default function ActionList({ actions, onToggle }) {
  if (actions.length === 0) {
    return <p className="empty">No actions yet. Add one!</p>;
  }

  return (
    <ul className="action-list">
      {actions.map((action) => (
        <ActionCard key={action.id} {...action} onToggle={onToggle} />
      ))}
    </ul>
  );
}
