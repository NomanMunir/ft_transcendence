import { navigateTo } from "../routes.js";
import { getState, updateState } from "../stateManager.js";

// Helper function to validate player name
function validatePlayerName(name) {
  const maliciousPattern = /[^a-zA-Z0-9\s]/; // Allow only alphanumeric and space characters
  return name.length > 0 && name.length <= 10 && !maliciousPattern.test(name);
}

// Helper function to show error messages
function showErrorMessage(message, messageText) {
  message.style.display = "block";
  message.textContent = messageText;
  message.classList.add("alert", "alert-danger"); // Apply Bootstrap alert styles
  console.log(messageText);
}

export function FormView() {
  const state = getState();
  let currentPlayerIndex = 0;
  let playerNames = [];

  const container = document.createElement("div");
  container.className = "form-section vh-100 d-flex justify-content-center align-items-center"; // Full height and centered content

  const form = document.createElement("form");
  form.className = "player-form bg-dark p-5 rounded shadow-lg"; // Dark background, padding, rounded corners, shadow

  const title = document.createElement("h2");
  title.className = "text-white text-center mb-4"; // Centered white text
  title.textContent = "Player Name Entry";

  const label = document.createElement("label");
  label.textContent = `Enter name for Player 1:`;
  label.setAttribute("for", "playerNameInput");
  label.className = "form-label text-white"; // White label

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "playerNameInput");
  input.setAttribute("placeholder", "Enter player's name");
  input.setAttribute("required", true);
  input.setAttribute("maxlength", 10);
  input.setAttribute("autofocus", true);
  input.className = "form-control form-control-lg mb-3"; // Large form control and margin-bottom

  const message = document.createElement("p"); // To show error messages
  message.className = "error-message mt-2"; // Add margin-top for spacing
  message.style.display = "none"; // Initially hidden

  const submitButton = document.createElement("button");
  submitButton.className = "btn btn-success btn-lg w-100 mt-3"; // Full width button with margin-top
  submitButton.textContent = "Submit"; // Text on the button

  form.appendChild(title);
  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(message);
  form.appendChild(submitButton); // Add the submit button
  container.appendChild(form);

  // Attach event listener for when user presses "Enter" on the form
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission
    const playerName = input.value.trim();

    // Validate input: Check if empty, malicious characters, or duplicates
    if (!validatePlayerName(playerName)) {
      showErrorMessage(message, "Please enter a valid name.");
    } else if (playerNames.includes(playerName)) {
      showErrorMessage(message, "This name has already been used.");
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
      } else {
        // All players have been named, proceed with the game logic
        updateState({ players: playerNames });
        if (playerNames.length === 8) {
          navigateTo("#tournament");
        } else {
          navigateTo("#game");
        }
      }
    }
  });

  return container;
}
