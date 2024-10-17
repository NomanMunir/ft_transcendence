import { getState } from '../stateManager.js';
import { resizeCanvas } from './GameView.js';

export function TournamentView() {
    const container = document.createElement('div');
    container.id = "gameTournamnet";
    container.innerHTML = `
    <div class="container h-100">
        <div class="row h-100 d-flex justify-content-center align-items-center">
        <div id="tournamentBracket" class="col-md-4 d-flex justify-content-center align-items-center">
            <!-- Tournament bracket content -->
        </div>
        <div class="col-md-8 d-flex justify-content-center align-items-center">
            <canvas id="gameCanvas"></canvas>
        </div>
        </div>
    </div>
    `;
    const { players } = getState();
    if (!players || players.length !== 8)
    {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger';
        alertDiv.textContent = 'Exactly 8 players are required for the tournament.';
        container.appendChild(alertDiv);
        return container;
    }
    window.addEventListener("resize", resizeTournamentCanvas);
    return container;
}

export function resizeTournamentCanvas(canvas) {
    const aspectRatio = 4 / 3; // Or any aspect ratio you prefer
    let canvasWidth = window.innerWidth * 0.6; // 80% of window width
    let canvasHeight = canvasWidth / aspectRatio;
    console.log(canvasWidth, canvasHeight);
  
    if (canvasHeight > window.innerHeight * 0.6) { // Ensure it fits on the screen
      canvasHeight = window.innerHeight * 0.6;
      canvasWidth = canvasHeight * aspectRatio;
    }
  
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    console.log(canvas.width, canvas.height);
  }