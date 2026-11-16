// Live air quality from Open-Meteo (https://open-meteo.com).
// Free, and no API key needed, so there are no secrets to protect.

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

/**
 * WORKED EXAMPLE: look up a city's coordinates by name.
 * Read this one carefully; getAirQuality follows the same pattern.
 *
 * @param {string} name - e.g. "Albany"
 * @returns {Promise<{ name: string, country: string, latitude: number, longitude: number }>}
 */
export async function findCity(name) {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(name)}&count=1`;
  const res = await fetch(url);

  // fetch only throws on network failure, so check the status ourselves.
  if (!res.ok) {
    throw new Error(`City lookup failed (HTTP ${res.status})`);
  }

  const data = await res.json();
  const city = data.results?.[0]; // optional chaining: no results -> undefined

  if (!city) {
    throw new Error(`No city found called "${name}"`);
  }

  const { latitude, longitude, country } = city; // destructuring
  return { name: city.name, country, latitude, longitude };
}

/**
 * Get the current air quality at a location.
 *
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<{ aqi: number, pm2_5: number, time: string }>}
 *   aqi   - US Air Quality Index (0-50 good, 51-100 moderate, 101+ unhealthy for some)
 *   pm2_5 - fine particles in micrograms per cubic meter
 *   time  - when the reading was taken
 */
export async function getAirQuality(lat, lon) {
  // Lab step 4. Follow the same pattern as findCity above:
  //   1. build the URL:
  //      `${AIR_QUALITY_URL}?latitude=${lat}&longitude=${lon}&current=us_aqi,pm2_5`
  //   2. await fetch(url)
  //   3. if (!res.ok) throw a helpful Error
  //   4. await res.json(): the values are inside `current`
  //   5. return { aqi, pm2_5, time }
  throw new Error("TODO: write getAirQuality");
}

/**
 * Turn an AQI number into a label and a color.
 * @param {number} aqi
 * @returns {{ label: string, color: string }}
 */
export function describeAqi(aqi) {
  if (aqi <= 50) return { label: "Good", color: "#2ecc71" };
  if (aqi <= 100) return { label: "Moderate", color: "#f1c40f" };
  if (aqi <= 150) return { label: "Unhealthy for sensitive groups", color: "#FFA500" };
  if (aqi <= 200) return { label: "Unhealthy", color: "#e74c3c" };
  return { label: "Very unhealthy", color: "#8e44ad" };
}
