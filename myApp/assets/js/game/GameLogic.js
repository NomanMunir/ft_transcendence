import { drawBackground } from "./GameUtils.js";

export function startGame(ctx, canvas, ball, playerObjects) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(ctx, canvas);

  ball.draw();
  playerObjects.forEach((player) => {
    player.draw();
    player.update();
  });

  ball.wallCollision(playerObjects);
  ball.update();

  displayScores(ctx, playerObjects);

  requestAnimationFrame(() => startGame(ctx, canvas, ball, playerObjects));
}

function displayScores(ctx, canvas, playerObjects) {
  // Set up the font, text alignment, and color for displaying scores
  ctx.font = "14px Arial";
  ctx.textAlign = "left";
  ctx.fillStyle = "white";

  // Loop through each player and display their score based on their paddle position
  playerObjects.forEach((player) => {
    if (player.movementAxis === "vertical") {
      // For vertical paddles (left and right sides of the canvas)
      if (player.paddleX === 0) {
        // Player on the left side
        ctx.fillText(`${player.name}: ${player.score}`, 40, canvas.height / 2);
      } else if (player.paddleX + player.paddleWidth === canvas.width) {
        // Player on the right side
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

