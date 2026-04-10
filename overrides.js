(() => {
  Object.assign(TYPE_IMAGES, window.__ORIGINAL_TYPE_IMAGES || {});

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.12 });

  function observe(root = document) {
    root.querySelectorAll(".reveal:not([data-observed])").forEach((node) => {
      node.dataset.observed = "true";
      observer.observe(node);
    });
  }

  function revealWithinScreen(name) {
    const screen = document.getElementById(name);
    if (!screen) {
      return;
    }
    screen.querySelectorAll(".reveal").forEach((node) => {
      node.classList.add("is-visible");
    });
  }

  function decorateQuestions() {
    document.querySelectorAll(".question").forEach((card, index) => {
      card.classList.add("reveal");
      card.style.transitionDelay = `${Math.min(index, 8) * 40}ms`;
    });
    observe(document);
    if (document.getElementById("test")?.classList.contains("active")) {
      requestAnimationFrame(() => revealWithinScreen("test"));
    }
  }

  function getTypeCode(typeText) {
    return (typeText || "").split(/[（(]/)[0].trim();
  }

  function tuneTypeName() {
    const typeName = document.getElementById("resultTypeName");
    if (!typeName) {
      return;
    }
    typeName.classList.toggle("type-name-compact", typeName.textContent.trim().length >= 9);
  }

  function normalizePoster() {
    const anchor = document.getElementById("posterAnchor");
    const sourceLink = document.getElementById("posterSourceLink");

    if (anchor) {
      anchor.removeAttribute("href");
      anchor.removeAttribute("target");
      anchor.removeAttribute("rel");
      anchor.style.cursor = "default";
    }

    if (sourceLink) {
      sourceLink.removeAttribute("href");
      sourceLink.textContent = "";
    }
  }

  const originalRenderQuestions = window.renderQuestions;
  window.renderQuestions = function renderQuestionsPatched(...args) {
    originalRenderQuestions.apply(this, args);
    decorateQuestions();
  };

  const originalRenderResult = window.renderResult;
  window.renderResult = function renderResultPatched(...args) {
    originalRenderResult.apply(this, args);
    const typeText = document.getElementById("resultTypeName")?.textContent || "";
    const typeCode = getTypeCode(typeText);
    if (TYPE_IMAGES[typeCode]) {
      document.body.removeAttribute("data-result-theme");
    }
    tuneTypeName();
    normalizePoster();
    observe(document);
  };

  const originalShowScreen = window.showScreen;
  window.showScreen = function showScreenPatched(name) {
    originalShowScreen(name);
    if (name !== "result") {
      document.body.removeAttribute("data-result-theme");
    }
    requestAnimationFrame(() => {
      observe(document);
      revealWithinScreen(name);
    });
  };

  normalizePoster();
  observe(document);
})();
