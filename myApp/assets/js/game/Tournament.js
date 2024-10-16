import { getState, resetGameState, updateState } from "../stateManager.js";
import { startPongGame } from "./PongGame.js";

function displayWinner(winner) {
    document.querySelector('#tournamentBracket').innerHTML = `
        <div id="winnerDisplay">
            <h1>🏆 ${winner} is the winner! 🏆</h1>
        </div>
    `;
    const {canvas, ctx} = getState().pongGame;
    const {width, height} = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Click to restart", width / 2, height / 2 + 50);
    canvas.addEventListener(
      "click",
      () => {
        createBracket();
      },
      { once: true }
      );
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

function markLoser(player) {
    const playerElement = document.querySelector(`#player-${player}`);
    if (playerElement) {
      playerElement.style.textDecoration = 'line-through';
      playerElement.style.textDecorationColor = 'red';
    }
  }

  function drawBrackets(players) {
    let roundName;

    // Determine the current round based on the number of players left
    if (players.length === 8) {
        roundName = 'Quarter-finals';
    } else if (players.length === 4) {
        roundName = 'Semi-finals';
    } else if (players.length === 2) {
        roundName = 'Final';
    }

    // Begin rendering the brackets
    let html = `<div class="round bracket"><h3>${roundName}</h3>`;

    // Loop through players and create match brackets
    players.forEach((player, index) => {
        if (index % 2 === 0) {
            html += `<div class="match"><h3>Match ${Math.ceil((index + 1) / 2)}</h3>`;
        }
        html += `<p class="player" id="player-${player}">${player}</p>`;
        if (index % 2 !== 0) {
            html += `</div>`;  // Close match div after 2 players
        }
    });

    html += '</div>';

    // Inject the HTML into the tournament bracket container
    document.querySelector('#tournamentBracket').innerHTML = html;
}


export async function createBracket()
{
    const { players } = getState();
    resetGameState();
    updateState({pongGame:{tournament: true}});
    const cnv = document.querySelector('#gameCanvas');
    if (!players || players.length !== 8) {
      window.location.hash = '#select_pong';
      return;
    }
  
    // Shuffle players to randomize matchups
    const shuffledPlayers = shuffle([...players]);
  
    // Keep progressing until we have a final winner
    while (shuffledPlayers.length > 1) {
      // Display the current bracket before each round
      drawBrackets(shuffledPlayers);
        console.log(shuffledPlayers)
      for (let i = 0; i < shuffledPlayers.length; i++)
      {
        // if (shuffledPlayers.length === 2)
        
        const winner = await startPongGame([shuffledPlayers[i], shuffledPlayers[i + 1]], cnv);
  
        // Remove the loser from the array, keep the winner for the next round
        if (winner === shuffledPlayers[i]) {
          markLoser(shuffledPlayers[i + 1]);  // Update the UI to show loser
          shuffledPlayers.splice(i + 1, 1);   // Remove loser
        } else {
          markLoser(shuffledPlayers[i]);      // Update the UI to show loser
          shuffledPlayers.splice(i, 1);       // Remove loser
        }
      }
    }
    
    // After all rounds, the remaining player is the champion
    displayWinner(shuffledPlayers[0]);
  }
