// Session 2 exercises. Open /exercises.html while `npm run dev` is running.
import { useState } from "react";

// ---------------------------------------------------------------------------
// Exercise 1: Badge
// Show `category` in a pill whose background color depends on the category.
// ---------------------------------------------------------------------------
const BADGE_COLORS = {
  transport: "#00ced1",
  food: "#ffa500",
  energy: "#a99bff",
  waste: "#2ecc71",
};

export function Badge({ category }) {
  return (
    <span
      style={{
        background: BADGE_COLORS[category] ?? "#e6e8f0",
        color: "#12141f",
        padding: "4px 12px",
        borderRadius: 999,
        fontWeight: 700,
      }}
    >
      {category}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Exercise 2: FruitList
// Render one <li> per fruit using map. Each item needs a unique key.
// ---------------------------------------------------------------------------
const fruits = ["Apple", "Banana", "Mango", "Kiwi", "Guava"];

export function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Exercise 3: LikeButton
// Keep the count in state. "−" must never take it below zero.
// ---------------------------------------------------------------------------
export function LikeButton() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <button type="button" className="toggle" onClick={() => setCount((c) => Math.max(0, c - 1))}>
        −
      </button>
      <strong style={{ fontSize: "1.5rem", minWidth: 40, textAlign: "center" }}>{count}</strong>
      <button type="button" className="toggle" onClick={() => setCount((c) => c + 1)}>
        +
      </button>
      <span>👍 likes</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exercise 4: SearchList
// A controlled input; show only the items that include what's typed.
// ---------------------------------------------------------------------------
const ideas = ["Bike to school", "Meatless Monday", "Unplug chargers", "Compost scraps", "Reusable bottle", "Shorter showers"];

export function SearchList() {
  const [query, setQuery] = useState("");
  const matches = ideas.filter((idea) => idea.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div>
      <label htmlFor="search">Search ideas</label>
      <input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “bike”" />
      <ul>
        {matches.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>
      {matches.length === 0 && <p className="muted">No matches.</p>}
    </div>
  );
}
