import { routes } from "./routes.js";

export function loadContent(page) {
  const contentDiv = document.getElementById("content");
  fetch(`views/${page}.html`)
    .then((response) => response.text())
    .then((data) => {
      contentDiv.innerHTML = data;

      // Check if there's a handler for the current page
      const pageHandler = routes[page];
      if (pageHandler) {
        pageHandler(); // Call the handler if it exists
      }
    })
    .catch((err) => {
      contentDiv.innerHTML = "<p>Page not found</p>";
    });
}
