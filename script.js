// Portfolio interactions — filters, motion, accessibility and responsive effects.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = motionPreference.matches;

// Project filters.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.getElementById("emptyState");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const visible = filter === "all" || categories.includes(filter);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    emptyState.hidden = visibleCount > 0;
  });
});

// Intro curtain: always release it, even when the load event is delayed.
const finishIntro = () => document.body.classList.add("page-loaded");
window.addEventListener("load", () => window.setTimeout(finishIntro, 180), { once: true });
window.setTimeout(finishIntro, 1800);

// Progressive section reveals with a small stagger.
const revealItems = document.querySelectorAll(".reveal");
if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Mobile Bootstrap navigation closes after a destination is selected.
document.querySelectorAll("#portfolioMenu .nav-link, #portfolioMenu .nav-cta").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("portfolioMenu");
    if (menu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Email copy button.
const copyButton = document.querySelector("[data-copy-email]");
const copyToast = document.getElementById("copyToast");
if (copyButton && navigator.clipboard) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
      copyToast.textContent = "E-mail copiado.";
    } catch {
      copyToast.textContent = "Não foi possível copiar. Use o link de e-mail.";
    }
    copyToast.classList.add("is-visible");
    window.setTimeout(() => copyToast.classList.remove("is-visible"), 2300);
  });
}
document.getElementById("year").textContent = new Date().getFullYear();

// Reading progress indicator.
const progressBar = document.querySelector("#scrollProgress span");
let progressFrame = 0;
const updateProgress = () => {
  if (progressBar) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? window.scrollY / max : 0;
    progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, value))})`;
  }
  progressFrame = 0;
};
window.addEventListener("scroll", () => {
  if (!progressFrame) progressFrame = window.requestAnimationFrame(updateProgress);
}, { passive: true });
updateProgress();

// Soft ambient pointer light.
const pointerAura = document.querySelector(".pointer-aura");
if (pointerAura && finePointer && !reducedMotion) {
  document.body.classList.add("pointer-active");
  window.addEventListener("pointermove", (event) => {
    pointerAura.style.left = `${event.clientX}px`;
    pointerAura.style.top = `${event.clientY}px`;
  }, { passive: true });
}

// Custom cursor with a trailing ring; disabled for touch and reduced-motion users.
const cursorRing = document.querySelector(".cursor-ring");
const cursorCore = document.querySelector(".cursor-core");
if (cursorRing && cursorCore && finePointer && !reducedMotion) {
  document.body.classList.add("cursor-ready");
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, cursorFrame = 0;

  const animateRing = () => {
    rx += (x - rx) * 0.2;
    ry += (y - ry) * 0.2;
    cursorRing.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
    if (Math.abs(x-rx) > 0.25 || Math.abs(y-ry) > 0.25) {
      cursorFrame = requestAnimationFrame(animateRing);
    } else cursorFrame = 0;
  };

  window.addEventListener("pointermove", (event) => {
    x = event.clientX; y = event.clientY;
    cursorCore.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
    if (!cursorFrame) cursorFrame = requestAnimationFrame(animateRing);
  }, { passive: true });

  document.querySelectorAll("a,button,.project-card,.identity-panel").forEach((element) => {
    element.addEventListener("pointerenter", () => document.body.classList.add("cursor-hover"));
    element.addEventListener("pointerleave", () => document.body.classList.remove("cursor-hover"));
  });
  document.addEventListener("pointerleave", () => document.body.classList.remove("cursor-ready"));
  document.addEventListener("pointerenter", () => document.body.classList.add("cursor-ready"));
}

// Advanced card tilt and localized reflection. A single listener owns the transform.
if (finePointer && !reducedMotion) {
  projectCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 7;
      const rotateX = (0.5 - py) * 7;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
      card.style.transform = `perspective(1050px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.006)`;
      card.classList.add("is-hovered");
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.classList.remove("is-hovered");
    });
  });

  // Central identity panel parallax.
  const heroArt = document.querySelector(".hero-art");
  const identityPanel = document.querySelector(".identity-panel");
  if (heroArt && identityPanel) {
    heroArt.addEventListener("pointermove", (event) => {
      const rect = heroArt.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      identityPanel.style.setProperty("--panel-rx", `${(0.5-py)*8}deg`);
      identityPanel.style.setProperty("--panel-ry", `${(px-0.5)*10}deg`);
      heroArt.style.setProperty("--hero-x", `${px*100}%`);
      heroArt.style.setProperty("--hero-y", `${py*100}%`);
    });
    heroArt.addEventListener("pointerleave", () => {
      identityPanel.style.setProperty("--panel-rx", "0deg");
      identityPanel.style.setProperty("--panel-ry", "0deg");
    });
  }

  // Small magnetic response on calls to action.
  document.querySelectorAll(".button,.nav-cta").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width/2) / rect.width;
      const dy = (event.clientY - rect.top - rect.height/2) / rect.height;
      button.style.setProperty("--mag-x", `${dx*5}px`);
      button.style.setProperty("--mag-y", `${dy*4}px`);
    });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--mag-x", "0px");
      button.style.setProperty("--mag-y", "0px");
    });
  });
}

// Active navigation state.
const sectionLinks = new Map(
  [...document.querySelectorAll(".portfolio-nav .nav-link")]
    .map((link) => [link.getAttribute("href").slice(1), link])
);
if ("IntersectionObserver" in window && sectionLinks.size) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && sectionLinks.has(entry.target.id)) {
        sectionLinks.forEach((link) => link.classList.remove("is-current"));
        sectionLinks.get(entry.target.id).classList.add("is-current");
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sectionLinks.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}

// Fine monochrome particle field in the hero. Pauses when off-screen.
(() => {
  const canvas = document.getElementById("heroParticles");
  const hero = document.querySelector(".hero");
  if (!canvas || !hero || reducedMotion) return;

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  let width = 0, height = 0, dpr = 1, particles = [], frame = 0, visible = true;
  let pointer = null;
  const maxDistance = 132;

  const resize = () => {
    const rect = hero.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const density = window.matchMedia("(max-width: 767px)").matches ? 1/12500 : 1/9800;
    const count = Math.max(24, Math.min(82, Math.round(width * height * density)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      radius: Math.random() * 1.15 + .35,
      alpha: Math.random() * .38 + .12
    }));
  };

  const draw = () => {
    if (!visible) { frame = 0; return; }
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -8) p.x = width + 8;
      if (p.x > width + 8) p.x = -8;
      if (p.y < -8) p.y = height + 8;
      if (p.y > height + 8) p.y = -8;

      if (pointer) {
        const dx = p.x-pointer.x, dy = p.y-pointer.y;
        const distance = Math.hypot(dx,dy);
        if (distance < 105 && distance > 0) {
          const force = (105-distance)/105 * .012;
          p.vx += dx/distance*force;
          p.vy += dy/distance*force;
        }
      }
      p.vx *= .995; p.vy *= .995;
      context.beginPath();
      context.arc(p.x,p.y,p.radius,0,Math.PI*2);
      context.fillStyle = `rgba(255,255,255,${p.alpha})`;
      context.fill();

      for (let k = i+1; k < particles.length; k++) {
        const q = particles[k];
        const distance = Math.hypot(p.x-q.x,p.y-q.y);
        if (distance < maxDistance) {
          context.beginPath();
          context.moveTo(p.x,p.y);
          context.lineTo(q.x,q.y);
          context.strokeStyle = `rgba(255,255,255,${(1-distance/maxDistance)*.095})`;
          context.lineWidth = .55;
          context.stroke();
        }
      }
    }
    frame = requestAnimationFrame(draw);
  };

  resize();
  if ("IntersectionObserver" in window) {
    const canvasObserver = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(draw);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; }
    }, { threshold: 0 });
    canvasObserver.observe(hero);
  }
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    pointer = { x: event.clientX-rect.left, y: event.clientY-rect.top };
  }, { passive: true });
  hero.addEventListener("pointerleave", () => { pointer = null; });
  window.addEventListener("resize", () => {
    resize();
    if (visible && !frame) frame = requestAnimationFrame(draw);
  }, { passive: true });
  if (visible) frame = requestAnimationFrame(draw);
})();
