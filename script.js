// Filtro interativo da seção de projetos.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
const emptyMessage = document.getElementById("filterEmpty");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleProjects = 0;

    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    projectItems.forEach((project) => {
      const categories = project.dataset.category.split(" ");
      const shouldShow = selectedFilter === "all" || categories.includes(selectedFilter);
      project.hidden = !shouldShow;
      if (shouldShow) visibleProjects += 1;
    });

    emptyMessage.hidden = visibleProjects > 0;
  });
});

// Anima os elementos quando entram na área visível da tela.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// Fecha o menu mobile do Bootstrap após escolher uma seção.
document.querySelectorAll("#mainNav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("mainNav");
    if (menu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();