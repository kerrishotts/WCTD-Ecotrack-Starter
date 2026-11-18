// Keeps test failures short and readable: one line saying what wasn't
// found, instead of a giant dump of the page's HTML.
import { configure } from "@testing-library/react";

configure({
  getElementError(message) {
    const error = new Error(message.split("\n\n")[0]);
    error.name = "NotFound";
    return error;
  },
});
