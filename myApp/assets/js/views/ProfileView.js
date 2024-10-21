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
      <h2 class="mb-4 text-success" data-i18n="profile.title">${localStorage.getItem("username") ? localStorage.getItem("username").toUpperCase() + "'s" : 'Player'} Profile</h2>
      <div class="row mb-3">
        <div class="col">
          <label class="profile-label"><strong data-i18n="profile.usernameLabel">Username:</strong></label>
          <p class="profile-data">${localStorage.getItem("username") || 'Not provided'}</p>
        </div>
        <div class="col">
          <label class="profile-label"><strong data-i18n="profile.emailLabel">Email:</strong></label>
          <p class="profile-data">${localStorage.getItem("email") || 'Not provided'}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label class="profile-label"><strong data-i18n="profile.scoreLabel">Score:</strong></label>
          <p class="profile-data">${state.score || '0'}</p>
        </div>
        <div class="col">
          <label class="profile-label"><strong data-i18n="profile.gamesPlayedLabel">Games Played:</strong></label>
          <p class="profile-data">${state.gamesPlayed || '0'}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label class="profile-label"><strong data-i18n="profile.winsLabel">Wins:</strong></label>
          <p class="profile-data">${state.wins || '0'}</p>
        </div>
        <div class="col">
          <label class="profile-label"><strong data-i18n="profile.lossesLabel">Losses:</strong></label>
          <p class="profile-data">${state.losses || '0'}</p>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-12">
          <button class="btn btn-success w-100" data-i18n="profile.backButton">Back to Home</button>
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
