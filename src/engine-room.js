// Wires the Lab 1 functions to the page.
// You don't need to change this file in Lab 1 (but you're welcome to read it!).

import { runChecks } from "./checks.js";
import { sampleLog, CATEGORIES } from "./data/sampleLog.js";
import { totalPoints, pointsByCategory, filterByCategory } from "./ecotrack.js";
import { findCity, getAirQuality, describeAqi } from "./airQuality.js";

const $ = (selector) => document.querySelector(selector);

// A tiny helper for building elements: el("p", { className: "x" }, "text")
function el(tag, props = {}, ...children) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------
const LABELS = { pass: "PASS", fail: "FAIL", todo: "TODO", error: "ERROR" };

async function showChecks() {
  const results = await runChecks();
  const container = $("#checks");
  container.replaceChildren();

  // Group results by function name, keeping their order.
  const groups = Map.groupBy(results, (r) => r.fn);

  for (const [fn, items] of groups) {
    const list = el("ul", { className: "check-list" });
    for (const r of items) {
      const detail =
        r.status === "fail"
          ? el("div", { className: "detail" },
              el("div", {}, "expected: ", el("code", {}, JSON.stringify(r.expected))),
              el("div", {}, "actual:   ", el("code", {}, JSON.stringify(r.actual))))
          : r.status === "error"
            ? el("div", { className: "detail" }, el("code", {}, r.message))
            : "";
      list.append(
        el("li", { className: `check check--${r.status}` },
          el("span", { className: "badge" }, LABELS[r.status]),
          el("span", {}, r.name),
          detail)
      );
    }
    const stretch = items[0].stretch ? el("span", { className: "tag" }, "stretch") : "";
    container.append(el("div", { className: "check-group" }, el("h3", {}, el("code", {}, fn), stretch), list));
  }

  const core = results.filter((r) => !r.stretch);
  const passed = core.filter((r) => r.status === "pass").length;
  $("#summary").textContent =
    passed === core.length
      ? `All ${core.length} core checks pass. Nice work! Try the stretch goal.`
      : `${passed} of ${core.length} core checks passing.`;
  $("#summary").classList.toggle("summary--done", passed === core.length);
}

// ---------------------------------------------------------------------------
// Stats from the sample log
// ---------------------------------------------------------------------------
function tryOrTodo(fn) {
  try {
    return fn();
  } catch (err) {
    return err.message.startsWith("TODO") ? null : `Error: ${err.message}`;
  }
}

function showStats() {
  const total = tryOrTodo(() => totalPoints(sampleLog));
  const byCategory = tryOrTodo(() => pointsByCategory(sampleLog));
  const container = $("#stats");

  const big = el("p", { className: "big-number" },
    total === null ? "—" : String(total),
    el("span", {}, " points earned"));

  const rows = CATEGORIES.map((category) => {
    const count = tryOrTodo(() => filterByCategory(sampleLog, category).length);
    const points = byCategory && typeof byCategory === "object" ? byCategory[category] ?? 0 : "—";
    return el("tr", {},
      el("td", {}, category),
      el("td", {}, count === null ? "—" : String(count)),
      el("td", {}, String(points)));
  });

  const table = el("table", { className: "stats" },
    el("thead", {}, el("tr", {}, el("th", {}, "Category"), el("th", {}, "Actions"), el("th", {}, "Points (done)"))),
    el("tbody", {}, ...rows));

  const hint = total === null
    ? el("p", { className: "hint" }, "Finish totalPoints, pointsByCategory and filterByCategory to fill this in.")
    : "";

  container.replaceChildren(big, table, hint);
}

// ---------------------------------------------------------------------------
// Live air quality
// ---------------------------------------------------------------------------
$("#air-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = $("#city").value.trim();
  const out = $("#air-result");
  if (!name) return;

  out.replaceChildren(el("p", { className: "muted" }, "Loading…"));
  try {
    const city = await findCity(name);
    const { aqi, pm2_5, time } = await getAirQuality(city.latitude, city.longitude);
    const { label, color } = describeAqi(aqi);
    out.replaceChildren(
      el("p", { className: "muted" }, `${city.name}, ${city.country}`),
      el("p", { className: "aqi", style: `--aqi-color: ${color}` }, String(aqi), el("span", {}, ` US AQI · ${label}`)),
      el("p", { className: "muted" }, `PM2.5: ${pm2_5} µg/m³ · reading at ${time}`)
    );
  } catch (err) {
    const message = err.message.startsWith("TODO")
      ? "getAirQuality isn't written yet. That's step 3 of the lab!"
      : `Something went wrong: ${err.message}`;
    out.replaceChildren(el("p", { className: "error" }, message));
  }
});

showChecks();
showStats();
