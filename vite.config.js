import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Every page in the project gets built.
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        engine: resolve(import.meta.dirname, "engine.html"),
        exercises: resolve(import.meta.dirname, "exercises.html"),
      },
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{js,jsx}"],
    setupFiles: ["src/test-setup.js"],
  },
});
