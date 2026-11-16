// Runs the Lab 1 checks in the terminal: npm run check
import { runChecks } from "../src/checks.js";

const ICON = { pass: "PASS", fail: "FAIL", todo: "TODO", error: "ERR " };
const COLOR = { pass: 32, fail: 31, todo: 33, error: 31 };
const paint = (code, text) => (process.stdout.isTTY ? `\x1b[${code}m${text}\x1b[0m` : text);

const results = await runChecks();
let lastFn = "";

for (const r of results) {
  if (r.fn !== lastFn) {
    console.log(`\n${r.fn}${r.stretch ? " (stretch)" : ""}`);
    lastFn = r.fn;
  }
  console.log(`  ${paint(COLOR[r.status], ICON[r.status])}  ${r.name}`);
  if (r.status === "fail") {
    console.log(`        expected: ${JSON.stringify(r.expected)}`);
    console.log(`        actual:   ${JSON.stringify(r.actual)}`);
  }
  if (r.status === "error") console.log(`        error: ${r.message}`);
}

const core = results.filter((r) => !r.stretch);
const passed = core.filter((r) => r.status === "pass").length;
console.log(`\n${passed} of ${core.length} core checks passing.`);
if (passed === core.length) console.log("Lab 1 core complete! Try the stretch goal next.");
