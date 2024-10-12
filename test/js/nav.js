// nav.js
export function setupNavigation(links, loadContent) {
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor behavior
      const page = this.id; // Get the ID of the clicked link
      loadContent(page); // Call the content loader function
      window.history.pushState({ page }, `${page}`, `#${page}`); // Update the URL hash
    });
  });
}
