import { genNavBar } from "./navbar.js";

export function genHomePage()
{
	return `
    ${genNavBar()}
    <!-- Hero Section -->
    <section id="home" class="hero section dark-background">

      <div class="container text-center">
        <div class="row justify-content-center" data-aos="zoom-out">
          <div class="col-lg-8">
            <img src="../../assets/img/logo.webp" width = "400px" alt="" class="img-fluid mb-3">
            <h2>Ready, Set, Game On!</h2>
            <p>Step into a world of endless excitement and epic challenges! </p>
            <a href="#play" class="btn-get-started">Play!</a>
          </div>
        </div>
      </div>

    </section><!-- /Hero Section -->
	`
}