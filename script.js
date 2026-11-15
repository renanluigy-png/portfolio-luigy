// Filtros de projetos: todos, web, sistemas e IA.
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
      const categories = card.dataset.category.split(" ");
      const visible = filter === "all" || categories.includes(filter);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    emptyState.hidden = visibleCount > 0;
  });
});

// Animações de entrada acionadas quando cada seção aparece na tela.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Fecha a navegação compacta depois que uma seção é selecionada.
document.querySelectorAll("#portfolioMenu .nav-link, #portfolioMenu .nav-cta").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("portfolioMenu");
    if (menu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Copia o e-mail sem inserir números de telefone na página pública.
const copyButton = document.querySelector("[data-copy-email]");
const copyToast = document.getElementById("copyToast");
if (copyButton && navigator.clipboard) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
      copyToast.classList.add("is-visible");
      window.setTimeout(() => copyToast.classList.remove("is-visible"), 2200);
    } catch (error) {
      copyToast.textContent = "Não foi possível copiar. Use o link de e-mail.";
      copyToast.classList.add("is-visible");
      window.setTimeout(() => copyToast.classList.remove("is-visible"), 2600);
    }
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

// Barra de progresso de leitura no topo.
const progressBar = document.querySelector("#scrollProgress span");
let scrollTicking = false;
const updateScrollProgress = () => {
  if (!progressBar) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  scrollTicking = false;
};
window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollProgress);
    scrollTicking = true;
  }
}, { passive: true });
updateScrollProgress();

// Luz difusa acompanha o cursor em telas com mouse, sem interferir nos cliques.
const pointerAura = document.querySelector(".pointer-aura");
const canUsePointerAura = window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (pointerAura && canUsePointerAura) {
  document.body.classList.add("pointer-active");
  window.addEventListener("pointermove", (event) => {
    pointerAura.style.left = `${event.clientX}px`;
    pointerAura.style.top = `${event.clientY}px`;
  }, { passive: true });
}

// Perspectiva sutil nos cards: o movimento é limitado e desativado em mobile/reduced motion.
const supportsTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (supportsTilt) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 3.5;
      const rotateX = (0.5 - y) * 3.5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}


// One-time entrance curtain: keep the page usable if scripts load slowly.
window.addEventListener("load", () => {
  window.setTimeout(() => document.body.classList.add("page-loaded"), 160);
}, { once: true });

// High precision pointer lens with a gentle trailing ring.
const cursorRing = document.querySelector(".cursor-ring");
const cursorCore = document.querySelector(".cursor-core");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (cursorRing && cursorCore && finePointer && !reduceMotion) {
  document.body.classList.add("cursor-ready");
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let ringX = pointerX;
  let ringY = pointerY;
  let cursorFrame = 0;

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursorCore.style.transform = `translate3d(${pointerX}px,${pointerY}px,0) translate(-50%,-50%)`;
    if (!cursorFrame) cursorFrame = window.requestAnimationFrame(moveRing);
  }, { passive: true });

  function moveRing() {
    ringX += (pointerX - ringX) * 0.22;
    ringY += (pointerY - ringY) * 0.22;
    cursorRing.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
    if (Math.abs(pointerX-ringX) > .3 || Math.abs(pointerY-ringY) > .3) {
      cursorFrame = window.requestAnimationFrame(moveRing);
    } else {
      cursorFrame = 0;
    }
  }

  document.querySelectorAll("a,button,.project-card,.identity-panel").forEach((target) => {
    target.addEventListener("pointerenter", () => document.body.classList.add("cursor-hover"));
    target.addEventListener("pointerleave", () => document.body.classList.remove("cursor-hover"));
  });
}

// Richer project-card interaction: 3D tilt, pointer light and a reflective sweep.
if (finePointer && !reduceMotion) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - .5) * 8;
      const rotateX = (.5 - y) * 8;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px) scale(1.008)`;
      card.classList.add("is-hovered");
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.classList.remove("is-hovered");
    });
  });

  // The monogram panel responds with a restrained, deeper parallax tilt.
  const heroArt = document.querySelector(".hero-art");
  const identityPanel = document.querySelector(".identity-panel");
  if (heroArt && identityPanel) {
    heroArt.addEventListener("pointermove", (event) => {
      const rect = heroArt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      identityPanel.style.setProperty("--panel-rx", `${(0.5-y)*7}deg`);
      identityPanel.style.setProperty("--panel-ry", `${(x-0.5)*9}deg`);
      heroArt.style.setProperty("--hero-x", `${x*100}%`);
      heroArt.style.setProperty("--hero-y", `${y*100}%`);
    });
    heroArt.addEventListener("pointerleave", () => {
      identityPanel.style.setProperty("--panel-rx", "0deg");
      identityPanel.style.setProperty("--panel-ry", "0deg");
    });
  }

  // Magnetic movement is capped to a few pixels, preserving precise targets.
  document.querySelectorAll(".button,.nav-cta").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const dy = (event.clientY - rect.top - rect.height / 2) / rect.height;
      button.style.setProperty("--mag-x", `${dx * 5}px`);
      button.style.setProperty("--mag-y", `${dy * 4}px`);
    });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--mag-x", "0px");
      button.style.setProperty("--mag-y", "0px");
    });
  });
}

// Keep the active section reflected in the navigation while scrolling.
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
