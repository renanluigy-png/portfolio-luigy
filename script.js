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