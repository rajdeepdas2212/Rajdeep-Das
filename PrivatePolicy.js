(() => {
  // Utility selector
  const $ = (id) => document.getElementById(id);

  // Element selections
  const mobileToggle = $('mobile-toggle');
  const mobileMenu = $('mobile-menu');
  const mobileAbout = $('mobile-about-toggle');
  const mobileAboutMenu = $('mobile-about-menu');
  const mobileBack = $('mobile-back');
  const aboutTrigger = $('about-trigger');
  const aboutMenu = $('about-menu');

  // Mobile navigation controller
  function mobileNav(open) {
    mobileToggle?.classList.toggle('is-open', open);
    mobileMenu?.classList.toggle('is-open', open);
    mobileToggle?.setAttribute('aria-expanded', String(open));
    mobileToggle?.setAttribute(
      'aria-label',
      open ? 'Close navigation' : 'Open navigation'
    );
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  // Mobile sub-menu controller
  function setMobileAbout(open) {
    mobileAbout?.setAttribute('aria-expanded', String(open));
    mobileAboutMenu?.classList.toggle('is-open', open);
    mobileAboutMenu?.setAttribute('aria-hidden', String(!open));
  }

  // Event Listeners - Mobile Menu
  mobileToggle?.addEventListener('click', () => {
    const open = !mobileMenu?.classList.contains('is-open');
    mobileNav(open);

    if (!open) {
      setMobileAbout(false);
    }
  });

  mobileAbout?.addEventListener('click', () => {
    setMobileAbout(!mobileAboutMenu?.classList.contains('is-open'));
  });

  mobileBack?.addEventListener('click', () => {
    setMobileAbout(false);
  });

  mobileMenu?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      setMobileAbout(false);
      mobileNav(false);
    });
  });

  // Event Listeners - Desktop Dropdown
  aboutTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = aboutTrigger.getAttribute('aria-expanded') === 'true';
    aboutTrigger.setAttribute('aria-expanded', String(!open));
    aboutMenu?.classList.toggle('is-open', !open);
  });

  // Global Close Listeners (Click Outside & Escape Key)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      aboutTrigger?.setAttribute('aria-expanded', 'false');
      aboutMenu?.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMobileAbout(false);
      mobileNav(false);
      aboutTrigger?.setAttribute('aria-expanded', 'false');
      aboutMenu?.classList.remove('is-open');
    }
  });

  // Reset menu on viewport resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      setMobileAbout(false);
      mobileNav(false);
    }
  });
})();

(() => {
  // Scroll Reveal Animations
  const items = document.querySelectorAll('.reveal');

  if (!items.length) return;

  // Respect users who disable motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    items.forEach((item) => observer.observe(item));
  } else {
    // Fallback for browsers without IntersectionObserver support
    items.forEach((item) => item.classList.add('is-visible'));
  }
})();