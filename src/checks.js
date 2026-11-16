// Automatic checks for Lab 1.
// Each check runs one of your functions and compares the result
// to what we expect. Run them in the browser (npm run dev)
// or in the terminal (npm run check).
//
// You don't need to edit this file, but reading it is a great way
// to understand exactly what each function should do.

import {
  addAction,
  toggleDone,
  totalPoints,
  pointsByCategory,
  filterByCategory,
  streak,
} from "./ecotrack.js";
import { getAirQuality } from "./airQuality.js";
import { sampleLog } from "./data/sampleLog.js";

// A deep copy, so we can tell later whether a function mutated its input.
const copy = (value) => structuredClone(value);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const checks = [
  // ---- addAction ----------------------------------------------------------
  {
    fn: "addAction",
    name: "adds the action to the end",
    run(log) {
      const action = { id: 99, title: "Test", category: "food", points: 5, co2Kg: 1, date: "2026-11-13", done: false };
      const result = addAction(log, action);
      return { expected: 99, actual: result.at(-1)?.id };
    },
  },
  {
    fn: "addAction",
    name: "does NOT change the original log",
    run(log) {
      const before = copy(log);
      addAction(log, { id: 99 });
      return { expected: before.length, actual: log.length };
    },
  },

  // ---- toggleDone ---------------------------------------------------------
  {
    fn: "toggleDone",
    name: "flips done for the matching id",
    run(log) {
      const result = toggleDone(log, 5);
      return { expected: true, actual: result.find((a) => a.id === 5)?.done };
    },
  },
  {
    fn: "toggleDone",
    name: "leaves other actions alone",
    run(log) {
      const result = toggleDone(log, 5);
      return { expected: true, actual: result.find((a) => a.id === 1)?.done };
    },
  },
  {
    fn: "toggleDone",
    name: "does NOT change the original log",
    run(log) {
      const before = copy(log);
      toggleDone(log, 5);
      return { expected: "unchanged", actual: same(before, log) ? "unchanged" : "changed!" };
    },
  },

  // ---- totalPoints --------------------------------------------------------
  {
    fn: "totalPoints",
    name: "adds up points for DONE actions only",
    run: (log) => ({ expected: 70, actual: totalPoints(log) }),
  },
  {
    fn: "totalPoints",
    name: "returns 0 for an empty log",
    run: (log) => ({ expected: 0, actual: totalPoints([]) }),
  },

  // ---- pointsByCategory ---------------------------------------------------
  {
    fn: "pointsByCategory",
    name: "groups points by category (done only)",
    run: (log) => ({
      expected: { transport: 35, food: 10, energy: 15, waste: 10 },
      actual: pointsByCategory(log),
    }),
  },
  {
    fn: "pointsByCategory",
    name: "returns {} for an empty log",
    run: (log) => ({ expected: {}, actual: pointsByCategory([]) }),
  },

  // ---- filterByCategory ---------------------------------------------------
  {
    fn: "filterByCategory",
    name: "keeps only one category",
    run: (log) => ({
      expected: [1, 4, 6],
      actual: filterByCategory(log, "transport").map((a) => a.id),
    }),
  },
  {
    fn: "filterByCategory",
    name: '"all" returns every action',
    run: (log) => ({ expected: 8, actual: filterByCategory(log, "all").length }),
  },

  // ---- getAirQuality (with a FAKE fetch, so no internet needed) ----------
  {
    fn: "getAirQuality",
    name: "returns { aqi, pm2_5, time } from the API response",
    async run(log) {
      const realFetch = globalThis.fetch;
      let requestedUrl = "";
      globalThis.fetch = async (url) => {
        requestedUrl = String(url);
        return {
          ok: true,
          status: 200,
          json: async () => ({ current: { time: "2026-11-13T15:00", us_aqi: 42, pm2_5: 7.5 } }),
        };
      };
      try {
        const result = await getAirQuality(42.65, -73.75);
        const askedRight = requestedUrl.includes("air-quality") && requestedUrl.includes("42.65");
        return {
          expected: { aqi: 42, pm2_5: 7.5, time: "2026-11-13T15:00", urlLooksRight: true },
          actual: { ...result, urlLooksRight: askedRight },
        };
      } finally {
        globalThis.fetch = realFetch;
      }
    },
  },
  {
    fn: "getAirQuality",
    name: "throws a helpful error when the server fails",
    async run(log) {
      const realFetch = globalThis.fetch;
      globalThis.fetch = async () => ({ ok: false, status: 503, json: async () => ({}) });
      try {
        await getAirQuality(0, 0);
        return { expected: "an error", actual: "no error was thrown" };
      } catch (err) {
        if (err.message.startsWith("TODO")) throw err;
        return { expected: "an error", actual: "an error" };
      } finally {
        globalThis.fetch = realFetch;
      }
    },
  },

  // ---- STRETCH: streak ----------------------------------------------------
  {
    fn: "streak",
    stretch: true,
    name: "counts consecutive days ending today",
    run: (log) => ({ expected: 2, actual: streak(log, "2026-11-10") }),
  },
  {
    fn: "streak",
    stretch: true,
    name: "stops at a day with nothing done",
    run: (log) => ({ expected: 1, actual: streak(log, "2026-11-12") }),
  },
];

/**
 * Run every check.
 * @returns {Promise<Array<{ fn, name, stretch, status: "pass"|"fail"|"todo"|"error", expected, actual, message }>>}
 */
export async function runChecks() {
  const results = [];
  for (const check of checks) {
    const base = { fn: check.fn, name: check.name, stretch: Boolean(check.stretch) };
    try {
      const { expected, actual } = await check.run(copy(sampleLog)); // fresh copy each time
      results.push({ ...base, status: same(expected, actual) ? "pass" : "fail", expected, actual });
    } catch (err) {
      const todo = err?.message?.startsWith("TODO");
      results.push({ ...base, status: todo ? "todo" : "error", message: err?.message ?? String(err) });
    }
  }
  return results;
}
