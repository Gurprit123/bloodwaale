function initHeaderBehavior() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  if (!header || !toggle || !menu) return;

  const updateHeaderState = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  };

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 840) closeMenu();
  });
  updateHeaderState();
}

function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

function animateCounter(el) {
  const target = Number(el.dataset.target || 0);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);
    el.textContent = value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString() + suffix;
  }

  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll(".count-up");
  if (!counters.length) return;

  const seen = new WeakSet();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function showSuccess(targetId) {
  if (!targetId) return;
  const success = document.getElementById(targetId);
  if (!success) return;
  success.classList.add("is-visible");
  success.scrollIntoView({ behavior: "smooth", block: "nearest" });
  window.setTimeout(() => {
    success.classList.remove("is-visible");
  }, 6000);
}

function initForms() {
  document.querySelectorAll("form[data-success-target]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showSuccess(form.dataset.successTarget);
      form.reset();

      if (form.id === "donor-form") {
        const submit = document.getElementById("donor-submit");
        if (submit) submit.disabled = true;
      }
    });
  });

  const declaration = document.getElementById("healthDeclaration");
  const donorSubmit = document.getElementById("donor-submit");
  if (declaration && donorSubmit) {
    const updateState = () => {
      donorSubmit.disabled = !declaration.checked;
    };
    declaration.addEventListener("change", updateState);
    updateState();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initHeaderBehavior();
  initRevealAnimations();
  initCounters();
  initForms();
});
