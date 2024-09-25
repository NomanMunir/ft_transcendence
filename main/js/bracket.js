import { simulateMatch } from "./match.js";

const bracketDiv = document.getElementById("bracket");

// Handle player registration completion
document.addEventListener("playersRegistered", function (event) {
  const players = event.detail.playerList;
  generateBracket(players);
});

// Generate the tournament bracket
export function generateBracket(players) {
  const bracketDiv = document.getElementById("bracket");
  bracketDiv.style.display = "flex"; // Show the bracket

  const round1Matches = createMatches(players);
  displayMatches(round1Matches, "round1"); // Display the first round matches
  simulateTournament(round1Matches); // Start simulating the matches
}

// Display matches in a specific round
export function displayMatches(matches, roundId) {
  const roundDiv = document.getElementById(roundId);
  roundDiv.innerHTML = ""; // Clear previous matches

  matches.forEach((match, index) => {
    const matchDiv = document.createElement("div");
    matchDiv.classList.add("match");
    matchDiv.innerHTML = `<span>Match ${index + 1}</span><span>${match[0]} vs ${
      match[1]
    }</span>`;
    roundDiv.appendChild(matchDiv);
  });
}

// Simulate the tournament matches

async function simulateTournament(matches) {
  const winners = [];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const winner = await simulateMatch(match[0], match[1]);
    if (winner) winners.push(winner); // Add the winner to the list of winners
    console.log(
      `Match ${i + 1}: ${match[0]} vs ${match[1]} - Winner: ${winner}`
    );
  }

  if (winners.length > 1) {
    console.log("Advancing to the next round with winners:", winners);
    const nextRoundMatches = createMatches(winners);
    displayMatches(nextRoundMatches, "round2"); // Display the next round
    await simulateTournament(nextRoundMatches); // Recursively simulate the next round
  } else {
    console.log(`Tournament Winner: ${winners[0]}`);
    displayWinner(winners[0]);
  }
}
// Create matches for the next round
function createMatches(players) {
  const matches = [];
  for (let i = 0; i < players.length; i += 2) {
    matches.push([players[i], players[i + 1]]);
  }
  return matches;
}

// Display the final winner
function displayWinner(winner) {
  const winnerDiv = document.getElementById("winnerDisplay");
  const canvasDiv = document.getElementById("canvasDiv");
  canvasDiv.classList.add("d-none");
  winnerDiv.classList.remove("d-none");
  winnerDiv.innerHTML = `🏆 ${winner} Wins the Tournament! 🏆`;
  document.body.appendChild(winnerDiv);
}

export { simulateTournament };
