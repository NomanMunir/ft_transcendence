const state = {
  playerCount: 0, // Instead of initializing players array
  players: [],
  tournament: false,
};

export function getState() {
    return state;
}

export function updateState(newState) {
    Object.assign(state, newState);
}

export function setPlayerNames(names) {
  state.playerNames = names;
}

export function resetGameState() {
  state.playerObjects = [];
  state.ball = null;
  state.gameOver = false;
  state.gameLoopID = null;
}