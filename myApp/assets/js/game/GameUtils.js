import { getState, updateState } from "../stateManager.js";
import { startGame } from "./GameLogic.js";

export function drawBackground(ctx, canvas) {
  const {width, height} = canvas;
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    height / 4,
    width / 2,
    height / 2,
    height
  );
  gradient.addColorStop(0, "#2a2a2a");
  gradient.addColorStop(1, "#4c4c4c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw dotted middle line
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
  ctx.setLineDash([]);
}

export function keyHandler(e, isPressed, playerObjects) {
  playerObjects.forEach((player) => {
    if (e.key === player.upKey) player.upPressed = isPressed;
    if (e.key === player.downKey) player.downPressed = isPressed;
  });
}


export function checkForWinner()
{
  const { playerObjects, winningScore } = getState();

  playerObjects.forEach((player) => {
    if (player.score >= winningScore) {
      displayWinner(player.name);
    }
  });
}

function displayWinner(winner)
{
  const { ctx, canvas, playerObjects, ball, tournament} = getState();

  const {width, height} = canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  if (playerObjects.length < 3) {
    ctx.fillText(`${winner} Wins!`, width / 2, height / 2);
  } else {
    ctx.fillText(`${winner} Lose!`, width / 2, height / 2);
  }
  if (!tournament)
  {

    ctx.fillText("Click to restart", width / 2, height / 2 + 50);
    
    canvas.addEventListener(
      "click",
      () => {
        playerObjects.forEach((player) => player.reset());
        ball.reset();
        updateState({gameOver: false});
        startCountdownWithDetails();
      },
      { once: true }
      );
  }
  updateState({gameOver: true, winner: winner}); 
}

export function startCountdownWithDetails()
{
  return new Promise((resolve) => {
    const { canvas, ctx, playerObjects } = getState();
    const {width, height} = canvas;
    let countdown = 2; 
    const countdownInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        
        playerObjects.forEach((player) => {
            // drawBackground();
            let positionText;
            if (player.movementAxis === "vertical") {
                if (player.paddleX === 0) {
                    positionText = "Left Paddle (Vertical)";
                    ctx.fillText(`${player.name}`, 50, height / 2 - 30);
                    ctx.fillText(`(W / S)`, 50, height / 2); 
                } else {
                    positionText = "Right Paddle (Vertical)";
                    ctx.fillText(`${player.name}`, width - 70, height / 2 - 30);
                    ctx.fillText(`(UP / DOWN)`, width - 70, height / 2); 
                }
            } else {
                if (player.paddleY === 0) {
                    positionText = "Top Paddle (Horizontal)";
                    ctx.fillText(`${player.name}`, width / 2, 50); 
                    ctx.fillText(`(Z / X)`, width / 2, 80); 
                } else {
                    positionText = "Bottom Paddle (Horizontal)";
                    ctx.fillText(`${player.name}`, width / 2, height - 60);
                    ctx.fillText(`(, / .)`, width / 2, height - 30); 
                }
            }
        });

        ctx.font = "40px Arial";
        ctx.fillStyle = "white"; 
        ctx.fillText(`Game starts in ${countdown}...`, width / 2, height / 2);

        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            resolve();
        }
        
    }, 1000);
  }
);
}