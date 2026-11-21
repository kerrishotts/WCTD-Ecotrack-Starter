// Live air quality for a city the user chooses.
// The fetching lives in the useAirQuality hook. This component only decides
// what to SHOW for each status: idle, loading, error or success.

import { useState } from "react";
import { useAirQuality } from "../hooks/useAirQuality.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { describeAqi } from "../airQuality.js";

export default function AirQualityPanel() {
  // The city we last looked up is remembered between visits.
  const [city, setCity] = useLocalStorage("ecotrack-city", "");
  const [draft, setDraft] = useState(city); // what's typed in the box right now
  const { status, city: place, reading, error } = useAirQuality(city);

  function handleSubmit(event) {
    event.preventDefault();
    const name = draft.trim();
    if (name) setCity(name);
  }

  return (
    <section className="card air" aria-labelledby="air-title">
      <h2 id="air-title">Air quality right now</h2>

      <form className="air-form" onSubmit={handleSubmit}>
        <label htmlFor="air-city">Your city</label>
        <div className="row">
          <input
            id="air-city"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="e.g. Albany"
            autoComplete="off"
          />
          <button type="submit" disabled={!draft.trim()}>
            Check
          </button>
        </div>
      </form>

      <div className="air-result">
        {status === "idle" && <p className="muted">Enter a city to see its air quality.</p>}

        {status === "loading" && (
          <p className="muted" role="status">
            Loading…
          </p>
        )}

        {status === "error" && (
          <p className="error" role="alert">
            Couldn’t get air quality: {error}
          </p>
        )}

        {status === "success" && <Reading place={place} reading={reading} />}
      </div>
    </section>
  );
}

function Reading({ place, reading }) {
  const { label, color } = describeAqi(reading.aqi);
  return (
    <div>
      <p className="muted">
        {place.name}, {place.country}
      </p>
      <p className="aqi" style={{ "--aqi-color": color }}>
        <span className="aqi-number">{reading.aqi}</span>
        <span className="aqi-label">{label}</span>
      </p>
      <p className="muted small">
        US AQI · PM2.5 {reading.pm2_5} µg/m³ · {reading.time.replace("T", " ")}
      </p>
    </div>
  );
}
