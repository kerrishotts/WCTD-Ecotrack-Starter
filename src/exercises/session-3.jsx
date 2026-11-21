// Session 3 exercises. Open /exercises.html while `npm run dev` is running.
import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// Exercise 5: TipOfTheDay
// When the component appears, fetch "/tips.json" (an array of strings) and
// show one at random. Show "Loading…" while waiting and a friendly message
// if it fails. Bonus: a "Another tip" button.
// Hint: useEffect with [] runs once, when the component first appears.
// ---------------------------------------------------------------------------
export function TipOfTheDay() {
  const [tips, setTips] = useState(null);
  const [error, setError] = useState(null);

  // TODO: fetch /tips.json in a useEffect, then setTips(data)

  if (error) return <p className="error">Couldn’t load a tip.</p>;
  if (!tips) return <p className="muted">Loading… (forever, until you write the fetch!)</p>;
  return <p>💡 {tips[0]}</p>;
}

// ---------------------------------------------------------------------------
// Exercise 6: SignupForm
// Rules: name required; email must look like an email; password at least 8
// characters. Show each error under its field when Sign up is clicked, and a
// welcome message when everything is valid.
// Hint: write a validateSignup(values) function like validateContact in
// src/validation.js, and keep the errors in state.
// ---------------------------------------------------------------------------
export function SignupForm() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  function handleChange(event) {
    setValues((v) => ({ ...v, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: validate, show errors or a welcome message
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "grid", gap: 6 }}>
      <label htmlFor="su-name">Name</label>
      <input id="su-name" name="name" value={values.name} onChange={handleChange} />
      <label htmlFor="su-email">Email</label>
      <input id="su-email" name="email" value={values.email} onChange={handleChange} />
      <label htmlFor="su-password">Password</label>
      <input id="su-password" name="password" type="password" value={values.password} onChange={handleChange} />
      <button type="submit" className="toggle" style={{ justifySelf: "start", marginTop: 6 }}>Sign up</button>
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

  // TODO: start a timer that calls setNow(new Date()) every 1000 ms,
  // and return a cleanup function that clears it.

  return <p style={{ font: "800 2rem var(--mono)", margin: 0 }}>{now.toLocaleTimeString()}</p>;
}
