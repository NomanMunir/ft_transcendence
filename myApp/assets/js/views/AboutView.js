
export function AboutView()
{
	const section = document.createElement("section");
  section.id = "team";
  section.className = "team section";

  section.innerHTML = `
    <div class="container section-title aos-init aos-animate" data-aos="fade-up">
      <h2 data-i18n="ppmode.title">Team</h2>
    </div>
    
    <div class="container">
      <div class="row gy-4 d-flex justify-content-center">
        <div class="col-lg-3 col-md-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
          <div class="card">
            <img src="assets/img/team/team-2.jpg" alt="" class="img-fluid" data-i18n="[alt]ppmode.singleImg">
            <div class="card-body">
              <h3><a href="#form" class="stretched-link" data-i18n="ppmode.single">Alexandr Serebryakov</a></h3>
              <div class="card-content">
                <p data-i18n="ppmode.singleDesc">Software Developer</p>
              </div>
            </div>
          </div>
        </div>
		
        <div class="col-lg-3 col-md-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
          <div class="card">
            <img src="assets/img/team/team-3.jpg" alt="" class="img-fluid" data-i18n="[alt]ppmode.singleImg">
            <div class="card-body">
              <h3><a href="#form" class="stretched-link" data-i18n="ppmode.single">Artur Khabibrakhmanov</a></h3>
              <div class="card-content">
                <p data-i18n="ppmode.singleDesc">Data Scientist</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
          <div class="card">
            <img src="assets/img/team/team-1.png" alt="" class="img-fluid" data-i18n="[alt]ppmode.singleImg">
            <div class="card-body">
              <h3><a href="#form" class="stretched-link" data-i18n="ppmode.single">Aram Keryan</a></h3>
              <div class="card-content">
                <p data-i18n="ppmode.singleDesc">Data Scientist / Educator</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-3 col-md-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
          <div class="card">
            <img src="assets/img/team/team-4.jpg" alt="" class="img-fluid" data-i18n="[alt]ppmode.multiImg">
            <div class="card-body">
              <h3><a href="#multi_pong" class="stretched-link" data-i18n="ppmode.multi">Nauman Munir</a></h3>
              <div class="card-content">
                <p data-i18n="ppmode.multiDesc">Software Developer</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
          <div class="card">
            <img src="assets/img/team/team-5.jpg" alt="" class="img-fluid" data-i18n="[alt]ppmode.tournamentImg">
            <div class="card-body">
              <h3><a href="#form" id="eight_players" class="stretched-link" data-i18n="ppmode.tournament">Alaa Bashir</a></h3>
              <div class="card-content">
                <p data-i18n="ppmode.tournamentDesc">Mechanical Engineer</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
	return section;
}