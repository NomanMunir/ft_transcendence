// views/PlayPage.js

export function Play() {
  const section = document.createElement("section");
  section.id = "featured-services";
  section.className = "featured-services section";

  section.innerHTML = `
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2 data-i18n="featured.title">Choose Your Game</h2>
    </div><!-- End Section Title -->

    <div class="container">
      <div class="row gy-4">
  
        <div class="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="100">
          <div class="card">
            <img src="../../assets/img/pp-select.webp" alt="" class="img-fluid" data-i18n="[alt]featured.pingPongImg">
            <div class="card-body">
              <h3><a href="#select_pong" class="stretched-link" data-i18n="featured.pingPong">Ping Pong</a></h3>
            </div>
          </div>
        </div><!-- End Card Item -->
  
        <div class="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="200">
          <div class="card">
            <img src="../../assets/img/ttt-select.webp" alt="" class="img-fluid" data-i18n="[alt]featured.tttImg">
            <div class="card-body">
              <h3><a href="#" class="stretched-link" data-i18n="featured.ticTacToe">Tic Tac Toe</a></h3>
            </div>
          </div>
        </div><!-- End Card Item -->
        
      </div>
    </div>
  `;

  return section;
}
