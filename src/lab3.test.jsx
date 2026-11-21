// Automatic checks for Lab 3. Run them with:  npm run check:lab3
//
// Like Lab 2, these find things the way a person would. The air quality
// checks replace fetch with a FAKE version, so they work without internet
// and always get the same answer.

import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, renderHook, act, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import App from "./App.jsx";
import AirQualityPanel from "./components/AirQualityPanel.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { validateContact } from "./validation.js";

beforeEach(() => localStorage.clear());
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// Show the app at a given address, like typing it into the address bar.
function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

// A fake fetch that answers like Open-Meteo would.
function fakeOpenMeteo({ cityFound = true, aqi = 42 } = {}) {
  return vi.fn(async (url) => {
    const json = String(url).includes("geocoding")
      ? { results: cityFound ? [{ name: "Albany", country: "United States", latitude: 42.65, longitude: -73.75 }] : [] }
      : { current: { time: "2026-11-21T09:00", us_aqi: aqi, pm2_5: 4.2 } };
    return { ok: true, status: 200, json: async () => json };
  });
}

// ---------------------------------------------------------------------------
describe("Step 1 · useLocalStorage", () => {
  test("starts with the initial value when nothing is saved", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 5));
    expect(result.current[0]).toBe(5);
  });

  test("saves the new value to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 5));
    act(() => result.current[1](12));
    expect(result.current[0]).toBe(12);
    expect(JSON.parse(localStorage.getItem("test-key"))).toBe(12);
  });

  test("starts from a value that was saved earlier", () => {
    localStorage.setItem("test-key", JSON.stringify(["saved"]));
    const { result } = renderHook(() => useLocalStorage("test-key", []));
    expect(result.current[0]).toEqual(["saved"]);
  });
});

// ---------------------------------------------------------------------------
describe("Step 2 · Live air quality", () => {
  test("shows Loading…, then the AQI and its label", async () => {
    vi.stubGlobal("fetch", fakeOpenMeteo({ aqi: 42 }));
    render(<AirQualityPanel />);
    await userEvent.type(screen.getByLabelText("Your city"), "Albany");
    await userEvent.click(screen.getByRole("button", { name: "Check" }));
    expect(await screen.findByText("42")).toBeTruthy();
    expect(screen.getByText("Good")).toBeTruthy();
  });

  test("shows a helpful error when the city isn't found", async () => {
    vi.stubGlobal("fetch", fakeOpenMeteo({ cityFound: false }));
    render(<AirQualityPanel />);
    await userEvent.type(screen.getByLabelText("Your city"), "Atlantis");
    await userEvent.click(screen.getByRole("button", { name: "Check" }));
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toMatch(/no city found/i);
  });

  test("asks the server only once per city", async () => {
    const fetch = fakeOpenMeteo();
    vi.stubGlobal("fetch", fetch);
    render(<AirQualityPanel />);
    await userEvent.type(screen.getByLabelText("Your city"), "Albany");
    await userEvent.click(screen.getByRole("button", { name: "Check" }));
    await screen.findByText("42");
    expect(fetch).toHaveBeenCalledTimes(2); // one city lookup + one air quality reading
  });
});

// ---------------------------------------------------------------------------
describe("Step 3 · Pages", () => {
  test("the About link opens the About page", async () => {
    renderAt("/");
    await userEvent.click(screen.getByRole("link", { name: "About" }));
    expect(screen.getByRole("heading", { name: "About EcoTrack" })).toBeTruthy();
  });

  test("the Contact link opens the Contact page", async () => {
    renderAt("/");
    await userEvent.click(screen.getByRole("link", { name: "Contact" }));
    expect(screen.getByRole("heading", { name: "Contact us" })).toBeTruthy();
  });

  test("an unknown address shows Page not found", () => {
    renderAt("/no-such-page");
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
describe("Step 4 · Contact form validation", () => {
  test("validateContact finds all three problems in an empty form", () => {
    const errors = validateContact({ name: "", email: "", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  test("validateContact rejects an email without an @", () => {
    const errors = validateContact({ name: "Sam", email: "sam.example.com", message: "This message is definitely long enough." });
    expect(Object.keys(errors)).toEqual(["email"]);
  });

  test("validateContact returns {} when everything is fine", () => {
    expect(validateContact({ name: "Sam", email: "sam@example.com", message: "Love the app! Can you add a bike counter?" })).toEqual({});
  });

  test("the form shows errors, then thanks you once it's fixed", async () => {
    render(<MemoryRouter><ContactPage /></MemoryRouter>);
    await userEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByText("Please enter your name.")).toBeTruthy();

    await userEvent.type(screen.getByLabelText("Name"), "Sam");
    await userEvent.type(screen.getByLabelText("Email"), "sam@example.com");
    await userEvent.type(screen.getByLabelText("Message"), "Love the app! Can you add a bike counter?");
    await userEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByRole("heading", { name: "Thanks, Sam!" })).toBeTruthy();
  });
});
