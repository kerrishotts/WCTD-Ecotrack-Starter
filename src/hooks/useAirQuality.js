// Lab 3, step 2: a custom hook that fetches live air quality for a city.
//
// Usage:  const { status, city, reading, error } = useAirQuality("Albany");
//
//   status   "idle" (no city yet) | "loading" | "success" | "error"
//   city     { name, country, latitude, longitude }   (when status is "success")
//   reading  { aqi, pm2_5, time }                      (when status is "success")
//   error    a message to show                        (when status is "error")

import { useState, useEffect } from "react";
import { findCity, getAirQuality } from "../airQuality.js";

const IDLE = { status: "idle", city: null, reading: null, error: null };

export function useAirQuality(cityName) {
  const [result, setResult] = useState(IDLE);

  useEffect(() => {
    if (!cityName) {
      setResult(IDLE);
      return;
    }

    // If cityName changes before this request finishes, the cleanup
    // function below sets ignore = true, so a slow, out-of-date answer
    // can never overwrite a newer one.
    let ignore = false;
    setResult({ status: "loading", city: null, reading: null, error: null });

    async function load() {
      try {
        const city = await findCity(cityName); // your Session 1 code!
        const reading = await getAirQuality(city.latitude, city.longitude);
        if (!ignore) setResult({ status: "success", city, reading, error: null });
      } catch (err) {
        if (!ignore) setResult({ status: "error", city: null, reading: null, error: err.message });
      }
    }

    load();

    return () => {
      ignore = true; // cleanup: runs before the next effect, or when the component goes away
    };
  }, [cityName]); // re-run only when the city changes

  return result;
}
