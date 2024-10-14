import { navigateTo } from "../routes.js";
import { getState, updateState } from "../stateManager.js";

// Helper function to validate player name
function validatePlayerName(name) {
  // You can add more advanced validation (e.g., regex, filtering malicious input)
  const maliciousPattern = /[^a-zA-Z0-9\s]/; // Allow only alphanumeric and space characters
  return name.length > 0 && name.length < 10 && !maliciousPattern.test(name);
}

// Helper function to show error messages
function showErrorMessage(messageText) {
  // message.style.display = "block";
  // message.textContent = messageText;
  console.log(messageText);
}

export function FormView() {
  const state = getState();
  let currentPlayerIndex = 0;
  let playerNames = [];

  const container = document.createElement("div");
  container.className = "form-section";

  const form = document.createElement("form");
  form.className = "player-form";

  const label = document.createElement("label");
  label.textContent = `Enter name for Player 1:`;
  label.setAttribute("for", "playerNameInput");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "playerNameInput");
  input.setAttribute("placeholder", "Enter player's name");
  input.setAttribute("required", true);

  const message = document.createElement("p"); // To show error messages
  message.className = "error-message";
  message.style.color = "red";
  message.style.display = "none";

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(message);
  container.appendChild(form);

  // Attach event listener for when user presses "Enter" on the form
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission
    const playerName = input.value.trim();

    // Validate input: Check if empty, malicious characters, or duplicates
    if (!validatePlayerName(playerName)) {
      showErrorMessage("Invalid name. Please enter a valid name.");
    } else if (playerNames.includes(playerName)) {
      showErrorMessage(
        "This name has already been used. Please enter a unique name."
      );
    } else {
      // Name is valid and unique, move to the next player
      playerNames.push(playerName);
      currentPlayerIndex++;

      // Check if we've entered all player names
      if (currentPlayerIndex < state.playerCount) {
        // Update form label and input for next player
        label.textContent = `Enter name for Player ${currentPlayerIndex + 1}:`;
        input.value = ""; // Clear input for the next player
        message.style.display = "none"; // Hide error message
      }
      else
      {
        // All players have been named, proceed with the game logic
        updateState({ players: playerNames });
        if (playerNames.length === 8)
        {
          updateState( {pongGame: { tournament: true } } );
          navigateTo("#tournament");
        }
        else
          navigateTo("#game");
      }
    }
  });

  return container;
}
