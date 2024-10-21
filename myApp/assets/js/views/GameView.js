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
  const ctx = canvas.getContext("2d");
  // const aspectRatio = 4 / 3; // Or any aspect ratio you prefer
  // let canvasWidth = window.innerWidth * 0.8; // 80% of window width
  // let canvasHeight = canvasWidth / aspectRatio;
  
  // if (canvasHeight > window.innerHeight * 0.8) { // Ensure it fits on the screen
  //   canvasHeight = window.innerHeight * 0.8;
  //   canvasWidth = canvasHeight * aspectRatio;
  // }

  // Resize the canvas
  let canvasWidth = 800;
  let canvasHeight = 600;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Dynamically adjust font size based on canvas size
  const baseFontSize = 24; // You can set this to your desired base size
  const scaleFactor = canvasWidth / 800; // Assuming 800 is your base canvas width
  const newFontSize = baseFontSize * scaleFactor;

  // Set the new font size
  ctx.font = `${newFontSize}px Arial`; // Change 'Arial' to your desired font
  ctx.fillStyle = "white";
  // Example of using the resized font
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

