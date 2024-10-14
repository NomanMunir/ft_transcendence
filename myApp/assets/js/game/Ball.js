import { checkForWinner } from "./GameUtils.js";
import { getState } from "../stateManager.js";

export class Ball
{
  constructor(x, y, radius, dx, dy, canvas, ctx, ballSpeedMultiplier = 1.1)
  {
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

  wallCollision()
  {
    const { playerObjects, gameOver, canvas} = getState().pongGame;
    if (playerObjects.length < 3)
        if (this.y - this.radius < 0) this.dy = -this.dy;
    if (playerObjects.length < 4)
        if (this.y + this.radius > canvas.height) this.dy = -this.dy;

    if (this.x + this.radius > canvas.width) {
        if (playerObjects.length == 2)
            playerObjects[0].score++;
        else
            playerObjects[1].score++;
        checkForWinner();
        if (!gameOver) this.reset();
    }

    if (this.x - this.radius < 0) {
        if (playerObjects.length < 3)
            playerObjects[1].score++;
        else
            playerObjects[0].score++;
        checkForWinner();
        if (!gameOver) this.reset();
    }

    if (playerObjects.length >= 3) {
        if (this.y + this.radius > canvas.height) {
            if (playerObjects.length === 4)
                playerObjects[3].score++;
            checkForWinner();
            if (!gameOver && playerObjects.length == 4) this.reset();
        }
        if (this.y - this.radius < 0) {
            playerObjects[2].score++;
            checkForWinner();
            if (!gameOver) this.reset();
        }
    }
    playerObjects.forEach(player => player.checkCollision(this));
  }

  increaseSpeed() {
    this.dx *= this.ballSpeedMultiplier;
    this.dy *= this.ballSpeedMultiplier;
  }
}
