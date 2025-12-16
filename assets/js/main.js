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
   * Mobile nav: init once elements exist
   */
  let mobileNavInitialized = false;

  function initMobileNavWhenReady() {
    if (mobileNavInitialized) return;

    const body = document.querySelector('body');
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    if (!body || !mobileNavToggleBtn) {
      // Header not injected yet – try again shortly
      setTimeout(initMobileNavWhenReady, 100);
      return;
    }

    mobileNavInitialized = true;

    function mobileNavToogle() {
      body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }

    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (body.classList.contains('mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');

        const dropdown = this.parentNode.nextElementSibling;
        if (dropdown) {
          dropdown.classList.toggle('dropdown-active');
        }

        e.stopImmediatePropagation();
      });
    });
  }

  // Start polling as soon as main.js loads
  initMobileNavWhenReady();

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

// Contact form: AJAX submit + redirect + optional Google Ads conversion
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('form-status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Honeypot spam trap
    const hp = form.querySelector('#website');
    if (hp && hp.value) {
      // Bot – silently bail
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn ? btn.textContent : '';

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending…';
    }

    if (statusEl) {
      statusEl.className = 'status';
      statusEl.textContent = '';
    }

    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (response) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText || 'Send Message';
        }

        if (response.ok) {
          if (statusEl) {
            statusEl.textContent = 'Message sent, redirecting...';
            statusEl.classList.add('ok');
          }

          // If Google Ads helper exists, let it handle conversion + optional redirect
          try {
            if (typeof gtag_report_conversion === 'function') {
              // Pass thank-you URL if your gtag_report_conversion is written that way
              gtag_report_conversion('/thank-you.html');
              return;
            }
          } catch (e) {
            // Ignore and fall back to normal redirect
          }

          // Normal redirect to thank-you page
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
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText || 'Send Message';
        }
        if (statusEl) {
          statusEl.textContent = 'Network error. Please try again.';
          statusEl.classList.add('err');
        } else {
          alert('Network error. Please try again.');
        }
      });
  });
});
