// components/NavBar.js

export function NavBar() {
  const header = document.createElement("header");
  header.id = "header";
  header.className = "header d-flex align-items-center fixed-top";

  header.innerHTML = `
        <div class="container-fluid position-relative d-flex align-items-center justify-content-between">
            <a href="#home" class="logo d-flex align-items-center me-auto me-xl-0">
                <h1 class="sitename" data-i18n="site.name"></h1>
            </a>
            <nav id="navmenu" class="navmenu">
                <ul>
                    <li><a href="#play" class="active" data-i18n="nav.play">Play!</a></li>
                    <li><a href="#about" data-i18n="nav.about">About</a></li>
                    <li><a href="#profile" data-i18n="nav.profile">Profile</a></li>
                    <li><a href="#login" data-i18n="nav.login">Login</a></li>
                    <li><a href="#logout" data-i18n="nav.logout">Logout</a></li>
                    <li class="dropdown">
                        <a><span data-i18n="nav.language">Select Language</span> 
                        <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                            <li><a data-lang="en" data-i18n="language.english">English</a></li>
                            <li><a data-lang="ar" data-i18n="language.arabic">العربية</a></li>
                            <li><a data-lang="de" data-i18n="language.german">Deutsch</a></li>
                        </ul>
                    </li>
                </ul>
                <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
        </div>
    `;

  return header;
}