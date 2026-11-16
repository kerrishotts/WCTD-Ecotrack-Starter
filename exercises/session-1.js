// Session 1 exercises: run with  node exercises/session-1.js
// Each exercise prints whether your answer matches what's expected.

const show = (label, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log("      expected:", expected, "\n      actual:  ", actual);
};

// ---------------------------------------------------------------------------
// Exercise 1: Level II, leveled up.
// Rewrite each function as an ARROW function that uses DESTRUCTURING.
// ---------------------------------------------------------------------------

// Level II version:
//   function describeCar(car) {
//     return `${car.year} ${car.make} ${car.model}`;
//   }
const describeCar = ({ year, make, model }) => `${year} ${make} ${model}`;

// Level II version:
//   function characterLine(character) {
//     return character.name + " (played by " + character.actor + ")";
//   }
const characterLine = ({ name, actor }) => `${name} (played by ${actor})`;

// Level II version:
//   function firstAndLast(list) {
//     return [list[0], list[list.length - 1]];
//   }
const firstAndLast = (list) => {
  const [first] = list;
  return [first, list.at(-1)];
};

show("describeCar", describeCar({ year: "2001", make: "Toyota", model: "Corolla" }), "2001 Toyota Corolla");
show("characterLine", characterLine({ name: "Leia Organa", actor: "Carrie Fisher" }), "Leia Organa (played by Carrie Fisher)");
show("firstAndLast", firstAndLast(["spring", "summer", "autumn", "winter"]), ["spring", "winter"]);

// ---------------------------------------------------------------------------
// Exercise 2: Mark it done, without mutating.
// Return a NEW array where the action with `id` has done: true.
// The original array and its objects must not change.
// ---------------------------------------------------------------------------
const markDone = (log, id) => log.map((a) => (a.id === id ? { ...a, done: true } : a));

const log = [
  { id: 1, title: "Bike to school", done: false },
  { id: 2, title: "Meatless lunch", done: false },
];
const updated = markDone(log, 2);
show("markDone sets done", updated[1].done, true);
show("markDone leaves original alone", log[1].done, false);

// ---------------------------------------------------------------------------
// Exercise 3: Count by category with reduce.
// Return an object like { transport: 2, food: 1 }: how many ACTIONS
// (not points) are in each category.
// ---------------------------------------------------------------------------
const countByCategory = (actions) =>
  actions.reduce((counts, { category }) => {
    counts[category] = (counts[category] ?? 0) + 1;
    return counts;
  }, {});

show(
  "countByCategory",
  countByCategory([
    { category: "transport" },
    { category: "food" },
    { category: "transport" },
  ]),
  { transport: 2, food: 1 }
);

// ---------------------------------------------------------------------------
// Exercise 4: Two requests at once.
// Fetch the current temperature for two places IN PARALLEL with Promise.all,
// then return the name of the warmer one.
// API: https://api.open-meteo.com/v1/forecast?latitude=..&longitude=..&current=temperature_2m
// (needs the internet)
// ---------------------------------------------------------------------------
const getTemperature = async ({ latitude, longitude }) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { current } = await res.json();
  return current.temperature_2m;
};

const warmerPlace = async (placeA, placeB) => {
  const [tempA, tempB] = await Promise.all([getTemperature(placeA), getTemperature(placeB)]);
  console.log(`      ${placeA.name}: ${tempA}°C, ${placeB.name}: ${tempB}°C`);
  return tempA >= tempB ? placeA.name : placeB.name;
};

try {
  const winner = await warmerPlace(
    { name: "Albany", latitude: 42.65, longitude: -73.75 },
    { name: "Mumbai", latitude: 19.08, longitude: 72.88 }
  );
  show("getTemperature returns a number", Number.isFinite(await getTemperature({ latitude: 42.65, longitude: -73.75 })), true);
  show("warmerPlace returns one of the names", ["Albany", "Mumbai"].includes(winner), true);
} catch (err) {
  console.log(`SKIP  warmerPlace (${err.message}). Are you online?`);
}
