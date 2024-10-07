document.addEventListener("click", (e) => {
    const { target } = e;
    console.log(e.x, e.y);
    if (!target.matches("nav a")) return;
    e.preventDefault();
    urlRoute();
});

const urlRoutes = {
    404: "./templates/404.html",
    "#": "./templates/index.html",
    "#about": "./templates/about.html"
};

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    const href = event.target.getAttribute('href');
    window.location.hash = href;
    urlLocationHandler();
};

const urlLocationHandler = async () => {
    const location = window.location.hash || "#";
    console.log(location);
    const route = urlRoutes[location] || urlRoutes[404];
    const response = await fetch(route);
    const html = await response.text();
    document.querySelector("#app").innerHTML = html;
};

window.addEventListener('hashchange', urlLocationHandler); // Handle hash changes
window.route = urlRoute;

urlLocationHandler(); // Initial call
