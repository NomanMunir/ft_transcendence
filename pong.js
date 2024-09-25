let totalPlayers = 0;
let playerCount = 0;
const playerList = [];

const playerSelectionDiv = document.getElementById('playerSelection');
const registerForm = document.getElementById('registerForm');
const playerPrompt = document.getElementById('playerPrompt');
const playerNameInput = document.getElementById('playerName');
const playerListElement = document.getElementById('playerList');
const bracketDiv = document.getElementById('bracket');

// Player selection event listeners
document.getElementById('select4Players').addEventListener('click', function() {
    totalPlayers = 4;
    startPlayerRegistration();
});

document.getElementById('select8Players').addEventListener('click', function() {
    totalPlayers = 8;
    startPlayerRegistration();
});

// Start the player registration process
function startPlayerRegistration() {
    playerSelectionDiv.style.display = 'none'; // Hide player selection
    registerForm.style.display = 'flex'; // Show player registration form
    playerCount = 0; // Reset player count
    updatePlayerPrompt(); // Update the prompt to show the first player
}

// Handle player registration
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const playerName = playerNameInput.value.trim();

    if (playerName) {
        playerList.push(playerName); // Add player name to the list
        playerCount++;
        displayPlayers(); // Update the player list UI

        if (playerCount < totalPlayers) {
            updatePlayerPrompt(); // Ask for the next player's name
        } else {
            registerForm.style.display = 'none'; // Hide the form when all players are registered
            generateBracket(); // Show the tournament bracket
        }
    }

    playerNameInput.value = ''; // Clear the input field
});

// Update the prompt to ask for the next player's name
function updatePlayerPrompt() {
    playerPrompt.textContent = `Enter Player ${playerCount + 1} Name:`;
}

// Display the registered players
function displayPlayers() {
    playerListElement.innerHTML = '';
    playerList.forEach((player, index) => {
        playerListElement.innerHTML += `<li>Player ${index + 1}: ${player}</li>`;
    });
}

// Generate the tournament bracket
function generateBracket() {
    bracketDiv.style.display = 'flex'; // Show the bracket

    const round1Matches = createMatches(playerList);
    displayMatches(round1Matches, 'round1'); // Display the first round matches
}

// Function to create matches for the first round
function createMatches(players) {
    const matches = [];
    for (let i = 0; i < players.length; i += 2) {
        matches.push([players[i], players[i + 1]]);
    }
    return matches;
}

// Function to display matches in a specific round
function displayMatches(matches, roundId) {
    const roundDiv = document.getElementById(roundId);
    roundDiv.innerHTML = ''; // Clear previous matches

    matches.forEach((match, index) => {
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');
        matchDiv.innerHTML = `<span>Match ${index + 1}</span><span>${match[0]} vs ${match[1]}</span>`;
        roundDiv.appendChild(matchDiv);
    });
}