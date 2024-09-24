const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
let paddleSpeed = 5;
let aiSpeed = 2.5; // AI paddle speed (adjusted by difficulty)
let aiTolerance = 15; // AI tolerance (adjusted by difficulty)

// Ball properties
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let paddleHits = 0; // Counter for paddle hits
const ballTrail = []; // Store previous positions for trail effect

// Player paddles
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2; // AI or Player 2 paddle

// Scores
let player1Score = 0;
let player2Score = 0;
const winningScore = 5;
let isGameOver = false;
let gameMode = "ai"; // Default game mode is Player vs AI
let player1Name = "Player 1"; // Default name
let player2Name = "AI"; // Default name
let gameInProgress = false; // Track if game is in progress

// Difficulty settings
const difficultySettings = {
  easy: { aiSpeed: 2, aiTolerance: 25 },
  medium: { aiSpeed: 3, aiTolerance: 15 },
  hard: { aiSpeed: 4, aiTolerance: 8 }
};

// Keys pressed
const keys = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false
};

// Sound effects
const paddleHitSound = new Audio('https://www.soundjay.com/button/beep-07.wav');
const scoreSound = new Audio('https://www.soundjay.com/button/beep-02.wav');

// Event listeners for key press
document.addEventListener('keydown', (event) => {
  if (event.key in keys) {
    keys[event.key] = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key in keys) {
    keys[event.key] = false;
  }
});

// Start button click event to start or restart the game with selected names, difficulty, and mode
document.getElementById('startButton').addEventListener('click', () => {
  // Get player names
  player1Name = document.getElementById('player1Name').value || "Player 1";
  player2Name = document.getElementById('player2Name').value || "AI";
  gameMode = document.getElementById('gameMode').value;

  // If Player vs Player, update player 2's name
  if (gameMode === "pvp") {
    player2Name = document.getElementById('player2Name').value || "Player 2";
  }

  // Adjust AI settings for Player vs AI mode
  if (gameMode === "ai") {
    const difficulty = document.getElementById('difficulty').value;
    aiSpeed = difficultySettings[difficulty].aiSpeed;
    aiTolerance = difficultySettings[difficulty].aiTolerance;
  }

  // Reset and start the game
  resetGame();
});

// AI logic: predict where the ball will intersect the paddle
function moveAI() {
  if (ballSpeedX > 0) {
    let predictedY = ballY + (canvas.width - paddleWidth - ballX) * (ballSpeedY / ballSpeedX);
    if (predictedY < 0) predictedY = -predictedY;
    else if (predictedY > canvas.height) predictedY = canvas.height - (predictedY - canvas.height);

    // Move AI with some randomness and tolerance
    if (player2Y + paddleHeight / 2 < predictedY - aiTolerance) player2Y += aiSpeed + Math.random();
    else if (player2Y + paddleHeight / 2 > predictedY + aiTolerance) player2Y -= aiSpeed + Math.random();

    // AI paddle boundaries
    if (player2Y < 0) player2Y = 0;
    if (player2Y + paddleHeight > canvas.height) player2Y = canvas.height - paddleHeight;
  }
}

// Function to draw a curved paddle
function drawCurvedPaddle(x, y, paddleWidth, paddleHeight) {
  // Draw the central rectangular part of the paddle
  ctx.beginPath();
  ctx.rect(x, y + ballRadius, paddleWidth, paddleHeight - ballRadius * 2); // Reduced height for the arcs
  ctx.fillStyle = 'white';
  ctx.fill();

  // Draw the top arc
  ctx.beginPath();
  ctx.arc(x + paddleWidth / 2, y + ballRadius, ballRadius, Math.PI, 0); // Top semicircle
  ctx.fill();

  // Draw the bottom arc
  ctx.beginPath();
  ctx.arc(x + paddleWidth / 2, y + paddleHeight - ballRadius, ballRadius, 0, Math.PI); // Bottom semicircle
  ctx.fill();
}

// Function to dr`aw a rounded rectangle paddle
function drawRoundedPaddle(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y); // Top side
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius); // Top-right corner
  ctx.lineTo(x + width, y + height - radius); // Right side
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); // Bottom-right corner
  ctx.lineTo(x + radius, y + height); // Bottom side
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius); // Bottom-left corner
  ctx.lineTo(x, y + radius); // Left side
  ctx.quadraticCurveTo(x, y, x + radius, y); // Top-left corner
  let gradient = ctx.createLinearGradient(x, y, x, y + height);
  gradient.addColorStop(0, 'white'); // Top color
  gradient.addColorStop(1, '#ccc'); // Bottom color (lighter gray)
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
}


// Game loop
function gameLoop() {
  if (isGameOver || !gameInProgress) return; // Stop game if it's over or not started

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player 1 controls
  if (keys.w && player1Y > 0) player1Y -= paddleSpeed;
  if (keys.s && player1Y < canvas.height - paddleHeight) player1Y += paddleSpeed;

  // Player 2 or AI controls
  if (gameMode === "pvp") {
    if (keys.ArrowUp && player2Y > 0) player2Y -= paddleSpeed;
    if (keys.ArrowDown && player2Y < canvas.height - paddleHeight) player2Y += paddleSpeed;
  } else {
    moveAI(); // AI logic
  }

  // Ball movement
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ballTrail.push({ x: ballX, y: ballY });
  if (ballTrail.length > 10) ballTrail.shift(); // Limit trail length

  drawBallTrail();

  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) ballSpeedY = -ballSpeedY;

  if (ballX - ballRadius < paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    ballSpeedY += (ballY - (player1Y + paddleHeight / 2)) * 0.3;
    paddleHitSound.play();
    paddleHits++;
    checkSpeedIncrease();
  }

  if (ballX + ballRadius > canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    ballSpeedY += (ballY - (player2Y + paddleHeight / 2)) * 0.3;
    paddleHitSound.play();
    paddleHits++;
    checkSpeedIncrease();
  }

  if (ballX + ballRadius < 0) {
    player2Score++;
    scoreSound.play();
    checkGameOver();
    resetBall();
  }
  if (ballX - ballRadius > canvas.width) {
    player1Score++;
    scoreSound.play();
    checkGameOver();
    resetBall();
  }

  // Draw paddles
  ctx.fillStyle = 'white';
  drawRoundedPaddle(0, player1Y, paddleWidth, paddleHeight, 10);
  drawRoundedPaddle(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, 10);

  // Draw player names
  ctx.font = '20px Arial';
  ctx.fillText(player1Name, 30, 30); // Left side player name
  ctx.fillText(player2Name, canvas.width - 150, 30); // Right side player name

  // Draw ball
  drawBall();

  // Draw scores
  ctx.font = '30px Arial';
  ctx.fillText(player1Score, canvas.width / 4, 50);
  ctx.fillText(player2Score, canvas.width * 3 / 4, 50);

  requestAnimationFrame(gameLoop);
}

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

// Draw ball trail
function drawBallTrail() {
  ballTrail.forEach((pos, index) => {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, ballRadius - index * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.1 * index})`;
    ctx.fill();
    ctx.closePath();
  });
}

// Reset ball to the center
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = (gameMode === "pvp") ? 3 : 4; // Slower start for Player vs Player
    ballSpeedY = 3; // Consistent starting speed for both modes
    paddleHits = 0;
}

// Check if game is over
function checkGameOver() {
  if (player1Score >= winningScore || player2Score >= winningScore) {
    isGameOver = true;
    gameInProgress = false;
    displayGameOver();
  }
}

// Display Game Over and stop the game
function displayGameOver() {
  const winner = player1Score >= winningScore ? player1Name : player2Name;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '40px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`${winner} Wins!`, canvas.width / 2 - 100, canvas.height / 2);
}

// Reset game state and start game
function resetGame() {
    player1Score = 0;
    player2Score = 0;
    isGameOver = false;
    gameInProgress = true; // Mark game as started
    resetBall();
    gameLoop(); // Start the game loop
}

// Check speed increase after 4 hits
function checkSpeedIncrease() {
  if (paddleHits >= 4) {
    ballSpeedX *= 1.1;
    ballSpeedY *= 1.1;
    paddleHits = 0;
  }
}

// The game will now start only when the "Start Game" button is clicked
