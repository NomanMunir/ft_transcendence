export let totalPlayers = 0;
export let playerList = [];

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
    playerSelectionDiv.style.display = 'none'; // Hide player selection
    registerForm.style.display = 'flex'; // Show player registration form
    playerList = []; // Reset player list
    updatePlayerPrompt(); // Ask for first player name
}

// Handle player registration
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const playerName = playerNameInput.value.trim();

    if (playerName) {
        playerList.push(playerName); // Add player name to list
        displayPlayers(); // Update player list UI
        if (playerList.length < totalPlayers) {
            updatePlayerPrompt(); // Ask for next player's name
        } else {
            registerForm.style.display = 'none'; // Hide form when all players are registered
            document.dispatchEvent(new CustomEvent('playersRegistered', { detail: { playerList } }));
        }
    }

    playerNameInput.value = ''; // Clear the input field
});

// Update prompt to ask for the next player's name
function updatePlayerPrompt() {
    playerPrompt.textContent = `Enter Player ${playerList.length + 1} Name:`;
}

// Display the registered players in the UI
function displayPlayers() {
    playerListElement.innerHTML = '';
    playerList.forEach((player, index) => {
        playerListElement.innerHTML += `<li>Player ${index + 1}: ${player}</li>`;
    });
}
