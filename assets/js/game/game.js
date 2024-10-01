import { Ball } from './Ball.js';
import { Player } from './Player.js';

export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

document.addEventListener("keydown", (e)=> keyHandler(e, true));
document.addEventListener("keyup", (e)=> keyHandler(e, false));

export const winningScore = 5;
export let gameOver = false;
let gameLoopID;

const paddleHeight = 100;
const paddleWidth = 10;
const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 3, 3);
export const player1 = new Player(0, (canvas.height - 75) / 2, paddleWidth,paddleHeight, "w", "s");
export const player2 = new Player(canvas.width - 10, (canvas.height - 75) / 2, paddleWidth,paddleHeight, "ArrowUp", "ArrowDown");

function keyHandler(e, isPressed) {
    if (e.key === player1.upKey) {
        player1.upPressed = isPressed;
    }
    if (e.key === player1.downKey) {
        player1.downPressed = isPressed;
    }

    if (e.key === player2.upKey) {
        player2.upPressed = isPressed;
    }
    if (e.key === player2.downKey) {
        player2.downPressed = isPressed;
    }
}

export function checkForWinner()
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
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`${winner} Wins!`, canvas.width / 2, canvas.height / 2);

    cancelAnimationFrame(gameLoopID);
    gameOver = true;
}

function displayScores() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Player 1: ${player1.score}`, 100, 30);
    ctx.fillText(`Player 2: ${player2.score}`, canvas.width - 200, 30);
}

export function gameLoop() {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.draw();
    player1.draw();
    player2.draw();
    
    ball.update();
    player1.update();
    player2.update();

    ball.wallCollision();
    player1.checkCollision(ball);
    player2.checkCollision(ball);

    displayScores();

    gameLoopID = requestAnimationFrame(gameLoop);
}
