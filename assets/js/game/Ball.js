import { checkForWinner } from "./game.js";
import { canvas, ctx, player1, player2, gameOver } from "./game.js";

export class Ball
{
    constructor(x, y, radius, dx, dy)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    draw()
    {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    update()
    {
        this.x += this.dx,
        this.y += this.dy
    }

    reset()
    {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.dx = 3;
        this.dy = 3;
    }
    
    wallCollision()
    {
        if (this.y + this.dy < this.radius || this.y + this.dy > canvas.height - this.radius)
            this.dy = -this.dy;

        if (this.x + this.dx < this.radius)
        {
            player2.score++;
            checkForWinner();
            if (!gameOver) this.reset();
        }
        if (this.x + this.dx > canvas.width - this.radius) {
            // Player 1 scores a point
            player1.score++;
            checkForWinner();
            if (!gameOver) this.reset();
        }
    }
}
