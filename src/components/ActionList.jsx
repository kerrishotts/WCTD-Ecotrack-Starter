// Lab 2, step 3: the list of actions.
//
// Props: actions (an array) and onToggle (pass it through to each card).
//
// - If there are no actions, show: <p className="empty">No actions yet. Add one!</p>
// - Otherwise, show a <ul className="action-list"> with one <ActionCard>
//   per action. Use map, and give each card a key.

import ActionCard from "./ActionCard.jsx";
import Todo from "./Todo.jsx";

export default function ActionList({ actions, onToggle }) {
  return <Todo name="ActionList" step={3} />;
}
