// App owns the data and decides which page to show for each address.

import { Routes, Route } from "react-router";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { sampleLog } from "./data/sampleLog.js";
import { addAction, toggleDone, newAction } from "./ecotrack.js";

const today = () => new Date().toISOString().slice(0, 10);

export default function App() {
  // Like useState, but saved in the browser (see hooks/useLocalStorage.js).
  const [log, setLog] = useLocalStorage("ecotrack-log", sampleLog);

  function handleToggle(id) {
    setLog((current) => toggleDone(current, id));
  }

  function handleAdd(fields) {
    const action = newAction(fields, { id: Date.now(), date: today() });
    setLog((current) => addAction(current, action));
  }

  return (
    <Routes>
      {/* Every page shares the Layout: nav at the top, footer at the bottom. */}
      <Route element={<Layout />}>
        <Route index element={<HomePage log={log} onAdd={handleAdd} onToggle={handleToggle} />} />
        <Route path="about" element={<AboutPage log={log} />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
