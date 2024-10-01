export function simulateMatch(player1, player2) {
    return new Promise((resolve) => {
        // Select existing canvas and name display elements
        const canvasDiv = document.getElementById('canvasDiv');
        const nameDisplay = document.getElementById('nameDisplay');
        const canvas = document.getElementById('gameCanvas');
        
        // Check if the canvas exists, if not, stop execution
        if (!canvas) {
            console.error("Canvas element not found.");
            resolve(null);
            return;
        }
        
        // Ensure the canvas and name display are hidden initially
        canvasDiv.classList.remove('d-none');
        canvasDiv.classList.add('d-block');  // Only visible with this class
        nameDisplay.classList.remove('d-none');
        nameDisplay.classList.add('d-block');

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("2D context not available.");
            resolve(null);
            return;
        }

        // Update the player names for the current match
        document.getElementById('playerNames').innerHTML = `${player1} vs ${player2}`;

        // Set the canvas background color
        canvas.style.backgroundColor = '#333333';  // Light black background

        // Clear canvas before the next match starts
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Game variables
        let ballX = canvas.width / 2;
        let ballY = canvas.height / 2;
        let ballSpeedX = 5;
        let ballSpeedY = 5;
        const ballRadius = 10;

        const paddleWidth = 10;
        const paddleHeight = 120;
        const paddleSpeed = 6;
        let player1Y = canvas.height / 2 - paddleHeight / 2;
        let player2Y = canvas.height / 2 - paddleHeight / 2;

        let player1Score = 0;
        let player2Score = 0;
        const winningScore = 3;

        const keys = { w: false, s: false, ArrowUp: false, ArrowDown: false };

        // Event listeners for key press and release
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

        // Game loop function
        function gameLoop() {
            if (player1Score >= winningScore || player2Score >= winningScore) {
                const winner = player1Score >= winningScore ? player1 : player2;
                resolve(winner);
                return;
            }

            // Move the ball
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
                } else {
                    player2Score++;
                    resetBall();
                }
            }

            if (ballX + ballRadius > canvas.width - paddleWidth) {
                if (ballY > player2Y && ballY < player2Y + paddleHeight) {
                    ballSpeedX = -ballSpeedX;
                } else {
                    player1Score++;
                    resetBall();
                }
            }

            // Player controls
            if (keys.w && player1Y > 0) player1Y -= paddleSpeed;
            if (keys.s && player1Y < canvas.height - paddleHeight) player1Y += paddleSpeed;
            if (keys.ArrowUp && player2Y > 0) player2Y -= paddleSpeed;
            if (keys.ArrowDown && player2Y < canvas.height - paddleHeight) player2Y += paddleSpeed;

            // Clear the canvas and redraw paddles and ball
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
            ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();

            // Continue the game loop
            requestAnimationFrame(gameLoop);
        }

        // Reset the ball position
        function resetBall() {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            ballSpeedX = -ballSpeedX;
            ballSpeedY = 5;
        }

        resetBall();  // Initialize ball position at the start
        gameLoop();   // Start the game loop
    });
}
