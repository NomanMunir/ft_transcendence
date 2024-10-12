import { NavBar } from '../components/NavBar.js';
import { createBracket } from '../modules/tournament.js';
import { getState } from '../stateManager.js';

export function Tournament() {
    const container = document.createElement('div');
    container.className = 'container mt-5';

    const nav = NavBar();
    container.appendChild(nav);

    const { players } = getState();
    if (!players || players.length !== 8) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger';
        alertDiv.textContent = 'Exactly 8 players are required for the tournament.';
        container.appendChild(alertDiv);
        return container;
    }

    const tournamentDiv = document.createElement('div');
    tournamentDiv.className = 'row mt-5';
    tournamentDiv.id = 'tournamentBracket';

    container.appendChild(tournamentDiv);
    createBracket(players);

    return container;
}
