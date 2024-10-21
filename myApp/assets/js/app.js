// app.js

import { handleLocation } from "./routes.js";

// Initialize the app once
function initApp() {
  const appElement = document.getElementById("app");

  // Check if appElement exists
  if (!appElement) {
    console.error("App element not found!");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  handleLocation();
}

// Listen for changes in the hash (route changes)
window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", initApp);
