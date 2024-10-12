export class Player {
  constructor(
    name,
    paddleX,
    paddleY,
    paddleWidth,
    paddleHeight,
    movementAxis,
    upKey,
    downKey,
    canvas,
    ctx
  ) {
    this.name = name;
    this.paddleX = paddleX;
    this.paddleY = paddleY;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.movementAxis = movementAxis;
    this.upKey = upKey;
    this.downKey = downKey;
    this.canvas = canvas;
    this.ctx = ctx;
    this.speed = 5;
    this.upPressed = false;
    this.downPressed = false;
    this.score = 0;
    this.paddleHits = 0;
  }

  reset() {
    this.score = 0;
    this.paddleHits = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.paddleX,
      this.paddleY,
      this.paddleWidth,
      this.paddleHeight
    );
    this.ctx.fillStyle = "white";
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    this.ctx.shadowBlur = 10;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.shadowBlur = 0;
  }

  update() {
    if (this.movementAxis === "vertical") {
      if (this.upPressed && this.paddleY > 0) this.paddleY -= this.speed;
      if (
        this.downPressed &&
        this.paddleY < this.canvas.height - this.paddleHeight
      )
        this.paddleY += this.speed;
    } else {
      if (this.upPressed && this.paddleX > 0) this.paddleX -= this.speed;
      if (
        this.downPressed &&
        this.paddleX < this.canvas.width - this.paddleWidth
      )
        this.paddleX += this.speed;
    }
  }

  checkCollision(ball) {
    if (this.movementAxis === "vertical") {
      if (
        ball.x - ball.radius < this.paddleX + this.paddleWidth &&
        ball.x + ball.radius > this.paddleX &&
        ball.y > this.paddleY &&
        ball.y < this.paddleY + this.paddleHeight
      ) {
        ball.dx = -ball.dx;
        this.paddleHits++;
        if (this.paddleHits >= 3) {
          ball.increaseSpeed();
          this.paddleHits = 0;
        }
      }
    } else {
      if (
        ball.y - ball.radius < this.paddleY + this.paddleHeight &&
        ball.y + ball.radius > this.paddleY &&
        ball.x > this.paddleX &&
        ball.x < this.paddleX + this.paddleWidth
      ) {
        ball.dy = -ball.dy;
        this.paddleHits++;
        if (this.paddleHits >= 3) {
          ball.increaseSpeed();
          this.paddleHits = 0;
        }
      }
    }
  }
}
