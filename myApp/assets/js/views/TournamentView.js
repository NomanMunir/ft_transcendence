import { getState } from '../stateManager.js';

export function TournamentView() {
    const container = document.createElement('div');
    container.id = "gameTournamnet";
    container.classList.add('vh-100', 'd-flex', 'justify-content-center', 'align-items-center'); // Full height, centered content
    container.innerHTML = `
    <div class="container h-100">
        <div class="row h-100 d-flex justify-content-center align-items-center">
        <div id="tournamentBracket" class="col-md-4 d-flex justify-content-center align-items-center">
            <!-- Tournament bracket content -->
        </div>
        <div class="col-md-8 d-flex justify-content-center align-items-center">
            <canvas id="gameCanvas" height="600" width="800"></canvas>
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
    return container;
}
