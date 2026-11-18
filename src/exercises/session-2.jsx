// Session 2 exercises. Open /exercises.html while `npm run dev` is running.
import { useState } from "react";

// ---------------------------------------------------------------------------
// Exercise 1: Badge
// Show `category` in a pill whose background color depends on the category.
// Hint: look up the color in BADGE_COLORS and use a style object:
//   style={{ background: ..., padding: "4px 12px", borderRadius: 999 }}
// ---------------------------------------------------------------------------
const BADGE_COLORS = {
  transport: "#00ced1",
  food: "#ffa500",
  energy: "#a99bff",
  waste: "#2ecc71",
};

export function Badge({ category }) {
  return <span>{category}</span>; // TODO: make it a colored pill
}

// ---------------------------------------------------------------------------
// Exercise 2: FruitList
// Render one <li> per fruit using map. Each item needs a unique key.
// ---------------------------------------------------------------------------
const fruits = ["Apple", "Banana", "Mango", "Kiwi", "Guava"];

export function FruitList() {
  // TODO: replace these five lines with fruits.map(...)
  return (
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Mango</li>
      <li>Kiwi</li>
      <li>Guava</li>
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Exercise 3: LikeButton
// Keep the count in state. "−" must never take it below zero.
// ---------------------------------------------------------------------------
export function LikeButton() {
  const count = 0; // TODO: useState

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <button type="button" className="toggle">−</button>
      <strong style={{ fontSize: "1.5rem", minWidth: 40, textAlign: "center" }}>{count}</strong>
      <button type="button" className="toggle">+</button>
      <span>👍 likes</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exercise 4: SearchList
// A controlled input; show only the items that include what's typed.
// Hint: idea.toLowerCase().includes(query.toLowerCase())
// ---------------------------------------------------------------------------
const ideas = ["Bike to school", "Meatless Monday", "Unplug chargers", "Compost scraps", "Reusable bottle", "Shorter showers"];

export function SearchList() {
  // TODO: keep the query in state and filter `ideas` with it
  return (
    <div>
      <label htmlFor="search">Search ideas</label>
      <input id="search" placeholder="Try “bike”" />
      <ul>
        {ideas.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>
    </div>
  );
}
