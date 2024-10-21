// routes.js

import { Home } from "./views/Home.js";
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
import { initNavBar, validateForm } from "./main.js";
import { ProfileView } from "./views/ProfileView.js";
import { NavBar } from "./components/NavBar.js";
import { handleLanguageChange } from "./lang.js";

const routes = {
  "#home": Home,
  "#": Home,
  "#form": FormView,
  "#select_pong": SelectPong,
  "#multi_pong": MultiPong,
  "#game": GameView,
  "#about": AboutView,
  "#login": LoginView,
  "#register": RegisterView,
  "#profile": ProfileView,
  "#404": NotFound,
  default: NotFound,
};

function sanitizePath(path)
{
  const allowedRoutes = Object.keys(routes).concat(["#tournament"]);
  return allowedRoutes.includes(path) ? path : "#404";
}

export function handleLocation() {
  const path = sanitizePath(window.location.hash);
  const app = document.getElementById("app");

  app.innerHTML = "";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn && (path === "#login" || path === "#register")) {
    window.location.hash = "#profile";
    return;
  }

  const protectedRoutes = ["#profile", "#game", "#multi_pong", "#tournament"];
  if (!isLoggedIn && protectedRoutes.includes(path)) {
    window.location.hash = "#login";
    return;
  }
  app.appendChild(NavBar());
  initNavBar();

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
  const language = localStorage.getItem("language") || "en";
  handleLanguageChange(language);
}

export function navigateTo(hash)
{
  window.location.hash = hash;
}