// Lab 3, step 2: a custom hook that fetches live air quality for a city.
//
// Usage:  const { status, city, reading, error } = useAirQuality("Albany");
//
//   status   "idle" (no city yet) | "loading" | "success" | "error"
//   city     { name, country, latitude, longitude }   (when status is "success")
//   reading  { aqi, pm2_5, time }                      (when status is "success")
//   error    a message to show                        (when status is "error")
//
// TODO (Lab step 2): inside a useEffect that depends on [cityName]:
//   1. No cityName? setResult(IDLE) and stop.
//   2. Set the status to "loading".
//   3. await findCity(cityName), then await getAirQuality(city.latitude, city.longitude)
//   4. On success: { status: "success", city, reading, error: null }
//      If anything throws: { status: "error", city: null, reading: null, error: err.message }
//   5. Return a cleanup function so an old, slow answer is ignored.
//      (See the "ignore" hint in labs/lab-3.md.)

import { useState, useEffect } from "react";
import { findCity, getAirQuality } from "../airQuality.js";

const IDLE = { status: "idle", city: null, reading: null, error: null };

export function useAirQuality(cityName) {
  const [result, setResult] = useState(IDLE);

  // TODO: your useEffect goes here.

  return result;
}
