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
// Define the routes
const routes = {
  "#home": Home,
  "#play": Play,
  "#form": FormView,
  "#select_pong": SelectPong,
  "#multi_pong": MultiPong,
  "#game": GameView,
  default: Home, // Default route if hash is empty or doesn't match
};

// Handle routing logic
export function handleLocation() {
  const path = window.location.hash || "#home";
  const app = document.getElementById("app");

  app.innerHTML = "";

  console.log(path)
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