function createBracket() {
    // Retrieve players from localStorage and parse it
    const players = JSON.parse(localStorage.getItem('players'));

    // Check if we have exactly 8 players
    if (!players || players.length !== 8) {
        console.error("You need exactly 8 players to create the tournament.");
        return;
    }

    // Function to shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    // Shuffle the players to randomize matchups
    const shuffledPlayers = shuffle([...players]);

    // Create the first round brackets by pairing players
    const brackets = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
        brackets.push({
            match: `Match ${i / 2 + 1}`,
            player1: shuffledPlayers[i],
            player2: shuffledPlayers[i + 1]
        });
    }

    // Store the brackets in localStorage or return it
    localStorage.setItem('brackets', JSON.stringify(brackets));

    console.log(brackets); // For debugging, log the generated bracket
    drawBrackets(brackets);
    localStorage.removeItem('players');
    for (let i = 0; i < brackets.length; i++) {
        console.log(brackets[i].player1 + " vs " + brackets[i].player2);
        localStorage.setItem('players', JSON.stringify([brackets[i].player1, brackets[i].player2]));
        startPongGame();
    }
}

// Call the function to create the tournament brackets

function drawBrackets(brackets) {
    let html = `
        <div class="round"> <!-- First round -->
            ${brackets.slice(0, 4).map((bracket, index) => `
                <div class="bracket">
                    <h3>Match ${index+1}</h3>
                    <p class="player">${bracket.player1}</p>
                    <p class="player"> ${bracket.player2}</p>
                </div>
            `).join('')}
        </div>
        <div class="round semi-final-bracket"> <!-- Semi-final round -->
            <div class="bracket">
                <h3>Semi-final</h3>
                <p class="player"> vs </p>
            </div>
            <div class="bracket">
                <h3>Semi-final</h3>
                <p class="player"> vs </p>
            </div>
        </div>
        <div class="round final-bracket"> <!-- Final round -->
            <div class="bracket">
                <h3>Final</h3>
                <p class="player"> vs </p>
            </div>
        </div>
    `;

    document.querySelector('#tournamentBracket').innerHTML = html;
}
createBracket();
