const routes = {
  '*': 
  {
    view: './views/home.html',
    script: ['./assets/js/main.js']
  },
  404:
  {
    view: './views/404.html',
    script: []
  }, 
  '#':
  {
    view: './views/home.html',
    script: ['./assets/js/main.js']
  },
  '#home':
  {
    view: './views/home.html',
    script: ['./assets/js/main.js']
  },
  '#play':
  {
    view: './views/play.html',
    script: ['./assets/js/main.js']
  },
  '#select_pong':
  {
    view: './views/select_pong.html',
    script: ['./assets/js/main.js']
  },
  '#single_pong':
  {
    view: './views/single_pong.html',
    script: ['./assets/js/main.js']
  },
  '#multi_pong':
  {
    view: './views/multi_pong.html',
    script: ['./assets/js/main.js']
  },
  '#tournament_pong':
  {
    view: './views/tournament_pong.html',
    script: ['./assets/js/main.js']
  },
  '#form':
  {
    view: './views/form.html',
    script: ['./assets/js/main.js', './assets/js/form.js']
  },
  '#form2':
  {
    view: './views/form.html',
    script: ['./assets/js/main.js', './assets/js/form.js']
  },
};

const handleLocation = async () => {
    let path = window.location.hash || '#';
    const questionMarkIndex = path.indexOf('?');
    if (questionMarkIndex !== -1)
      path = path.slice(0, questionMarkIndex);
    const route = routes[path] || routes[404];
    console.log(`Loading ${route.view} for ${path}`);
    const response = await fetch(route.view)
    const html = await response.text();
    const appElement = document.getElementById('app');
    appElement.innerHTML = html;

    route.script.forEach(async (script) => {
      if (!document.querySelector(`script[src="${script}"]`))
      {
        console.log(`Loading ${script}`);
        const scriptTag = document.createElement('script');
        scriptTag.src = script;
        document.body.appendChild(scriptTag);
        scriptTag.onload = () => {
         initializeMain();
          console.log(`${script} loaded`);
        }
      }
      else
        initializeMain();
    })
    // if (!document.querySelector(`script[src="./assets/js/main.js"]`))
    // {
    //   console.log("Loading main.js");
    //   const scriptTag = document.createElement('script');
    //   scriptTag.src = "./assets/js/main.js";
    //   document.body.appendChild(scriptTag);
    //   scriptTag.onload = () => {
    //     console.log("main.js loaded");
    //     initializeMain();
    //   }
    // }
    // else
    //   initializeMain();
};

window.addEventListener('hashchange', handleLocation);
window.addEventListener('load', handleLocation);
