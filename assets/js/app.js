import { genHomePage } from "./templates/home.js";
import { genPlayPage } from "./templates/play.js";

const routes = {
    '*': '/views/home.html',
    404: '/views/404.html',
    '#': '/views/home.html',
    '#home': '/views/home.html',
    '#login': '/views/login.html',
    '#register': '/views/register.html',
    '#play!': '/views/selectgame.html',
    '#profile': '/views/profile.html',
  };

  const mainContent = document.querySelector('#app');
// document.addEventListener('DOMContentLoaded', function () {
//     mainContent.innerHTML = genNavBar();
    //  += genHomePage();

// });

// Handle navigation and routing
const handleLocation = async () => {
    let path = window.location.hash || '#';
    const questionMarkIndex = path.indexOf('?');
    if (questionMarkIndex !== -1)
      path = path.slice(0, questionMarkIndex);
    // const route = routes[path] || routes[404];  // Fallback to 404 if route not found
    // const html = await fetch(route).then((data) => data.text());
    // document.getElementById('app').innerHTML = html;  // Load the HTML into the app div
    
    // Call specific functions based on the route
switch (path)
{
  case '#play':
    mainContent.innerHTML = genPlayPage();
      break;
  case '#':
      mainContent.innerHTML = genHomePage();
      break;
  case '#home':
      mainContent.innerHTML = genHomePage();
      break;
  default:
      console.log("No function for this route.");
      break;
  }
};

window.addEventListener('hashchange', handleLocation);
window.addEventListener('load', handleLocation);