const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

document.addEventListener("keydown", (e)=> keyHandler(e, true));
document.addEventListener("keyup", (e)=> keyHandler(e, false));

const winningScore = 5;
let gameLoopID;

class Ball {
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
        ctx.fillStyle = "#0095DD";
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
        this.dx = 5;
        this.dy = 5;
    }
    
    wallCollision()
    {
        if (this.y + this.dy < this.radius || this.y + this.dy > canvas.height - this.radius)
            this.dy = -this.dy;

        if (this.x + this.dx < this.radius)
        {
            player2.score++;
            this.reset();
            checkForWinner();
        }
        if (this.x + this.dx > canvas.width - this.radius) {
            // Player 1 scores a point
            player1.score++;
            this.reset();
            checkForWinner();
        }
    }
}


class Player
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
    }
    draw()
    {
        ctx.beginPath();
        ctx.rect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "#0095DD";
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
    checkCollision(ball) {
        if (ball.x - ball.radius < this.paddleX + this.paddleWidth && 
            ball.x + ball.radius > this.paddleX &&
            ball.y > this.paddleY && 
            ball.y < this.paddleY + this.paddleHeight) {
            ball.dx = -ball.dx;  // Reverse ball's direction on collision
        }
    }
}

const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 5, 5);

// Instantiate Player 1 (left paddle) and Player 2 (right paddle)
const player1 = new Player(0, (canvas.height - 75) / 2, 10, 75, "w", "s");
const player2 = new Player(canvas.width - 10, (canvas.height - 75) / 2, 10, 75, "ArrowUp", "ArrowDown");

function keyHandler(e, isPressed) {
    // Player 1 controls (W/S keys)
    if (e.key === player1.upKey) {
        player1.upPressed = isPressed;
    }
    if (e.key === player1.downKey) {
        player1.downPressed = isPressed;
    }

    // Player 2 controls (ArrowUp/ArrowDown keys)
    if (e.key === player2.upKey) {
        player2.upPressed = isPressed;
    }
    if (e.key === player2.downKey) {
        player2.downPressed = isPressed;
    }
}

function checkForWinner()
{
    if (player1.score >= winningScore || player2.score >= winningScore) {
        let winner = player1.score >= winningScore ? "Player 1" : "Player 2";
        displayWinner(winner);
    }
}

function displayWinner(winner)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.textAlign = "center";
    ctx.fillText(`${winner} Wins!`, canvas.width / 2, canvas.height / 2);

    cancelAnimationFrame(gameLoopID);
}

function displayScores() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Player 1: ${player1.score}`, 100, 30);
    ctx.fillText(`Player 2: ${player2.score}`, canvas.width - 200, 30);
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    ball.draw();
    ball.update();

    player1.draw();
    player2.draw();
    player1.update();
    player2.update();

    ball.wallCollision();
    player1.checkCollision(ball);
    player2.checkCollision(ball);

    displayScores();

    gameLoopID = requestAnimationFrame(gameLoop);
}

gameLoop();