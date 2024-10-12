
export class Ball {
  constructor(x, y, radius, dx, dy, canvas, ctx, ballSpeedMultiplier = 1.1) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.initialSpeedX = dx;
    this.initialSpeedY = dy;
    this.canvas = canvas;
    this.ctx = ctx;
    this.ballSpeedMultiplier = ballSpeedMultiplier;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = "white";
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    this.ctx.shadowBlur = 10;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.shadowBlur = 0;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  reset() {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.dx = Math.random() < 0.5 ? this.initialSpeedX : -this.initialSpeedX;
    this.dy = Math.random() < 0.5 ? this.initialSpeedY : -this.initialSpeedY;
  }

  wallCollision(playerObjects, checkForWinner) {
    if (playerObjects.length < 3) {
      if (
        this.y - this.radius < 0 ||
        this.y + this.radius > this.canvas.height
      ) {
        this.dy = -this.dy;
      }
    }

    if (this.x + this.radius > this.canvas.width) {
      playerObjects.length === 2
        ? playerObjects[0].score++
        : playerObjects[1].score++;
      checkForWinner();
      if (!gameOver) this.reset();
    }

    if (this.x - this.radius < 0) {
      playerObjects.length < 3 ? playerObjects[1].score++ : playerObjects[0].score++;
      checkForWinner();
      if (!gameOver) this.reset();
    }

    playerObjects.forEach((player) => player.checkCollision(this));
  }

  increaseSpeed() {
    this.dx *= this.ballSpeedMultiplier;
    this.dy *= this.ballSpeedMultiplier;
  }
}

export function checkForWinner(playerObjects, winningScore, displayWinner) {
  playerObjects.forEach((player) => {
    if (player.score >= winningScore) {
      displayWinner(player.name, playerObjects);
    }
  });
}

export function displayWinner(
  winner,
  playerObjects,
  ball,
  canvas,
  ctx,
  startCountdownWithDetails,
  gameLoopID
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  if (playerObjects.length < 3) {
    ctx.fillText(`${winner} Wins!`, canvas.width / 2, canvas.height / 2);
  } else {
    ctx.fillText(`${winner} Lose!`, canvas.width / 2, canvas.height / 2);
  }

  ctx.fillText("Click to restart", canvas.width / 2, canvas.height / 2 + 50);

  canvas.addEventListener(
    "click",
    () => {
      playerObjects.forEach((player) => player.reset());
      ball.reset();
      gameOver = false;
      startCountdownWithDetails();
    },
    { once: true }
  );

  cancelAnimationFrame(gameLoopID);
  gameOver = true;
}