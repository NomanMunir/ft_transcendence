{
    const playerNames = JSON.parse(localStorage.getItem('players')); // Player names from localStorage
    localStorage.removeItem('players');
    if (!playerNames) window.location.hash = '#form3'; // Redirect to form if no players

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.style.backgroundColor = "green";
    const winningScore = 5;
    let gameOver = false;
    let gameLoopID;

    const paddleHeight = 100;
    const paddleWidth = 10;
    let ballSpeedMultiplier = 1.1;

    class Ball
    {
        constructor(x, y, radius, dx, dy) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
        }

        draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.x += this.dx;
            this.y += this.dy;
        }

        reset() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.dx = 3;
            this.dy = 3;
        }

        wallCollision() 
        {
            if (playerNames.length < 3) // Bounce off the top wall for 2 players
            {
                if (this.y - this.radius < 0) this.dy = -this.dy;
            }
        
            if (playerNames.length < 4) // Bounce off the bottom wall for 2 or 3 players
            {
                if (this.y + this.radius > canvas.height) this.dy = -this.dy;
            }

            if (this.x + this.radius > canvas.width) // Ball hits the right wall
            {
                if (playerNames.length == 2)
                    playerObjects[0].score++; // Player 1 scores
                else
                    playerObjects[1].score++; // Player 2 scores
                checkForWinner();
                if (!gameOver) this.reset(); // Reset the ball
            }
        
            if (this.x - this.radius < 0) // Ball hits the left wall
            {
                if (playerNames.length < 3)
                    playerObjects[1].score++; // Player 2 scores
                else
                    playerObjects[0].score++; // Player 1 scores
                checkForWinner();
                if (!gameOver) this.reset(); // Reset the ball
            }
        
            if (playerNames.length >= 3)
            {
                if (this.y + this.radius > canvas.height) // Ball hits the bottom wall
                {
                    if (playerNames.length === 4)
                        playerObjects[3].score++; // Player 4 scores
                    checkForWinner();
                    console.log(gameOver);
                    if (!gameOver && playerNames.length == 4) this.reset(); // Reset the ball
                }
                if (this.y - this.radius < 0) // Ball hits the top wall
                {
                    playerObjects[2].score++; // Player 3 scores
                    checkForWinner();
                    if (!gameOver) this.reset(); // Reset the ball
                }
            }
        
            // Check collisions with paddles for all players
            playerObjects.forEach(player => player.checkCollision(this));
        }
        

        increaseSpeed() {
            this.dx *= ballSpeedMultiplier;
            this.dy *= ballSpeedMultiplier;
        }
    }

    class Player {
        constructor(name, paddleX, paddleY, paddleWidth, paddleHeight, movementAxis, upKey, downKey) {
            this.name = name;
            this.paddleX = paddleX;
            this.paddleY = paddleY;
            this.paddleWidth = paddleWidth;
            this.paddleHeight = paddleHeight;
            this.upKey = upKey;
            this.downKey = downKey;
            this.movementAxis = movementAxis; // horizontal or vertical
            this.speed = 5;
            this.upPressed = false;
            this.downPressed = false;
            this.score = 0;
            this.paddleHits = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.rect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        }

        update() {
            if (this.movementAxis === "vertical") {
                if (this.upPressed && this.paddleY > 0) this.paddleY -= this.speed;
                if (this.downPressed && this.paddleY < canvas.height - this.paddleHeight) this.paddleY += this.speed;
            } else {
                if (this.upPressed && this.paddleX > 0) this.paddleX -= this.speed;
                if (this.downPressed && this.paddleX < canvas.width - this.paddleWidth) this.paddleX += this.speed;
            }
        }

        checkCollision(ball) {
            if (this.movementAxis === "vertical") {
                // Left and right paddles (vertical movement)
                if (
                    ball.x - ball.radius < this.paddleX + this.paddleWidth && // Ball within paddle's width
                    ball.x + ball.radius > this.paddleX && // Ball not past the paddle
                    ball.y > this.paddleY && // Ball within paddle's top boundary
                    ball.y < this.paddleY + this.paddleHeight // Ball within paddle's bottom boundary
                ) {
                    ball.dx = -ball.dx; // Reverse ball direction on X-axis
                    this.paddleHits++;
                    if (this.paddleHits >= 3) {
                        ball.increaseSpeed(); // Increase speed after 3 hits
                        this.paddleHits = 0; // Reset hit counter
                    }
                }
            } else {
                // Top and bottom paddles (horizontal movement)
                if (
                    ball.y - ball.radius < this.paddleY + this.paddleHeight && // Ball within paddle's height
                    ball.y + ball.radius > this.paddleY && // Ball not past the paddle
                    ball.x > this.paddleX && // Ball within paddle's left boundary
                    ball.x < this.paddleX + this.paddleWidth // Ball within paddle's right boundary
                ) {
                    ball.dy = -ball.dy; // Reverse ball direction on Y-axis
                    this.paddleHits++;
                    if (this.paddleHits >= 3) {
                        ball.increaseSpeed(); // Increase speed after 3 hits
                        this.paddleHits = 0; // Reset hit counter
                    }
                }
            }
        }
    }

    // Dynamically create players based on the number of players
    function createPlayers()
    {
        let playerObjects = []; // Renamed to avoid conflict
        if (playerNames.length >= 2) {
            // Player 1 (Left)
            playerObjects.push(new Player(playerNames[0], 0, (canvas.height - paddleHeight) / 2, paddleWidth, paddleHeight, "vertical", "w", "s"));
            // Player 2 (Right)
            playerObjects.push(new Player(playerNames[1], canvas.width - paddleWidth, (canvas.height - paddleHeight) / 2, paddleWidth, paddleHeight, "vertical", "ArrowUp", "ArrowDown"));
        }
        if (playerNames.length >= 3) {
            // Player 3 (Top)
            playerObjects.push(new Player(playerNames[2], (canvas.width - 100) / 2, 0, 100, paddleWidth, "horizontal", "a", "d"));
        }
        if (playerNames.length === 4) {
            // Player 4 (Bottom)
            playerObjects.push(new Player(playerNames[3], (canvas.width - 100) / 2, canvas.height - paddleWidth, 100, paddleWidth, "horizontal", "j", "k"));
        }
        return playerObjects;
    }

    const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 3, 3);
    const playerObjects = createPlayers(); // Store the player objects

    document.addEventListener("keydown", (e) => keyHandler(e, true));
    document.addEventListener("keyup", (e) => keyHandler(e, false));

    function keyHandler(e, isPressed) {
        playerObjects.forEach(player => {
            if (e.key === player.upKey) player.upPressed = isPressed;
            if (e.key === player.downKey) player.downPressed = isPressed;
        });
    }

    function checkForWinner() {
        playerObjects.forEach(player => {
            if (player.score >= winningScore) {
                displayWinner(player.name);
            }
        });
    }

    function displayWinner(winner) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        if (playerNames.length < 3)
            ctx.fillText(`${winner} Wins!`, canvas.width / 2, canvas.height / 2);
        else
            ctx.fillText(`${winner} Lose!`, canvas.width / 2, canvas.height / 2);

        cancelAnimationFrame(gameLoopID);
        gameOver = true;
    }

    function displayScores() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
    
        playerObjects.forEach((player, index) => {
            if (player.movementAxis === "vertical") {
                // Left paddle (Player 1) - score on the left
                if (player.paddleX === 0) {
                    ctx.fillText(`${player.name}: ${player.score}`, 20, canvas.height / 2);
                }
                // Right paddle (Player 2) - score on the right
                else if (player.paddleX + player.paddleWidth === canvas.width) {
                    ctx.fillText(`${player.name}: ${player.score}`, canvas.width - 50, canvas.height / 2);
                }
            } else {
                // Top paddle (Player 3) - score at the top
                if (player.paddleY === 0) {
                    ctx.fillText(`${player.name}: ${player.score}`, canvas.width / 2 - 50, 30);
                }
                // Bottom paddle (Player 4) - score at the bottom
                else if (player.paddleY + player.paddleHeight === canvas.height) {
                    ctx.fillText(`${player.name}: ${player.score}`, canvas.width / 2 - 50, canvas.height - 20);
                }
            }
        });
    }
    
    function startGame() {
        if (gameOver) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.draw();
        playerObjects.forEach(player => {
            player.draw();
            player.update();
        });

        ball.wallCollision();
        ball.update();

        displayScores();

        gameLoopID = requestAnimationFrame(startGame);
    }

    startGame();
}
