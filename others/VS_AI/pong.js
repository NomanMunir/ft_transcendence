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
let player2Y = canvas.height / 2 - paddleHeight / 2; // AI paddle

// Scores
let player1Score = 0;
let player2Score = 0;
const winningScore = 5;
let isGameOver = false;

// Difficulty settings
const difficultySettings = {
  easy: { aiSpeed: 2, aiTolerance: 25 },
  medium: { aiSpeed: 3, aiTolerance: 15 },
  hard: { aiSpeed: 4, aiTolerance: 8 }
};

// Keys pressed
const keys = {
  w: false,
  s: false
};

// Sound effects
const paddleHitSound = new Audio('https://www.soundjay.com/button/beep-07.wav');
const scoreSound = new Audio('https://www.soundjay.com/button/beep-02.wav');

// Event listeners for key press
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w': keys.w = true; break;
    case 's': keys.s = true; break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w': keys.w = false; break;
    case 's': keys.s = false; break;
  }
});

// Start button click event to start the game with the selected difficulty
document.getElementById('startButton').addEventListener('click', () => {
  const difficulty = document.getElementById('difficulty').value;
  aiSpeed = difficultySettings[difficulty].aiSpeed;
  aiTolerance = difficultySettings[difficulty].aiTolerance;
  resetGame();
});

// AI logic: predict where the ball will intersect the paddle
function moveAI() {
  // Only move if the ball is coming toward the AI paddle
  if (ballSpeedX > 0) {
    // Predict the future Y position of the ball
    let predictedY = ballY + (canvas.width - paddleWidth - ballX) * (ballSpeedY / ballSpeedX);

    // Bounce prediction (if ball hits top or bottom wall)
    if (predictedY < 0) {
      predictedY = -predictedY;
    } else if (predictedY > canvas.height) {
      predictedY = canvas.height - (predictedY - canvas.height);
    }

    // Move the AI paddle toward the predicted position with tolerance and randomness
    if (player2Y + paddleHeight / 2 < predictedY - aiTolerance) {
      player2Y += aiSpeed + Math.random(); // Add randomness for fairness
    } else if (player2Y + paddleHeight / 2 > predictedY + aiTolerance) {
      player2Y -= aiSpeed + Math.random();
    }

    // Ensure AI doesn't go out of bounds
    if (player2Y < 0) player2Y = 0; // Top boundary
    if (player2Y + paddleHeight > canvas.height) player2Y = canvas.height - paddleHeight; // Bottom boundary
  }
}

// Game loop
function gameLoop() {
  if (isGameOver) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move player paddle
  if (keys.w && player1Y > 0) player1Y -= paddleSpeed;
  if (keys.s && player1Y < canvas.height - paddleHeight) player1Y += paddleSpeed;

  // AI paddle logic (move AI)
  moveAI();

  // Ball movement
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball trail effect (store previous positions)
  ballTrail.push({ x: ballX, y: ballY });
  if (ballTrail.length > 10) ballTrail.shift(); // Limit trail length to 10

  // Draw ball trail
  drawBallTrail();

  // Ball collision with top and bottom walls
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (ballX - ballRadius < paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    // Adjust ball speedY based on hit location for better bounce
    ballSpeedY += (ballY - (player1Y + paddleHeight / 2)) * 0.3;
    paddleHitSound.play(); // Play paddle hit sound
    paddleHits++;
    checkSpeedIncrease(); // Check if we should increase game speed
  }
  if (ballX + ballRadius > canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    // Adjust ball speedY based on hit location for better bounce
    ballSpeedY += (ballY - (player2Y + paddleHeight / 2)) * 0.3;
    paddleHitSound.play(); // Play paddle hit sound
    paddleHits++;
    checkSpeedIncrease(); // Check if we should increase game speed
  }

  // Ball goes out of bounds (left or right side)
  if (ballX + ballRadius < 0) {
    player2Score++; // AI scores
    scoreSound.play(); // Play score sound
    checkGameOver();
    resetBall();
  }
  if (ballX - ballRadius > canvas.width) {
    player1Score++; // Player scores
    scoreSound.play(); // Play score sound
    checkGameOver();
    resetBall();
  }

  // Draw paddles
  ctx.fillStyle = 'white';
  ctx.fillRect(0, player1Y, paddleWidth, paddleHeight); // Left paddle (Player)
  ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight); // Right paddle (AI)

  // Draw ball
  drawBall();

  // Draw scores
  ctx.font = '30px Arial';
  ctx.fillText(player1Score, canvas.width / 4, 50); // Left score
  ctx.fillText(player2Score, canvas.width * 3 / 4, 50); // Right score

  // Call gameLoop again
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

// Draw ball trail (previous positions)
function drawBallTrail() {
  ballTrail.forEach((pos, index) => {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, ballRadius - index * 0.6, 0, Math.PI * 2); // Decrease size for fading effect
    ctx.fillStyle = `rgba(255, 255, 255, ${0.1 * index})`; // Gradual transparency
    ctx.fill();
    ctx.closePath();
  });
}

// Reset ball to the center after scoring
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = (ballSpeedX > 0 ? 4 : -4); // Reset ball speed
  ballSpeedY = 4;
  paddleHits = 0; // Reset paddle hits on score
}

// Check if game is over
function checkGameOver() {
  if (player1Score >= winningScore || player2Score >= winningScore) {
    isGameOver = true;
    displayGameOver();
  }
}

// Display Game Over and reset game after 2 seconds
function displayGameOver() {
  const winner = player1Score >= winningScore ? "Player 1" : "AI";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '40px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`${winner} Wins!`, canvas.width / 2 - 100, canvas.height / 2);

  setTimeout(() => {
    resetGame();
  }, 2000); // Wait for 2 seconds before resetting
}

// Reset the game
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  isGameOver = false;
  resetBall();
  gameLoop();
}

// Check if it's time to increase game speed after 4 hits
function checkSpeedIncrease() {
  if (paddleHits >= 4) {
    ballSpeedX *= 1.1; // Increase speed by 10%
    ballSpeedY *= 1.1;
    paddleHits = 0; // Reset hit count
  }
}

// Start the game
gameLoop();
