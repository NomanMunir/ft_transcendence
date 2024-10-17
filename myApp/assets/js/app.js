// app.js

import { handleLocation } from "./routes.js";
import { NavBar } from "./components/NavBar.js";
import { initNavBar } from "./main.js";

// Initialize the app once
function initApp() {
  const appElement = document.getElementById("app");

  // Check if appElement exists
  if (!appElement) {
    console.error("App element not found!");
    return;
  }

  const navBar = NavBar();
  document.body.prepend(navBar);
  initNavBar();

  handleLocation();
}

// Listen for changes in the hash (route changes)
window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", initApp);
