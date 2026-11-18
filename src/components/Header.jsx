// WORKED EXAMPLE: the simplest kind of component.
// It's a function that receives props (destructured right in the
// parameters, just like Session 1) and returns JSX.

export default function Header({ title, tagline }) {
  return (
    <header className="hero">
      <div className="wrap">
        <p className="pill">
          <span className="dot" />
          WCTD Level III · Session 2
        </p>
        <h1>
          {title} <span className="accent">{tagline}</span>
        </h1>
      </div>
    </header>
  );
}
