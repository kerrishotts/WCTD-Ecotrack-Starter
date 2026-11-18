// A placeholder that shows where a component still needs to be built.
export default function Todo({ name, step, children }) {
  return (
    <div className="todo">
      TODO: build <code>{name}</code> (Lab 2, step {step}){children}
    </div>
  );
}
