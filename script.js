const menuButton = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileAboutToggle = document.getElementById("mobile-about-toggle");
const mobileAboutMenu = document.getElementById("mobile-about-menu");
const mobileBack = document.getElementById("mobile-back");
const aboutTrigger = document.getElementById("about-menu-trigger");
const aboutMenu = document.getElementById("about-menu");

const setMobileAbout = (open) => {
  mobileAboutToggle?.classList.toggle("is-open", open);
  mobileAboutToggle?.setAttribute("aria-expanded", String(open));
  mobileAboutMenu?.classList.toggle("is-open", open);
  mobileAboutMenu?.setAttribute("aria-hidden", String(!open));
};

const closeMenu = () => {
  if (!menuButton || !mobileMenu) return;

  setMobileAbout(false);
  mobileMenu.classList.remove("open");
  menuButton.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
};

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const open = !mobileMenu.classList.contains("open");

    if (open) {
      mobileMenu.classList.add("open");
      menuButton.classList.add("is-open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Close navigation");
      mobileMenu.setAttribute("aria-hidden", "false");
      document.body.classList.add("menu-open");
    } else {
      closeMenu();
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  mobileAboutToggle?.addEventListener("click", () => {
    setMobileAbout(!mobileAboutMenu?.classList.contains("is-open"));
  });

  mobileBack?.addEventListener("click", () => {
    setMobileAbout(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

/* Desktop About dropdown: click/focus support, while CSS also opens it on hover. */
if (aboutTrigger && aboutMenu) {
  const closeAboutMenu = () => {
    aboutTrigger.setAttribute("aria-expanded", "false");
    aboutMenu.classList.remove("is-open");
  };

  aboutTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = aboutMenu.classList.toggle("is-open");
    aboutTrigger.setAttribute("aria-expanded", String(open));
  });

  aboutMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeAboutMenu);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-dropdown")) {
      closeAboutMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAboutMenu();
      aboutTrigger.focus();
    }
  });
}

/* Scroll Reveal / Popup Animation */
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Animates once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});