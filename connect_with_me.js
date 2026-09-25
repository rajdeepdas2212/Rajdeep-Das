(() => {
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileAboutToggle = document.getElementById("mobile-about-toggle");
  const mobileAboutMenu = document.getElementById("mobile-about-menu");
  const mobileBack = document.getElementById("mobile-back");
  const aboutTrigger = document.getElementById("about-trigger");
  const aboutMenu = document.getElementById("about-menu");

  const setMobileMenu = (open) => {
    mobileToggle?.classList.toggle("is-open", open);
    mobileMenu?.classList.toggle("is-open", open);
    mobileToggle?.setAttribute("aria-expanded", String(open));
    mobileToggle?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    mobileMenu?.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
  };

  const setMobileAbout = (open) => {
    mobileAboutToggle?.classList.toggle("is-open", open);
    mobileAboutToggle?.setAttribute("aria-expanded", String(open));
    mobileAboutMenu?.classList.toggle("is-open", open);
    mobileAboutMenu?.setAttribute("aria-hidden", String(!open));
  };

  mobileToggle?.addEventListener("click", () => {
    const open = !mobileMenu.classList.contains("is-open");
    setMobileMenu(open);
    if (!open) setMobileAbout(false);
  });

  mobileAboutToggle?.addEventListener("click", () => {
    setMobileAbout(!mobileAboutMenu.classList.contains("is-open"));
  });

  // Back returns from the About panel; the panel slides right-to-left in reverse.
  mobileBack?.addEventListener("click", () => {
    setMobileAbout(false);
  });

  // Any mobile navigation link closes the drawer before navigation.
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      setMobileAbout(false);
      setMobileMenu(false);
      mobileToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  // In particular, selecting About from the opened About panel must close
  // the entire mobile navigation instead of leaving the drawer visible.
  document.querySelectorAll("#mobile-about-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      setMobileAbout(false);
      setMobileMenu(false);
      mobileToggle?.setAttribute("aria-label", "Open navigation");
      mobileMenu?.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");
    });
  });

  aboutTrigger?.addEventListener("click", () => {
    const open = aboutTrigger.getAttribute("aria-expanded") === "true";
    aboutTrigger.setAttribute("aria-expanded", String(!open));
    aboutMenu?.classList.toggle("is-open", !open);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-dropdown")) {
      aboutTrigger?.setAttribute("aria-expanded", "false");
      aboutMenu?.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileAbout(false);
      setMobileMenu(false);
      aboutTrigger?.setAttribute("aria-expanded", "false");
      aboutMenu?.classList.remove("is-open");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setMobileAbout(false);
      setMobileMenu(false);
    }
  });
})();

/* Scroll Reveal / Popup Animation */
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});

/* Mobile-Optimized One-by-One Reveal Observer */
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother rendering on mobile GPUs
          requestAnimationFrame(() => {
            entry.target.classList.add("active");
          });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05, // Triggers sooner on touch screens
      rootMargin: "0px 0px -10px 0px"
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});