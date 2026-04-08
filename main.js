/* ============================================================
   CØSMIX — main.js
   Scroll-driven polaroid exit + top nav reveal
   ============================================================ */

(function () {
  'use strict';

  const polaroid   = document.getElementById('polaroid');
  const hero       = document.getElementById('hero');
  const topNav     = document.getElementById('topNav');
  const scrollHint = document.getElementById('scrollHint');

  if (!polaroid || !hero) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    const scrollY     = window.scrollY;
    const heroHeight  = hero.offsetHeight;

    // ---- Polaroid exit ----
    // Start fading/shrinking after 8% scroll, fully gone at 45% of hero height
    const exitStart = heroHeight * 0.08;
    const exitEnd   = heroHeight * 0.45;
    const progress  = Math.min(Math.max((scrollY - exitStart) / (exitEnd - exitStart), 0), 1);

    if (progress > 0) {
      polaroid.style.opacity   = 1 - progress;
      polaroid.style.transform = `rotate(-1.5deg) translateY(${-progress * 50}px) scale(${1 - progress * 0.06})`;
      polaroid.style.animation = 'none'; // kill idle float while exiting
    } else {
      polaroid.style.opacity   = '';
      polaroid.style.transform = '';
      polaroid.style.animation = '';
    }

    // ---- Scroll hint ----
    if (scrollY > 40) {
      scrollHint && scrollHint.classList.add('is-hidden');
    } else {
      scrollHint && scrollHint.classList.remove('is-hidden');
    }

    // ---- Top nav reveal ----
    // Show once we've scrolled past the hero
    if (scrollY > heroHeight * 0.6) {
      topNav.classList.add('is-visible');
    } else {
      topNav.classList.remove('is-visible');
    }

    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update(); // initialise on load
})();
