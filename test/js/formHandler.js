// Function to set up form logic
export function setupForm() {
  const form = document.getElementById("peopleForm");
  const nameFieldsDiv = document.getElementById("nameFields");
  const nameInputsDiv = document.getElementById("nameInputs");
  const submitNamesButton = document.getElementById("submitNames");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const numPeople = document.getElementById("numPeople").value;
    nameFieldsDiv.innerHTML = ""; // Clear any previous name fields
    nameInputsDiv.style.display = "block"; // Show the name input section

    // Create input fields for each name
    for (let i = 0; i < numPeople; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = `Enter name ${i + 1}`;
      input.classList.add("personName");
      nameFieldsDiv.appendChild(input);
    }
  });

  submitNamesButton.addEventListener("click", function () {
    const nameInputs = document.querySelectorAll(".personName");
    const names = Array.from(nameInputs).map((input) => input.value);
    console.log("Names:", names);
  });
}
