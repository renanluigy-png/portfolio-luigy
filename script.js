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
