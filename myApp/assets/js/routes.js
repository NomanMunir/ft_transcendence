// routes.js

// Import views (these are your page components)
import { Home } from "./views/Home.js";
import { Play } from "./views/Play.js";
import { TournamentView } from "./views/TournamentView.js";
import { SelectPong } from "./views/SelectPong.js";
import { FormView } from "./views/FormView.js";
import { NotFound } from "./views/NotFound.js";
import { MultiPong } from "./views/MultiPong.js";
import { GameView } from "./views/GameView.js";
import { createBracket } from "./game/tournament.js";

const routes = {
  "#home": Home,
  "#play": Play,
  "#form": FormView,
  "#select_pong": SelectPong,
  "#multi_pong": MultiPong,
  "#game": GameView,
  default: Home,
};

function sanitizePath(path)
{
  const allowedRoutes = Object.keys(routes).concat(["#tournament"]);
  return allowedRoutes.includes(path) ? path : "#home";
}

function sanitizeContent(content)
{
  const element = document.createElement('div');
  element.textContent = content;
  return element.innerHTML; // Safely return the sanitized content
}

// Handle routing logic
export function handleLocation() {
  const path = sanitizePath(window.location.hash || "#home");
  const app = document.getElementById("app");

  app.innerHTML = "";

  switch (path) {
    case "#tournament":
      app.appendChild(TournamentView());
      createBracket();
      break;
    default:
      const view = routes[path] || NotFound;
      app.appendChild(view());
  }
}

export function navigateTo(hash) {
  window.location.hash = hash;
}