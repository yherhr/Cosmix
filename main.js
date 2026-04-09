/* ============================================================
   CØSMIX — main.js
   ──────────────────────────────────────────────────────────
   1. Polaroid: enters once, then stays perfectly still.
      Fades out on scroll, no float/bounce ever.
   2. Sections: revealed via IntersectionObserver as they
      enter the viewport — the birds-eye hallway walk effect.
   3. Top nav: slides in after passing the hero.
   ============================================================ */

(function () {
  'use strict';

  /* ── Elements ─────────────────────────────────────────── */
  const polaroid   = document.getElementById('polaroid');
  const hero       = document.getElementById('hero');
  const topNav     = document.getElementById('topNav');
  const scrollHint = document.getElementById('scrollHint');
  const sections   = document.querySelectorAll('.section');

  if (!polaroid || !hero) return;

  /* ── 1. Lock polaroid still after entrance animation ──── */
  polaroid.addEventListener('animationend', function lockStill() {
    polaroid.style.animation  = 'none';
    polaroid.style.transform  = 'rotate(-1.5deg)';
    polaroid.style.opacity    = '1';
    polaroid.removeEventListener('animationend', lockStill);
  }, { once: true });

  /* ── 2. Scroll handler: polaroid exit + top nav ───────── */
  let ticking = false;

  function onScroll() {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }

  function update() {
    const scrollY    = window.scrollY;
    const heroHeight = hero.offsetHeight;

    /* Polaroid fades and drifts up — no horizontal movement */
    const exitStart = heroHeight * 0.08;
    const exitEnd   = heroHeight * 0.42;
    const p = Math.min(Math.max((scrollY - exitStart) / (exitEnd - exitStart), 0), 1);

    if (p > 0) {
      polaroid.style.opacity    = String(1 - p);
      polaroid.style.transform  = `rotate(-1.5deg) translateY(${-p * 30}px) scale(${1 - p * 0.04})`;
      polaroid.style.animation  = 'none';
      polaroid.style.transition = 'none';
    } else if (scrollY === 0) {
      /* Scrolled back to top — restore resting state */
      polaroid.style.opacity    = '1';
      polaroid.style.transform  = 'rotate(-1.5deg)';
      polaroid.style.transition = '';
      polaroid.style.animation  = 'none';
    }

    /* Scroll hint */
    if (scrollHint) scrollHint.classList.toggle('is-hidden', scrollY > 40);

    /* Top nav */
    topNav.classList.toggle('is-visible', scrollY > heroHeight * 0.6);

    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  /* ── 3. Section reveal — IntersectionObserver ─────────── */
  /*
     Each .section starts at opacity:0 + translateY(80px) in CSS.
     When it enters the viewport, we add .is-visible which
     transitions it to opacity:1 + translateY(0).

     This creates the "object appearing on the floor as you
     walk toward it" feeling of the birds-eye hallway view.

     Once revealed, sections stay visible (observer disconnects
     per element after first trigger — no hide-on-scroll-back).
  */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            /* Small stagger so sections don't all pop at once
               if multiple are in view (e.g. on first load) */
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(function () {
              entry.target.classList.add('is-visible');
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        /* Trigger when 12% of the section is visible */
        threshold: 0.12,
        /* Add a small bottom margin so reveal happens
           a touch before the element reaches the viewport edge */
        rootMargin: '0px 0px -40px 0px'
      }
    );

    sections.forEach(function (section, index) {
      /* Optional stagger on initial page load for visible sections */
      section.dataset.revealDelay = index * 80;
      revealObserver.observe(section);
    });

  } else {
    /* No IntersectionObserver support — just show everything */
    sections.forEach(function (s) { s.classList.add('is-visible'); });
  }

})();
