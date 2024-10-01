import { generateBracket } from './bracket.js';

export let totalPlayers = 0;
export let playerList = [];
export let playerCount = 0;

const playerSelectionDiv = document.getElementById('playerSelection');
const registerForm = document.getElementById('registerForm');
const playerPrompt = document.getElementById('playerPrompt');
const playerNameInput = document.getElementById('playerName');
const playerListElement = document.getElementById('playerList');

// Event listeners for selecting player count
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
    playerSelectionDiv.classList.add('d-none');  // Hide player selection
    registerForm.classList.remove('d-none');  // Show player registration form
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
            registerForm.classList.add('d-none');  // Hide the form when all players are registered
            generateBracket(playerList);  // Show the tournament bracket
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
        playerListElement.innerHTML += `<li class="list-group-item">Player ${index + 1}: ${player}</li>`;
    });
}
