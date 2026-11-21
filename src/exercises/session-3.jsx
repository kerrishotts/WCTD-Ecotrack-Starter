// Session 3 exercises. Open /exercises.html while `npm run dev` is running.
import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// Exercise 5: TipOfTheDay
// When the component appears, fetch "/tips.json" (an array of strings) and
// show one at random. Show "Loading…" while waiting and a friendly message
// if it fails. Bonus: a "Another tip" button.
// ---------------------------------------------------------------------------
export function TipOfTheDay() {
  const [tips, setTips] = useState(null);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/tips.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!ignore) {
          setTips(data);
          setIndex(Math.floor(Math.random() * data.length));
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []); // [] = run once, when the component first appears

  if (error) return <p className="error">Couldn’t load a tip ({error}). Try refreshing.</p>;
  if (!tips) return <p className="muted">Loading…</p>;

  return (
    <div>
      <p style={{ fontSize: "1.15rem", margin: "0 0 10px" }}>💡 {tips[index]}</p>
      <button type="button" className="toggle" onClick={() => setIndex((i) => (i + 1) % tips.length)}>
        Another tip
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exercise 6: SignupForm
// Rules: name required; email must look like an email; password at least 8
// characters. Show each error under its field when Sign up is clicked, and a
// welcome message when everything is valid.
// ---------------------------------------------------------------------------
function validateSignup({ name, email, password }) {
  const errors = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "That email doesn’t look right.";
  if (password.length < 8) errors.password = "Use at least 8 characters.";
  return errors;
}

export function SignupForm() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [welcome, setWelcome] = useState("");

  function handleChange(event) {
    setValues((v) => ({ ...v, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validateSignup(values);
    setErrors(found);
    setWelcome(Object.keys(found).length === 0 ? `Welcome, ${values.name.trim()}!` : "");
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "grid", gap: 6 }}>
      <label htmlFor="su-name">Name</label>
      <input id="su-name" name="name" value={values.name} onChange={handleChange} />
      {errors.name && <span className="field-error">{errors.name}</span>}
      <label htmlFor="su-email">Email</label>
      <input id="su-email" name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span className="field-error">{errors.email}</span>}
      <label htmlFor="su-password">Password</label>
      <input id="su-password" name="password" type="password" value={values.password} onChange={handleChange} />
      {errors.password && <span className="field-error">{errors.password}</span>}
      <button type="submit" className="toggle" style={{ justifySelf: "start", marginTop: 6 }}>Sign up</button>
      {welcome && <p className="done-label">{welcome}</p>}
    </form>
  );
}

// ---------------------------------------------------------------------------
// Exercise 7: Clock
// Show the current time, updated every second. Use setInterval inside
// useEffect, and clear it in the cleanup function.
// ---------------------------------------------------------------------------
export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id); // without this, every visit adds another timer
  }, []);

  return <p style={{ font: "800 2rem var(--mono)", margin: 0 }}>{now.toLocaleTimeString()}</p>;
}
