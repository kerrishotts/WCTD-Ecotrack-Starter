// Shows the Session 2 exercises side by side at /exercises.html
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Badge, FruitList, LikeButton, SearchList } from "./session-2.jsx";
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
          <p className="pill"><span className="dot" />WCTD Level III · Session 2</p>
          <h1>Exercises <span className="accent">in React.</span></h1>
          <p style={{ maxWidth: 640, color: "rgba(255,255,255,.85)" }}>
            Edit <code>src/exercises/session-2.jsx</code>. This page reloads every time you save.
          </p>
        </div>
      </header>
      <main className="wrap exercise-grid">
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
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Exercises />
  </StrictMode>
);
