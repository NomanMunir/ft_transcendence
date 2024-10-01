function genNavBar() {
  return `
  <header id="header" class="header d-flex align-items-center fixed-top">
  <div class="container-fluid position-relative d-flex align-items-center justify-content-between">

    <a href="#hero" class="logo d-flex align-items-center me-auto me-xl-0">
      <!-- Uncomment the line below if you also wish to use an image logo -->
      <!-- <img src="assets/img/logo.png" alt=""> -->
      <h1 class="sitename">42 Pong</h1>
    </a>

    <nav id="navmenu" class="navmenu">
      <ul>
        <li><a href="#hero" class="active">Play!</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Profile</a></li>
        <li><a href="#login">Login</a></li>
        <li><a href="#login">Logout</a></li>
        <li class="dropdown"><a href="#"><span>Select Language</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
          <ul>
            <li><a href="#">English</a></li>
            <li><a href="#">العربية</a></li>
            <li><a href="#">Deutsch</a></li>
            <li><a href="#">Türkçe</a></li>
          </ul>
        </li>
      </ul>
      <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
    </nav>
  </div>
</header>
  `;
}
