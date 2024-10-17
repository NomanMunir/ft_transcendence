import { getState } from "../stateManager.js"
import { startPongGame } from "../game/PongGame.js";

export function GameView() {
  const container = document.createElement("section");
  container.className = "form-section";

  const canvas = document.createElement("canvas");
  canvas.id = "gameCanvas";

  container.appendChild(canvas);

  // Start the game with player data from the state
  const state = getState();
  const playerNames = state.players;
  if (!playerNames || playerNames.length === 0) {
    window.location.hash = "#select_pong";
    return;
  }
  resizeCanvas(canvas);
  window.addEventListener("resize", resizeCanvas);
  // Call the function that starts the Pong game
  startPongGame(playerNames, canvas);

  return container;
}

export function resizeCanvas(canvas) {
  const aspectRatio = 4 / 3; // Or any aspect ratio you prefer
  let canvasWidth = window.innerWidth * 0.8; // 80% of window width
  let canvasHeight = canvasWidth / aspectRatio;
  console.log(canvasWidth, canvasHeight);

  if (canvasHeight > window.innerHeight * 0.8) { // Ensure it fits on the screen
    canvasHeight = window.innerHeight * 0.8;
    canvasWidth = canvasHeight * aspectRatio;
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}
