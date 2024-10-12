export function NotFound() {
  const container = document.createElement("div");
  container.style.textAlign = "center";
  container.style.backgroundColor = "#ff69b4"; // Bright pink
  container.style.color = "lime";
  container.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
  container.style.padding = "50px";

  container.innerHTML = `
    <h1 style="font-size: 100px; text-shadow: 5px 5px yellow;" data-i18n="404.title">404</h1>
    <p style="font-size: 30px; font-weight: bold; background-color: black; padding: 20px;" data-i18n="404.message">
      Oops! You broke the internet!
    </p>
    <a href="#" style="color: white; font-size: 25px; text-decoration: underline;" data-i18n="404.link">
      Go back to safety!
    </a>
  `;

  return container;
}
