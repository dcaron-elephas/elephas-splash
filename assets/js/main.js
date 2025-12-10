/**
* Template Name: eNno
* Template URL: https://bootstrapmade.com/enno-free-simple-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) { mobileNavToggleBtn.addEventListener('click', mobileNavToogle); }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    if (navmenu) navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    if (navmenu) navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      if (filters) filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Progressive enhancement: AJAX submit to Formspree
(function(){
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if(!form) return;
  if (form) form.addEventListener('submit', async function(e){
    e.preventDefault();
    var hp = form.querySelector('#website'); if (hp && hp.value) return;
    var btn = form.querySelector('button[type="submit"]');
    var original = btn.textContent; btn.disabled = true; btn.textContent = 'Sending…';
    status.className = 'status'; status.textContent = '';
    try{
      var res = await fetch(form.action, { method:'POST', headers:{'Accept':'application/json'}, body:new FormData(form) });
      if(res.ok){ form.reset(); status.classList.add('ok'); status.textContent = 'Thanks! We\'ll be in touch shortly.'; }
      else{
        var msg = 'Oops—something went wrong. Please try again.';
        try{ var out = await res.json(); if(out && out.errors){ msg = out.errors.map(function(e){return e.message}).join(', '); } }catch(_){}
        status.classList.add('err'); status.textContent = msg;
      }
    }catch(_){ status.classList.add('err'); status.textContent = 'Network error—please try again.'; }
    finally{ btn.disabled = false; btn.textContent = original; }
  });
})();
  /**
   * Form redirect
   */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Use built-in validation even though form has novalidate
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (statusEl) {
      statusEl.textContent = 'Sending...';
      statusEl.classList.remove('ok', 'err');
    }

    fetch(form.action, {
      method: form.method,
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
    .then(function (response) {
      if (response.ok) {
        // Optional: brief visual success state
        if (statusEl) {
          statusEl.textContent = 'Message sent, redirecting...';
          statusEl.classList.add('ok');
        }
        gtag_report_conversion();
        window.location.href = '/thank-you.html';
      } else {
        return response.json().catch(function () { return {}; }).then(function (data) {
          let message = 'There was a problem submitting the form. Please try again.';
          if (data.errors && data.errors.length) {
            message = data.errors.map(function (err) { return err.message; }).join(', ');
          }
          if (statusEl) {
            statusEl.textContent = message;
            statusEl.classList.add('err');
          } else {
            alert(message);
          }
        });
      }
    })
    .catch(function () {
      if (statusEl) {
        statusEl.textContent = 'Network error. Please try again.';
        statusEl.classList.add('err');
      } else {
        alert('Network error. Please try again.');
      }
    });
  });
});
