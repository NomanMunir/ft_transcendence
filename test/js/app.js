// app.js
import { setupNavigation } from "./nav.js";
import { loadContent } from "./loader.js";

// Select the navigation links
const links = document.querySelectorAll("nav a");

// Initialize navigation
setupNavigation(links, loadContent);

// Load the initial page based on the URL hash
window.addEventListener("load", () => {
  const page = window.location.hash.substring(1) || "home";
  loadContent(page);
});

// Handle browser back/forward buttons
window.addEventListener("popstate", function (event) {
  if (event.state) {
    loadContent(event.state.page);
  }
});
