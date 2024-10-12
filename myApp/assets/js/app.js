// app.js

import { handleLocation } from "./routes.js";
import { NavBar } from "./components/NavBar.js";

// Initialize the app once
function initApp() {
  const appElement = document.getElementById("app");

  // Check if appElement exists
  if (!appElement) {
    console.error("App element not found!");
    return;
  }

  const navBar = NavBar();

  if (!document.querySelector("header"))
    document.body.prepend(navBar); // Prepend the nav bar at the top of the body

  // Handle the initial route
  handleLocation();
}

// Listen for changes in the hash (route changes)
window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", initApp);
