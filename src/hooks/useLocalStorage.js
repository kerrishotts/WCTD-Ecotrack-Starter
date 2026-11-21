// Lab 3, step 1: a custom hook that works like useState, but remembers
// its value in localStorage so it survives a page refresh.
//
// Usage:  const [log, setLog] = useLocalStorage("ecotrack-log", sampleLog);
//
// TODO (Lab step 1):
//   1. Start from the saved value, if there is one:
//      localStorage.getItem(key), turned back into data with JSON.parse.
//      If nothing is saved, start with initialValue.
//   2. Save the value every time it changes: useEffect with [key, value],
//      and localStorage.setItem(key, JSON.stringify(value)).
//   3. Return [value, setValue], just like useState.

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // For now this is plain useState: nothing is saved yet.
  const [value, setValue] = useState(initialValue);
  return [value, setValue];
}
