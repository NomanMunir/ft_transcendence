
function startPongGame() {

    const playerNames = JSON.parse(localStorage.getItem('players')); 
    localStorage.removeItem('players');
    if (!playerNames) window.location.hash = "#select_pong";
    
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const winningScore = 5;
    let gameOver = false;
    let gameLoopID;

    const paddleHeight = 100;
    const paddleWidth = 10;
    let ballSpeedMultiplier = 1.1;

    // Visual enhancements
    function drawBackground() {
        // Draw a radial gradient background
        const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.height / 4, canvas.width / 2, canvas.height / 2, canvas.height);
        gradient.addColorStop(0, '#2a2a2a');  // Darker in the center
        gradient.addColorStop(1, '#4c4c4c');  // Lighter on the outside
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw dotted middle line
        ctx.setLineDash([10, 10]); // 10px dash, 10px gap
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash
    }

    class Ball {
        constructor(x, y, radius, dx, dy) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
            this.initialSpeedX = dx;
            this.initialSpeedY = dy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = "white";
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.closePath();
            ctx.shadowBlur = 0;  // Reset shadow
        }

        update() {
            this.x += this.dx;
            this.y += this.dy;
        }

        reset() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
    
            this.dx = Math.random() < 0.5 ? this.initialSpeedX : -this.initialSpeedX; // Random left or right
            this.dy = Math.random() < 0.5 ? this.initialSpeedY : -this.initialSpeedY; // Random up or down
        }

        wallCollision() {
            if (playerNames.length < 3)
                if (this.y - this.radius < 0) this.dy = -this.dy;
            if (playerNames.length < 4)
                if (this.y + this.radius > canvas.height) this.dy = -this.dy;

            if (this.x + this.radius > canvas.width) {
                if (playerNames.length == 2)
                    playerObjects[0].score++;
                else
                    playerObjects[1].score++;
                checkForWinner();
                if (!gameOver) this.reset();
            }

            if (this.x - this.radius < 0) {
                if (playerNames.length < 3)
                    playerObjects[1].score++;
                else
                    playerObjects[0].score++;
                checkForWinner();
                if (!gameOver) this.reset();
            }

            if (playerNames.length >= 3) {
                if (this.y + this.radius > canvas.height) {
                    if (playerNames.length === 4)
                        playerObjects[3].score++;
                    checkForWinner();
                    if (!gameOver && playerNames.length == 4) this.reset();
                }
                if (this.y - this.radius < 0) {
                    playerObjects[2].score++;
                    checkForWinner();
                    if (!gameOver) this.reset();
                }
            }
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
            this.movementAxis = movementAxis; 
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
            ctx.beginPath();
            ctx.rect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
            ctx.fillStyle = "white";
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.closePath();
            ctx.shadowBlur = 0;
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

    function createPlayers() {
        let playerObjects = [];
        if (!playerNames) return;
        if (playerNames.length >= 2) {
            playerObjects.push(new Player(playerNames[0], 0, (canvas.height - paddleHeight) / 2, paddleWidth, paddleHeight, "vertical", "w", "s"));
            playerObjects.push(new Player(playerNames[1], canvas.width - paddleWidth, (canvas.height - paddleHeight) / 2, paddleWidth, paddleHeight, "vertical", "ArrowUp", "ArrowDown"));
        }
        if (playerNames.length >= 3) {
            playerObjects.push(new Player(playerNames[2], (canvas.width - 100) / 2, 0, 100, paddleWidth, "horizontal", "z", "x"));
        }
        if (playerNames.length === 4) {
            playerObjects.push(new Player(playerNames[3], (canvas.width - 100) / 2, canvas.height - paddleWidth, 100, paddleWidth, "horizontal", ",", "."));
        }
        return playerObjects;
    }

    const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 5, 5);
    const playerObjects = createPlayers(); 

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

    function displayWinner(winner)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        if (playerNames.length < 3)
            ctx.fillText(`${winner} Wins!`, canvas.width / 2, canvas.height / 2);
        else
            ctx.fillText(`${winner} Lose!`, canvas.width / 2, canvas.height / 2);
        canvas.addEventListener("click", () =>
        {
            playerObjects.forEach(player => player.reset());
            ball.reset();
            gameOver = false;
            startCountdownWithDetails();
        }, { once: true });
        ctx.fillText("Click to restart", canvas.width / 2, canvas.height / 2 + 50);
        cancelAnimationFrame(gameLoopID);
        gameOver = true;
    }

    function displayScores() {
        ctx.font = "14px Arial";
        ctx.textAlign = "left";
        ctx.fillStyle = "white";
    
        playerObjects.forEach((player) => {
            if (player.movementAxis === "vertical") {
                if (player.paddleX === 0) {
                    ctx.fillText(`${player.name}: ${player.score}`, 40, canvas.height / 2);
                }
                else if (player.paddleX + player.paddleWidth === canvas.width) {
                    ctx.fillText(`${player.name}: ${player.score}`, canvas.width - 70, canvas.height / 2);
                }
            } else {
                if (player.paddleY === 0)
                    ctx.fillText(`${player.name}: ${player.score}`, canvas.width / 2 + 30, 50);
                else if (player.paddleY + player.paddleHeight === canvas.height) {
                    ctx.fillText(`${player.name}: ${player.score}`, canvas.width / 2 + 30, canvas.height - 50);
                }
            }
        });
    }

    function startGame() {
        if (gameOver) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
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

    function startCountdownWithDetails() {
        let countdown = 5; 
        const countdownInterval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = "14px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            
            playerObjects.forEach((player, index) => {
                // drawBackground();
                let positionText;

                if (player.movementAxis === "vertical") {
                    if (player.paddleX === 0) {
                        positionText = "Left Paddle (Vertical)";
                        ctx.fillText(`${player.name}`, 50, canvas.height / 2 - 30);
                        ctx.fillText(`(W / S)`, 50, canvas.height / 2); 
                    } else {
                        positionText = "Right Paddle (Vertical)";
                        ctx.fillText(`${player.name}`, canvas.width - 70, canvas.height / 2 - 30);
                        ctx.fillText(`(UP / DOWN)`, canvas.width - 70, canvas.height / 2); 
                    }
                } else {
                    if (player.paddleY === 0) {
                        positionText = "Top Paddle (Horizontal)";
                        ctx.fillText(`${player.name}`, canvas.width / 2, 50); 
                        ctx.fillText(`(Z / X)`, canvas.width / 2, 80); 
                    } else {
                        positionText = "Bottom Paddle (Horizontal)";
                        ctx.fillText(`${player.name}`, canvas.width / 2, canvas.height - 60);
                        ctx.fillText(`(, / .)`, canvas.width / 2, canvas.height - 30); 
                    }
                }
            });

            ctx.font = "40px Arial";
            ctx.fillStyle = "white"; 
            ctx.fillText(`Game starts in ${countdown}...`, canvas.width / 2, canvas.height / 2);

            countdown--;

            if (countdown < 0) {
                clearInterval(countdownInterval);
                startGame(); 
            }
            
        }, 1000);
    }
    startCountdownWithDetails(); 
}
startPongGame();