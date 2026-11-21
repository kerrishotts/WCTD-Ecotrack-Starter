// Lab 3, step 1: a custom hook that works like useState, but remembers
// its value in localStorage so it survives a page refresh.
//
// Usage:  const [log, setLog] = useLocalStorage("ecotrack-log", sampleLog);

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // 1. Start from the saved value if there is one. Passing a FUNCTION to
  //    useState means this only runs on the first render.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue; // storage blocked, or the saved text wasn't valid JSON
    }
  });

  // 2. Save the value every time it changes.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage can be unavailable (private browsing); the app still works
    }
  }, [key, value]);

  // 3. Hand back the same pair useState does.
  return [value, setValue];
}
