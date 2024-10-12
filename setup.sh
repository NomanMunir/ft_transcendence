#!/bin/bash

# Create project directories
mkdir -p myApp/{components,modules,views,assets/css,assets/js,assets/js/language}

# Create base HTML file
cat <<EOT > myApp/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modular Game App</title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
</head>
<body>
    <div id="app"></div>
    <script type="module" src="assets/js/main.js"></script>
</body>
</html>
EOT

# Create the main JavaScript file
cat <<EOT > myApp/assets/js/main.js
import { handleLocation } from '../routes.js';
import { initNavBar } from '../components/NavBar.js';

window.addEventListener('hashchange', handleLocation);
window.addEventListener('load', handleLocation);
EOT

# Create the routing file
cat <<EOT > myApp/routes.js
import { HomePage } from './views/homePage.js';
import { PlayPage } from './views/playPage.js';
import { FormPage } from './views/formPage.js';
import { TournamentPage } from './views/tournamentPage.js';

const routes = {
    '#home': HomePage,
    '#play': PlayPage,
    '#form': FormPage,
    '#tournament': TournamentPage,
};

export function handleLocation() {
    const path = window.location.hash || '#home';
    const app = document.getElementById('app');
    app.innerHTML = '';  // Clear existing content
    const renderView = routes[path] || HomePage;
    app.appendChild(renderView());
}
EOT

# Create NavBar component
cat <<EOT > myApp/components/NavBar.js
export function NavBar() {
    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg navbar-light bg-light';
    
    nav.innerHTML = \`
        <a class="navbar-brand" href="#">GameApp</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="#play">Play</a></li>
                <li class="nav-item"><a class="nav-link" href="#form">Form</a></li>
                <li class="nav-item"><a class="nav-link" href="#tournament">Tournament</a></li>
            </ul>
        </div>
    \`;
    
    return nav;
}
EOT

# Create Form component
cat <<EOT > myApp/components/Form.js
export function Form(playerCount) {
    const form = document.createElement('form');
    form.id = 'playerForm';
    form.className = 'needs-validation';
    form.noValidate = true;

    for (let i = 1; i <= playerCount; i++) {
        const div = document.createElement('div');
        div.className = 'mb-3';

        const label = document.createElement('label');
        label.htmlFor = \`player\${i}\`;
        label.className = 'form-label';
        label.textContent = \`Player \${i}\`;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.id = \`player\${i}\`;
        input.placeholder = \`Enter name of player \${i}\`;
        input.required = true;

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    }

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn-primary';
    submitBtn.textContent = 'Submit';

    form.appendChild(submitBtn);

    return form;
}
EOT

# Create HomePage view
cat <<EOT > myApp/views/homePage.js
import { NavBar } from '../components/NavBar.js';

export function HomePage() {
    const container = document.createElement('div');
    container.className = 'container mt-5';

    const nav = NavBar();
    container.appendChild(nav);

    const heading = document.createElement('h1');
    heading.textContent = 'Welcome to the Game App!';
    container.appendChild(heading);

    return container;
}
EOT

# Create PlayPage view
cat <<EOT > myApp/views/playPage.js
import { NavBar } from '../components/NavBar.js';
import { startPongGame } from '../modules/game.js';
import { getState } from '../stateManager.js';

export function PlayPage() {
    const container = document.createElement('div');
    container.className = 'container mt-5';

    const nav = NavBar();
    container.appendChild(nav);

    const { players } = getState();
    if (!players || players.length === 0) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-warning';
        alertDiv.textContent = 'No players available. Please fill the form first.';
        container.appendChild(alertDiv);
        return container;
    }

    // Create game canvas for the Pong Game
    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'row justify-content-center mt-5';

    const canvas = document.createElement('canvas');
    canvas.id = 'gameCanvas';
    canvas.width = 800;
    canvas.height = 400;
    canvas.className = 'border border-dark';

    canvasContainer.appendChild(canvas);
    container.appendChild(canvasContainer);

    // Start the game
    startPongGame(players);

    return container;
}
EOT

# Create FormPage view
cat <<EOT > myApp/views/formPage.js
import { Form } from '../components/Form.js';
import { updateState } from '../stateManager.js';

export function FormPage() {
    const container = document.createElement('div');
    container.className = 'container mt-5';

    const form = Form(4);  // Assuming 4 players for example

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const players = [];
        for (let i = 1; i <= 4; i++) {
            players.push(document.getElementById(\`player\${i}\`).value);
        }
        updateState({ players });
        window.location.hash = '#play';
    });

    container.appendChild(form);
    return container;
}
EOT

# Create TournamentPage view
cat <<EOT > myApp/views/tournamentPage.js
import { NavBar } from '../components/NavBar.js';
import { createBracket } from '../modules/tournament.js';
import { getState } from '../stateManager.js';

export function TournamentPage() {
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
EOT

# Create state manager
cat <<EOT > myApp/stateManager.js
const state = {
    players: [],
    tournament: null,
};

export function getState() {
    return state;
}

export function updateState(newState) {
    Object.assign(state, newState);
}
EOT

# Create modules directory for game logic
cat <<EOT > myApp/modules/game.js
export function startPongGame(playerNames) {
    // Implement game logic here
    console.log('Starting Pong game with players:', playerNames);
}
EOT

cat <<EOT > myApp/modules/tournament.js
export function createBracket(players) {
    // Tournament logic to create brackets
    console.log('Creating tournament with players:', players);
}
EOT

# Done
echo "Project structure and files created successfully!"
