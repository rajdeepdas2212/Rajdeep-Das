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
        mobileToggle?.setAttribute(
            "aria-label",
            open ? "Close navigation" : "Open navigation"
        );
        mobileMenu?.setAttribute("aria-hidden", String(!open));

        document.body.style.overflow = open ? "hidden" : "";
    };

    const setMobileAbout = (open) => {
        mobileAboutToggle?.setAttribute("aria-expanded", String(open));
        mobileAboutMenu?.classList.toggle("is-open", open);
        mobileAboutMenu?.setAttribute("aria-hidden", String(!open));
    };

    mobileToggle?.addEventListener("click", () => {
        const open = !mobileMenu.classList.contains("is-open");
        setMobileMenu(open);

        if (!open) {
            setMobileAbout(false);
        }
    });

    mobileAboutToggle?.addEventListener("click", () => {
        setMobileAbout(!mobileAboutMenu.classList.contains("is-open"));
    });

    mobileBack?.addEventListener("click", () => {
        setMobileAbout(false);
    });

    document.querySelectorAll(".mobile-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            setMobileAbout(false);
            setMobileMenu(false);
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

(() => {
    const items = document.querySelectorAll('.contact-content > *, .site-footer');

    if (!items.length) return;

    // Respect users who disable motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach(item => item.classList.add('is-visible'));
        return;
    }

    // Each block appears independently when it enters the viewport.
    // Nothing moves as one large page: scroll reveals the next item.
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -4% 0px'
    });

    items.forEach(item => observer.observe(item));
})();
