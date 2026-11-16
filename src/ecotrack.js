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
  // Return a NEW array. Hint: spread syntax [...]
  throw new Error("TODO: write addAction");
}

/**
 * Flip the `done` value of the action with the matching id.
 * @param {object[]} log
 * @param {number} id
 * @returns {object[]} a NEW array; the matching action is a NEW object
 */
export function toggleDone(log, id) {
  // Use map. Copy the matching action: { ...action, done: ??? }
  throw new Error("TODO: write toggleDone");
}

/**
 * Total points for actions that are DONE.
 * Planned (not done) actions don't count yet.
 * @param {object[]} log
 * @returns {number}
 */
export function totalPoints(log) {
  // filter the done actions, then reduce to a sum
  throw new Error("TODO: write totalPoints");
}

/**
 * Points per category, for DONE actions only.
 * Example: { transport: 35, food: 10, energy: 15, waste: 10 }
 * Categories with no done actions are left out.
 * @param {object[]} log
 * @returns {Record<string, number>}
 */
export function pointsByCategory(log) {
  // Lab step 3: AI checkpoint! Predict before you run.
  throw new Error("TODO: write pointsByCategory");
}

/**
 * Only the actions in one category. "all" returns every action.
 * @param {object[]} log
 * @param {string} category
 * @returns {object[]}
 */
export function filterByCategory(log, category) {
  // Remember the special "all" category
  throw new Error("TODO: write filterByCategory");
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
  // Stretch goal: see the hint in labs/lab-1.md
  throw new Error("TODO: write streak");
}
