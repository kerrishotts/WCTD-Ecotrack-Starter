// Sample data for EcoTrack.
// Each "action" is something sustainable a person did (or plans to do).
//
//   id        unique number
//   title     what they did
//   category  "transport" | "food" | "energy" | "waste"
//   points    how many EcoTrack points it's worth
//   co2Kg     roughly how many kilograms of CO2 it saved
//   date      "YYYY-MM-DD"
//   done      true once they've actually done it

export const CATEGORIES = ["transport", "food", "energy", "waste"];

export const sampleLog = [
  { id: 1, title: "Biked to school", category: "transport", points: 20, co2Kg: 2.4, date: "2026-11-09", done: true },
  { id: 2, title: "Meatless lunch", category: "food", points: 10, co2Kg: 1.5, date: "2026-11-09", done: true },
  { id: 3, title: "Unplugged chargers overnight", category: "energy", points: 5, co2Kg: 0.2, date: "2026-11-10", done: true },
  { id: 4, title: "Took the bus to practice", category: "transport", points: 15, co2Kg: 1.8, date: "2026-11-10", done: true },
  { id: 5, title: "Brought a reusable bottle", category: "waste", points: 5, co2Kg: 0.1, date: "2026-11-11", done: false },
  { id: 6, title: "Walked to a friend's house", category: "transport", points: 10, co2Kg: 1.2, date: "2026-11-11", done: false },
  { id: 7, title: "Shorter shower", category: "energy", points: 10, co2Kg: 0.5, date: "2026-11-12", done: true },
  { id: 8, title: "Composted food scraps", category: "waste", points: 10, co2Kg: 0.4, date: "2026-11-12", done: true }
];
