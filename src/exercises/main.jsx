// Shows the Session 2 and Session 3 exercises at /exercises.html
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Badge, FruitList, LikeButton, SearchList } from "./session-2.jsx";
import { TipOfTheDay, SignupForm, Clock } from "./session-3.jsx";
import "../App.css";

function Exercise({ number, title, goal, children }) {
  return (
    <section className="card exercise">
      <p className="eyebrow">&gt; exercise_{number}</p>
      <h2>{title}</h2>
      <p className="muted">{goal}</p>
      <div className="exercise-output">{children}</div>
    </section>
  );
}

function Exercises() {
  return (
    <>
      <header className="hero">
        <div className="wrap">
          <p className="pill"><span className="dot" />WCTD Level III · Sessions 2 and 3</p>
          <h1>Exercises <span className="accent">in React.</span></h1>
          <p style={{ maxWidth: 640, color: "rgba(255,255,255,.85)" }}>
            Edit <code>src/exercises/session-2.jsx</code> and <code>session-3.jsx</code>. This page reloads every time you save.
          </p>
        </div>
      </header>
      <main className="wrap exercise-grid">
        <h2 className="exercise-section">Session 2: components, props and state</h2>
        <Exercise number="01" title="Badge" goal="Show the category in a colored pill: a different color for each category.">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge category="transport" />
            <Badge category="food" />
            <Badge category="energy" />
            <Badge category="waste" />
          </div>
        </Exercise>
        <Exercise number="02" title="FruitList" goal="Replace the five hard-coded list items with a map over the fruits array. Don't forget the key!">
          <FruitList />
        </Exercise>
        <Exercise number="03" title="LikeButton" goal="A count with + and − buttons. The count can never go below zero.">
          <LikeButton />
        </Exercise>
        <Exercise number="04" title="SearchList" goal="Type in the box to filter the list as you type (ignore upper/lower case).">
          <SearchList />
        </Exercise>

        <h2 className="exercise-section">Session 3: effects, data and forms</h2>
        <Exercise number="05" title="TipOfTheDay" goal="Fetch /tips.json when the component appears. Show Loading… while you wait, a friendly error if it fails, then a random tip.">
          <TipOfTheDay />
        </Exercise>
        <Exercise number="06" title="SignupForm" goal="Name required, a real-looking email, a password of 8+ characters. Show each error under its field, and a welcome when it's all valid.">
          <SignupForm />
        </Exercise>
        <Exercise number="07" title="Clock" goal="Show the time, updated every second. Start a timer in useEffect and clear it in the cleanup.">
          <Clock />
        </Exercise>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Exercises />
  </StrictMode>
);
