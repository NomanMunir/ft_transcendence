import { canvas, ctx } from "./game.js";
export class Player
{
    constructor(paddleX, paddleY, paddleWidth, paddleHeight, upKey, downKey)
    {
        this.paddleX = paddleX;
        this.paddleY = paddleY;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.upKey = upKey;
        this.downKey = downKey;
        this.speed = 5;
        this.upPressed = false;
        this.downPressed = false;
        this.score = 0;
        this.paddleHits = 0;
    }

    draw()
    {
        ctx.beginPath();
        ctx.rect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    update()
    {
        if (this.upPressed && this.paddleY > 0)
            this.paddleY -= this.speed;
        if (this.downPressed && this.paddleY < canvas.height - this.paddleHeight)
            this.paddleY += this.speed;
    }

    checkCollision(ball)
    {
        if (ball.x - ball.radius < this.paddleX + this.paddleWidth && 
            ball.x + ball.radius > this.paddleX &&
            ball.y > this.paddleY && 
            ball.y < this.paddleY + this.paddleHeight) {
            ball.dx = -ball.dx;
            this.paddleHits++;
            if (this.paddleHits >= 3) {
                this.increaseBallSpeed(ball);
            }
        }
    }

    increaseBallSpeed(ball)
    {
        ball.dx *= 1.1;
        ball.dy *= 1.1;
        this.paddleHits = 0;
    }
}
