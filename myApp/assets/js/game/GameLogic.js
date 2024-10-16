import { drawBackground } from "./GameUtils.js";
import { updateState, getState } from "../stateManager.js";

export let aiTolerance = 50;
export let aiSpeedFactor = 0.7;

export function startGame(resolve)
{
  const {winner, gameLoopID, gameOver, playerObjects, ball, canvas, ctx} = getState().pongGame;

  if (gameOver)
  {
    cancelAnimationFrame(gameLoopID);
    resolve(winner);
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(ctx, canvas);

  ball.draw();
  playerObjects.forEach((player) => {
    player.draw();
    player.update();
  });

  ball.wallCollision();
  ball.update();

  displayScores(ctx, canvas, playerObjects);
  updateState({pongGame: { gameLoopID: requestAnimationFrame(() => startGame(resolve)) }});
}

function displayScores(ctx, canvas, playerObjects) {
  ctx.font = "14px Arial";
  ctx.textAlign = "left";
  ctx.fillStyle = "white";

  playerObjects.forEach((player) => {
    if (player.movementAxis === "vertical") {
      if (player.paddleX === 0) {
        ctx.fillText(`${player.name}: ${player.score}`, 40, canvas.height / 2);
      } else if (player.paddleX + player.paddleWidth === canvas.width)
      {
        ctx.fillText(
          `${player.name}: ${player.score}`,
          canvas.width - 70,
          canvas.height / 2
        );
      }
    } else {
      // For horizontal paddles (top and bottom of the canvas)
      if (player.paddleY === 0) {
        // Player on the top side
        ctx.fillText(
          `${player.name}: ${player.score}`,
          canvas.width / 2 + 30,
          50
        );
      } else if (player.paddleY + player.paddleHeight === canvas.height) {
        // Player on the bottom side
        ctx.fillText(
          `${player.name}: ${player.score}`,
          canvas.width / 2 + 30,
          canvas.height - 50
        );
      }
    }
  });
}

