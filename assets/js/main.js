"use strict";
/**
 * Mobile nav toggle
 */
function initNavBar()
{
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  if (mobileNavToggleBtn)
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  function mobileNavToogle() {
    console.log("mobileNavToggleBtn clicked");
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });



  const plyForm = document.querySelector('#playerForm');
  if (plyForm)
  {
    plyForm.addEventListener('submit', async (e) => {
      console.log("playerForm submitted");
      e.preventDefault();
      const players = [];
      const formData = new FormData(plyForm);
      formData.forEach((value, key) => {
        players.push(value);
        console.log(value);
      });
      localStorage.setItem('players', JSON.stringify(players));
      if (window.location.hash === '#form8')
      {
        window.location.hash = '#gameTournament';
        localStorage.setItem('tournament', 'true');
      }
      else
      {
        window.location.hash = '#game';
        localStorage.setItem('tournament', 'false');
      }
    });
  }  
}

  /**
   * Preloader
   */
  // const preloader = document.querySelector('#preloader');
  // if (preloader) {
  //   window.addEventListener('load', () => {
  //     preloader.remove();
  //   });
  // }

  /**
   * Scroll top button
   */
  // let scrollTop = document.querySelector('.scroll-top');

  // function toggleScrollTop() {
  //   if (scrollTop) {
  //     window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  //   }
  // }
  // scrollTop.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // });

  // window.addEventListener('load', toggleScrollTop);
  // document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  // function aosInit() {
  //   AOS.init({
  //     duration: 600,
  //     easing: 'ease-in-out',
  //     once: true,
  //     mirror: false
  //   });
  // }
  // window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  // function initSwiper() {
  //   document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
  //     let config = JSON.parse(
  //       swiperElement.querySelector(".swiper-config").innerHTML.trim()
  //     );

  //     if (swiperElement.classList.contains("swiper-tab")) {
  //       initSwiperWithCustomPagination(swiperElement, config);
  //     } else {
  //       new Swiper(swiperElement, config);
  //     }
  //   });
  // }

  // window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  // const glightbox = GLightbox({
  //   selector: '.glightbox'
  // });

  /**
   * Init isotope layout and filters
   */
  // document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
  //   let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
  //   let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
  //   let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

  //   let initIsotope;
  //   imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
  //     initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
  //       itemSelector: '.isotope-item',
  //       layoutMode: layout,
  //       filter: filter,
  //       sortBy: sort
  //     });
  //   });

  //   isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
  //     filters.addEventListener('click', function() {
  //       isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
  //       this.classList.add('filter-active');
  //       initIsotope.arrange({
  //         filter: this.getAttribute('data-filter')
  //       });
  //       if (typeof aosInit === 'function') {
  //         aosInit();
  //       }
  //     }, false);
  //   });

  // });

  /**
   * Frequently Asked Questions Toggle
   */
  // document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
  //   faqItem.addEventListener('click', () => {
  //     faqItem.parentNode.classList.toggle('faq-active');
  //   });
  // });

  // /**
  //  * Correct scrolling position upon page load for URLs containing hash links.
  //  */
  // window.addEventListener('load', function(e) {
  //   if (window.location.hash) {
  //     if (document.querySelector(window.location.hash)) {
  //       setTimeout(() => {
  //         let section = document.querySelector(window.location.hash);
  //         let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
  //         window.scrollTo({
  //           top: section.offsetTop - parseInt(scrollMarginTop),
  //           behavior: 'smooth'
  //         });
  //       }, 100);
  //     }
  //   }
  // });

  /**
   * Navmenu Scrollspy
   */
  // let navmenulinks = document.querySelectorAll('.navmenu a');

  // function navmenuScrollspy() {
  //   navmenulinks.forEach(navmenulink => {
  //     if (!navmenulink.hash) return;
  //     let section = document.querySelector(navmenulink.hash);
  //     if (!section) return;
  //     let position = window.scrollY + 200;
  //     if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
  //       document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
  //       navmenulink.classList.add('active');
  //     } else {
  //       navmenulink.classList.remove('active');
  //     }
  //   })
  // }
  // window.addEventListener('load', navmenuScrollspy);
  // document.addEventListener('scroll', navmenuScrollspy);
// }