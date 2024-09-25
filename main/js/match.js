export function simulateMatch(player1, player2) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;  // Increase canvas width
        canvas.height = 600;  // Increase canvas height
        document.body.appendChild(canvas);

        // Set the canvas background color to light black
        canvas.style.backgroundColor = '#333333';  // Light black background

        // Change the body background color to avoid conflict with white text
        document.body.style.backgroundColor = '#444444';  // Dark gray

        // Display player names above the canvas
        const nameDisplay = document.createElement('div');
        nameDisplay.innerHTML = `<h3>${player1} vs ${player2}</h3>`;
        nameDisplay.style.textAlign = 'center';
        document.body.insertBefore(nameDisplay, canvas);

        let ballX = canvas.width / 2;
        let ballY = canvas.height / 2;
        let ballSpeedX = 5;  // Slightly faster ball speed
        let ballSpeedY = 5;  // Slightly faster ball speed
        const ballRadius = 10;
        let paddleHits = 0;  // Track how many times the ball hits a paddle

        const paddleWidth = 10;
        const paddleHeight = 120;  // Increase paddle height for bigger paddles
        const paddleSpeed = 6;
        let player1Y = canvas.height / 2 - paddleHeight / 2;
        let player2Y = canvas.height / 2 - paddleHeight / 2;

        let player1Score = 0;
        let player2Score = 0;
        const winningScore = 3;  // First player to reach 3 points wins
        const hitsBeforeSpeedIncrease = 4;  // Increase ball speed after 4 hits

        const keys = { w: false, s: false, ArrowUp: false, ArrowDown: false };

        // Listen for keydown and keyup events for controlling paddles
        document.addEventListener('keydown', function (event) {
            if (event.key in keys) {
                keys[event.key] = true;
            }
        });

        document.addEventListener('keyup', function (event) {
            if (event.key in keys) {
                keys[event.key] = false;
            }
        });

        // Main game loop
        function gameLoop() {
            if (player1Score >= winningScore || player2Score >= winningScore) {
                const winner = player1Score >= winningScore ? player1 : player2;
                resolve(winner);
                canvas.remove();
                nameDisplay.remove();
                return;
            }

            // Move ball
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            // Ball collision with top and bottom walls
            if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
                ballSpeedY = -ballSpeedY;
            }

            // Ball collision with paddles
            if (ballX - ballRadius < paddleWidth) {
                if (ballY > player1Y && ballY < player1Y + paddleHeight) {
                    ballSpeedX = -ballSpeedX;
                    paddleHits++;
                    increaseSpeedIfNeeded();
                } else {
                    player2Score++;  // Player 2 scores
                    resetBall();
                }
            }

            if (ballX + ballRadius > canvas.width - paddleWidth) {
                if (ballY > player2Y && ballY < player2Y + paddleHeight) {
                    ballSpeedX = -ballSpeedX;
                    paddleHits++;
                    increaseSpeedIfNeeded();
                } else {
                    player1Score++;  // Player 1 scores
                    resetBall();
                }
            }

            // Player 1 controls
            if (keys.w && player1Y > 0) player1Y -= paddleSpeed;
            if (keys.s && player1Y < canvas.height - paddleHeight) player1Y += paddleSpeed;

            // Player 2 controls
            if (keys.ArrowUp && player2Y > 0) player2Y -= paddleSpeed;
            if (keys.ArrowDown && player2Y < canvas.height - paddleHeight) player2Y += paddleSpeed;

            // Draw everything
            drawGame();

            requestAnimationFrame(gameLoop);  // Continue the game loop
        }

        // Function to reset the ball after a point is scored
        function resetBall() {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            ballSpeedX = -ballSpeedX;  // Ball goes in opposite direction
            ballSpeedY = 5;  // Reset the ball speed
            paddleHits = 0;  // Reset hit count
        }

        // Function to increase ball speed after hitting paddles a certain number of times
        function increaseSpeedIfNeeded() {
            if (paddleHits >= hitsBeforeSpeedIncrease) {
                ballSpeedX *= 1.1;  // Increase speed by 10%
                ballSpeedY *= 1.1;
                paddleHits = 0;  // Reset the hit count after speed increase
            }
        }

        // Function to draw the game elements
        function drawGame() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw paddles with glowing effect
            ctx.fillStyle = 'white';
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';  // Paddle glowing effect
            ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
            ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

            // Draw ball with glowing effect
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';  // Ball glowing effect

            // Draw the scores
            ctx.font = '30px Arial';
            ctx.fillText(player1Score, canvas.width / 4, 50);
            ctx.fillText(player2Score, (canvas.width * 3) / 4, 50);
        }

        // Start the game loop
        resetBall();
        gameLoop();
    });
}
