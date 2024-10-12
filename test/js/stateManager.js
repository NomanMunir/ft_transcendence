// stateManager.js

// The global state object
const state = {
  names: [], // Initial state, can hold more properties later
};

// Getter function to access state
export const getState = () => {
  return state;
};

// Function to update the state
export const updateState = (newState) => {
  Object.assign(state, newState);
};
