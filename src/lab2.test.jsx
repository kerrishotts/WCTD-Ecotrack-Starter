// Automatic checks for Lab 2. Run them with:  npm run check:ui
// (Since Session 3, App needs a router around it, so the tests add a MemoryRouter.)
//
// These tests use React Testing Library, which finds things the way a
// person would: by their text, their label, or their role (button, list
// item...). Reading this file tells you exactly what each component must do.

import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ActionCard from "./components/ActionCard.jsx";
import ActionList from "./components/ActionList.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";
import ActionForm from "./components/ActionForm.jsx";
import { MemoryRouter } from "react-router";
import App from "./App.jsx";
import { sampleLog } from "./data/sampleLog.js";

const bike = sampleLog[0]; // "Biked to school", transport, 20 pts, done
const bottle = sampleLog[4]; // "Brought a reusable bottle", waste, 5 pts, NOT done

beforeEach(() => localStorage.clear());
afterEach(() => cleanup());

// ---------------------------------------------------------------------------
describe("Step 2 · ActionCard", () => {
  test("shows the title, category and points", () => {
    render(<ul><ActionCard {...bike} onToggle={() => {}} /></ul>);
    expect(screen.getByText("Biked to school")).toBeTruthy();
    expect(screen.getByText("transport")).toBeTruthy();
    expect(screen.getByText(/20 pts/)).toBeTruthy();
  });

  test('a planned action has a "Mark done" button', () => {
    render(<ul><ActionCard {...bottle} onToggle={() => {}} /></ul>);
    expect(screen.getByRole("button", { name: "Mark done" })).toBeTruthy();
  });

  test('a done action has an "Undo" button', () => {
    render(<ul><ActionCard {...bike} onToggle={() => {}} /></ul>);
    expect(screen.getByRole("button", { name: "Undo" })).toBeTruthy();
  });

  test("clicking the button calls onToggle with the action's id", async () => {
    const onToggle = vi.fn();
    render(<ul><ActionCard {...bottle} onToggle={onToggle} /></ul>);
    await userEvent.click(screen.getByRole("button", { name: "Mark done" }));
    expect(onToggle).toHaveBeenCalledWith(5);
  });
});

// ---------------------------------------------------------------------------
describe("Step 3 · ActionList", () => {
  test("shows one list item per action", () => {
    render(<ActionList actions={sampleLog} onToggle={() => {}} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(8);
  });

  test('shows "No actions yet" when the list is empty', () => {
    render(<ActionList actions={[]} onToggle={() => {}} />);
    expect(screen.getByText(/no actions yet/i)).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
describe("Step 4 · ScoreBoard and state", () => {
  test("ScoreBoard shows the total points (done actions only)", () => {
    render(<ScoreBoard log={sampleLog} />);
    expect(screen.getByLabelText("Total points").textContent).toBe("70");
  });

  test("marking an action done updates the total", async () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const card = screen.getByText("Brought a reusable bottle").closest("li");
    await userEvent.click(within(card).getByRole("button", { name: "Mark done" }));
    expect(screen.getByLabelText("Total points").textContent).toBe("75");
  });

  test("the category filter shows only that category", async () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    await userEvent.click(screen.getByRole("button", { name: "food" }));
    const actions = screen.getByRole("region", { name: "Your actions" });
    expect(within(actions).getAllByRole("listitem")).toHaveLength(1);
    expect(within(actions).getByText("Meatless lunch")).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
describe("Step 5 · ActionForm", () => {
  test("submitting calls onAdd with { title, category }", async () => {
    const onAdd = vi.fn();
    render(<ActionForm onAdd={onAdd} />);
    await userEvent.type(screen.getByLabelText("What did you do?"), "Carpooled to practice");
    await userEvent.selectOptions(screen.getByLabelText("Category"), "transport");
    await userEvent.click(screen.getByRole("button", { name: "Add action" }));
    expect(onAdd).toHaveBeenCalledWith({ title: "Carpooled to practice", category: "transport" });
  });

  test("an empty title can't be added", async () => {
    const onAdd = vi.fn();
    render(<ActionForm onAdd={onAdd} />);
    await userEvent.type(screen.getByLabelText("What did you do?"), "   ");
    await userEvent.click(screen.getByRole("button", { name: "Add action" }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("the title box clears after adding", async () => {
    render(<ActionForm onAdd={() => {}} />);
    const box = screen.getByLabelText("What did you do?");
    await userEvent.type(box, "Line-dried laundry");
    await userEvent.click(screen.getByRole("button", { name: "Add action" }));
    expect(box.value).toBe("");
  });

  test("a new action appears in the app's list", async () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    await userEvent.type(screen.getByLabelText("What did you do?"), "Fixed a leaky tap");
    await userEvent.selectOptions(screen.getByLabelText("Category"), "energy");
    await userEvent.click(screen.getByRole("button", { name: "Add action" }));
    expect(screen.getByText("Fixed a leaky tap")).toBeTruthy();
  });
});
