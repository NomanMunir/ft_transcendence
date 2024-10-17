import { getState } from "../stateManager.js";

export function ProfileView() {
  const state = getState();
  
  // Container for the profile view
  const container = document.createElement("section");
  container.id = "profile-section";
  container.className = "section";

  // Profile Information Display
  container.innerHTML = `
    <div class="profile-section">
      <h2 class="mb-4 text-success">Player Profile</h2>
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="profile-label"><strong>Username:</strong></label>
          <p class="profile-data">${state.username || 'Not provided'}</p>
        </div>
        <div class="col-md-6">
          <label class="profile-label"><strong>Email:</strong></label>
          <p class="profile-data">${state.email || 'Not provided'}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="profile-label"><strong>Score:</strong></label>
          <p class="profile-data">${state.score || '0'}</p>
        </div>
        <div class="col-md-6">
          <label class="profile-label"><strong>Games Played:</strong></label>
          <p class="profile-data">${state.gamesPlayed || '0'}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="profile-label"><strong>Wins:</strong></label>
          <p class="profile-data">${state.wins || '0'}</p>
        </div>
        <div class="col-md-6">
          <label class="profile-label"><strong>Losses:</strong></label>
          <p class="profile-data">${state.losses || '0'}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-12">
          <button class="btn btn-success w-100">Back to Home</button>
        </div>
      </div>
    </div>
  `;

  // Add event listener for "Back to Menu" button
  container.querySelector("button").addEventListener("click", () => {
    window.location.hash = "#home"; // Navigate back to home or menu
  });

  return container;
}
