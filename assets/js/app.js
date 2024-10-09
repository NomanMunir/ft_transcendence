const routes = {
  '*': 
  {
    view: './views/home.html',
    script: []
  },
  404:
  {
    view: './views/404.html',
    script: []
  }, 
  '#':
  {
    view: './views/home.html',
    script: []
  },
  '#home':
  {
    view: './views/home.html',
    script: []
  },
  '#play':
  {
    view: './views/play.html',
    script: []
  },
  '#select_pong':
  {
    view: './views/select_pong.html',
    script: []
  },
  '#single_pong':
  {
    view: './views/single_pong.html',
    script: []
  },
  '#multi_pong':
  {
    view: './views/multi_pong.html',
    script: []
  },
  '#tournament_pong':
  {
    view: './views/tournament_pong.html',
    script: []
  },
  '#form':
  {
    view: './views/form.html',
    script: [ './assets/js/form.js']
  },
  '#form2':
  {
    view: './views/form.html',
    script: [ './assets/js/form.js']
  },
  '#form3':
  {
    view: './views/form.html',
    script: [ './assets/js/form.js']
  },
  '#form4':
  {
    view: './views/form.html',
    script: [ './assets/js/form.js']
  },
  '#form8':
  {
    view: './views/form.html',
    script: [ './assets/js/form.js']
  },
  '#game':
  {
    view: './views/game.html',
    script: [ './assets/js/game/game.js']
  },
  '#gameTournament':
  {
    view: './views/gameTournament.html',
    script: [ './assets/js/game/gameTournament.js'],
    css: [ './assets/css/gameTournament.css']
  },
};

const handleLocation = async () =>
{
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

    if(route.css)
    {
      route.css.forEach(async (css) => {
        const link = document.querySelector(`link[href="${css}"]`)
        if (link)
        document.head.removeChild(link);
        console.log(`Loading ${css}`);
        const cssTag = document.createElement('link');
        cssTag.rel = 'stylesheet';
        cssTag.href = css;
        document.head.appendChild(cssTag);
      })
    }
    if (route.script)
    {

      route.script.forEach(async (script) => {
        const scp = document.querySelector(`script[src="${script}"]`)
        if (scp)
        document.body.removeChild(scp);
        console.log(`Loading ${script}`);
        const scriptTag = document.createElement('script');
        scriptTag.src = script;
        document.body.appendChild(scriptTag);   
      })
    }
    initNavBar();
    const savedLanguage = localStorage.getItem('language') || 'en';
    handleLanguageChange(savedLanguage);
  };

window.addEventListener('hashchange', handleLocation);
window.addEventListener('load', (event) => {
    handleLocation();
});
