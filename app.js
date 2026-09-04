(() => {
  "use strict";

  const hero = document.querySelector(".split-hero");
  const panels = [...document.querySelectorAll(".profile-panel")];

  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });

  panels.forEach(panel => {
    panel.addEventListener("click", event => {
      // Los enlaces de perfil navegan directamente.
      if (event.target.closest("a")) return;

      const alreadyActive = panel.classList.contains("is-active");

      panels.forEach(item => {
        item.classList.remove("is-active");
        item.setAttribute("aria-expanded", "false");
      });

      if (alreadyActive) {
        hero.classList.remove("has-active");
        return;
      }

      panel.classList.add("is-active");
      panel.setAttribute("aria-expanded", "true");
      hero.classList.add("has-active");
    });
  });
})();
