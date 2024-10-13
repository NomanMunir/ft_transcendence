
function displayWinner(winner) {
    document.querySelector('#tournamentBracket').innerHTML = `
        <div id="winnerDisplay">
            <h1>🏆 ${winner} is the winner! 🏆</h1>
        </div>
    `;
}

async function  createBracket() {
    // Retrieve players from localStorage and parse it
    const players = JSON.parse(localStorage.getItem('players'));
    // Check if we have exactly 8 players
    if (!players || players.length !== 8) {
        window.location.hash = '#form8';
        return;
    }

    // Function to shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    // Shuffle the players to randomize matchups
    const shuffledPlayers = shuffle([...players]);

    // Create the first round brackets by pairing players
    const brackets = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) 
    {
        brackets.push(shuffledPlayers[i]);
        brackets.push(shuffledPlayers[i + 1]);
    }

    // Store the brackets in localStorage or return it
    localStorage.setItem('brackets', JSON.stringify(brackets));

    console.log(brackets); // For debugging, log the generated bracket
    drawBrackets(brackets);
    localStorage.removeItem('players');
    console.log(localStorage.getItem('players'));

    let i = 0;
    while (brackets.length > 1) 
    {
        console.log(brackets[i] + " vs " + brackets[i + 1]);
        localStorage.setItem('players', JSON.stringify([brackets[i], brackets[i + 1]]));
        const winner = await startPongGame();
        let element
        if (winner == brackets[i])
        {
            if (brackets.length > 4)
                element = document.getElementById(brackets[i + 1]);
            else if (brackets.length == 4)
                element = document.querySelector('#semi-final-1').querySelector(`#${brackets[i + 1]}`);
            else if (brackets.length == 3)
                element = document.querySelector('#semi-final-2').querySelector(`#${brackets[i + 1]}`);
            else if (brackets.length == 2)
                element = document.querySelector('#final').querySelector(`#${brackets[i + 1]}`);
            element.style.textDecoration = 'line-through';
            element.style.textDecorationColor = 'red';
            brackets.splice(i + 1, 1);
        }
        else
        {
            if (brackets.length > 4)
                element = document.getElementById(brackets[i]);
            else if (brackets.length == 4)
                element = document.querySelector('#semi-final-1').querySelector(`#${brackets[i]}`);
            else if (brackets.length == 3)
                element = document.querySelector('#semi-final-2').querySelector(`#${brackets[i]}`);
            else if (brackets.length == 2)
                element = document.querySelector('#final').querySelector(`#${brackets[i]}`);
            element.style.textDecoration = 'line-through';
            element.style.textDecorationColor = 'red';
            brackets.splice(i, 1);
        }
        console.log(brackets);
        console.log(winner);
        if (brackets.length == 4)
        {
            document.getElementById('semi-final-1').innerHTML += `
                <p class="player" id = "${brackets[0]}">${brackets[0]}</p>
                <p class="player" id = "${brackets[1]}">${brackets[1]}</p>
            `;
            document.getElementById('semi-final-2').innerHTML += `
                <p class="player" id = "${brackets[2]}">${brackets[2]}</p>
                <p class="player" id = "${brackets[3]}">${brackets[3]}</p>
            `;
            i = 0;
        }
        else if(brackets.length == 2)
        {
            document.getElementById('final').innerHTML += `
                <p class="player" id = "${brackets[0]}">${brackets[0]}</p>
                <p class="player" id = "${brackets[1]}">${brackets[1]}</p>
            `;
            i = 0;
        }
        else
            i++;
    }
    console.log(brackets);
    displayWinner(brackets[0]);
}

function drawBrackets(brackets) {
    let html = '<div class="round first-round-bracket">'; //
    for (let index = 0; index < brackets.length; index += 2) {
        html += `
            <div class="bracket">
                <h3>Match ${Math.ceil((index + 1) / 2)}</h3>
                <p class="player" id="${brackets[index]}">${brackets[index]}</p>
                <p class="player" id="${brackets[index + 1]}">${brackets[index + 1]}</p>
            </div>
        `;
    }
    html += '</div>';
        html += `<div class="round semi-final-bracket"> <!-- Semi-final round -->
            <div class="bracket" id="semi-final-1">
                <h3>Semi-final</h3>
            </div>
            <div class="bracket" id="semi-final-2">
                <h3>Semi-final</h3>
            </div>
        </div>
        <div class="round final-bracket"> <!-- Final round -->
            <div class="bracket" id="final">
                <h3>Final</h3>
            </div>
        </div>
    `;

    document.querySelector('#tournamentBracket').innerHTML = html;
}
createBracket();
