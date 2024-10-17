// routes.js

import { Home } from "./views/Home.js";
import { Play } from "./views/Play.js";
import { TournamentView, resizeTournamentCanvas } from "./views/TournamentView.js";
import { SelectPong } from "./views/SelectPong.js";
import { FormView } from "./views/FormView.js";
import { NotFound } from "./views/NotFound.js";
import { MultiPong } from "./views/MultiPong.js";
import { GameView } from "./views/GameView.js";
import { createBracket } from "./game/tournament.js";
import { AboutView } from "./views/AboutView.js";
import { LoginView } from "./views/LoginView.js";
import { RegisterView } from "./views/RegisterView.js";
import { validateForm } from "./main.js";
import { ProfileView } from "./views/ProfileView.js";

const routes = {
  "#home": Home,
  "#play": Play,
  "#form": FormView,
  "#select_pong": SelectPong,
  "#multi_pong": MultiPong,
  "#game": GameView,
  "#about": AboutView,
  "#login": LoginView,
  "#register": RegisterView,
  "#profile": ProfileView,
  default: Home,
};

function sanitizePath(path)
{
  const allowedRoutes = Object.keys(routes).concat(["#tournament"]);
  return allowedRoutes.includes(path) ? path : "#home";
}

export function handleLocation() {
  const path = sanitizePath(window.location.hash || "#home");
  const app = document.getElementById("app");

  app.innerHTML = "";

  switch (path) {
    case "#tournament":
      app.appendChild(TournamentView());
      resizeTournamentCanvas(document.getElementById("gameCanvas"));
      createBracket();
      break;
    case "#login":
      app.appendChild(LoginView());
      validateForm();
      break;
      case "#register":
        app.appendChild(RegisterView());
        validateForm();
        break;
        default:
      const view = routes[path] || NotFound;
      app.appendChild(view());
  }
}

export function navigateTo(hash)
{
  window.location.hash = hash;
}