// EcoTrack engine: pure functions that work with an action log.
//
// "Pure" means each function:
//   - only uses the arguments it is given
//   - never changes (mutates) those arguments
//   - returns a NEW value instead
//
// In Session 2, React will call these same functions to power the UI,
// and React depends on you never mutating your data.

/**
 * Add an action to the end of the log.
 * @param {object[]} log - the current list of actions
 * @param {object} action - the action to add
 * @returns {object[]} a NEW array with the action at the end
 */
export function addAction(log, action) {
  return [...log, action];
}

/**
 * Flip the `done` value of the action with the matching id.
 * @param {object[]} log
 * @param {number} id
 * @returns {object[]} a NEW array; the matching action is a NEW object
 */
export function toggleDone(log, id) {
  return log.map((action) =>
    action.id === id ? { ...action, done: !action.done } : action
  );
}

/**
 * Total points for actions that are DONE.
 * Planned (not done) actions don't count yet.
 * @param {object[]} log
 * @returns {number}
 */
export function totalPoints(log) {
  return log
    .filter((action) => action.done)
    .reduce((total, action) => total + action.points, 0);
}

/**
 * Points per category, for DONE actions only.
 * Example: { transport: 35, food: 10, energy: 15, waste: 10 }
 * Categories with no done actions are left out.
 * @param {object[]} log
 * @returns {Record<string, number>}
 */
export function pointsByCategory(log) {
  return log
    .filter(({ done }) => done)
    .reduce((totals, { category, points }) => {
      totals[category] = (totals[category] ?? 0) + points;
      return totals;
    }, {});
}

/**
 * Only the actions in one category. "all" returns every action.
 * @param {object[]} log
 * @param {string} category
 * @returns {object[]}
 */
export function filterByCategory(log, category) {
  if (category === "all") return log;
  return log.filter((action) => action.category === category);
}

// ---------------------------------------------------------------------------
// STRETCH
// ---------------------------------------------------------------------------

/**
 * How many days in a row, ending on `today`, had at least one DONE action?
 * @param {object[]} log
 * @param {string} today - "YYYY-MM-DD"
 * @returns {number}
 */
export function streak(log, today) {
  const doneDays = new Set(log.filter((a) => a.done).map((a) => a.date));
  let count = 0;
  const day = new Date(`${today}T00:00:00Z`);
  while (doneDays.has(day.toISOString().slice(0, 10))) {
    count++;
    day.setUTCDate(day.getUTCDate() - 1);
  }
  return count;
}
