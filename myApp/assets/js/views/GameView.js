import { getState } from "../stateManager.js"
import { startPongGame } from "../game/PongGame.js";

export function GameView() {
  const container = document.createElement("section");
  container.className = "form-section";

  const canvas = document.createElement("canvas");
  canvas.id = "gameCanvas";
  canvas.width = 800; // Set desired width
  canvas.height = 600; // Set desired height

  container.appendChild(canvas);

  // Start the game with player data from the state
  const state = getState();
  const playerNames = state.players;
  if (!playerNames || playerNames.length === 0) {
    window.location.hash = "#select_pong";
    return;
  }

  // Call the function that starts the Pong game
  startPongGame(playerNames, canvas);

  return container;
}
