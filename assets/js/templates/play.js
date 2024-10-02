import { genNavBar } from "./navbar.js"

export function genPlayPage()
{
	return `
	${genNavBar()}
	<section id="featured-services" class="featured-services section">

      <!-- Section Title -->
      <div class="container section-title aos-init aos-animate" data-aos="fade-up">
        <h2>Choose Your Game</h2>
		</div><!-- End Section Title -->
		
		<div class="container">
        <div class="row gy-4">

          <div class="col-lg-6 col-md-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <div class="card">
              <img src="../../assets/img/ping-pong-select.webp" alt="" class="img-fluid">
              <div class="card-body">
                <h3><a href="#" class="stretched-link">Ping Pong</a></h3>
              </div>
            </div>
          </div><!-- End Card Item -->

          <div class="col-lg-6 col-md-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
            <div class="card">
              <img src="../../assets/img/ttt-select.webp" alt="" class="img-fluid">
              <div class="card-body">
                <h3><a href="#" class="stretched-link">Tic Tac Toe</a></h3>
              </div>
            </div>
          </div><!-- End Card Item -->
        </div>

      </div>
    </section><!-- End Featured Services Section -->
	`
}