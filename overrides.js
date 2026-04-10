(() => {
  Object.assign(TYPE_IMAGES, window.__ORIGINAL_TYPE_IMAGES || {});

  const PET_CONFIGS = [
    {
      key: "petA",
      bubbleId: "petBubbleA",
      messages: [
        "先摸耳朵，再去做题。",
        "你一看就很容易被说中。",
        "今天负责陪你嘴硬到底。"
      ]
    },
    {
      key: "petB",
      bubbleId: "petBubbleB",
      messages: [
        "我在看你选答案。",
        "别犹豫，第一反应最准。",
        "靠近一点，我就偏头。"
      ]
    },
    {
      key: "petC",
      bubbleId: "petBubbleC",
      messages: [
        "点我一下，给你加点勇气。",
        "放心选，反正都是娱乐向。",
        "你这气质，很像隐藏人格。"
      ]
    },
    {
      key: "petD",
      bubbleId: "petBubbleD",
      messages: [
        "别发呆了，快开测。",
        "我感觉你会选得很拧巴。",
        "测试之前先让我热个场。"
      ]
    }
  ];

  const petState = {
    started: false
  };

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

  function pickMessage(config) {
    return config.messages[Math.floor(Math.random() * config.messages.length)];
  }

  function setPetShift(shell, event) {
    const rect = shell.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;

    shell.style.setProperty("--pet-shift-x", `${dx * 9}px`);
    shell.style.setProperty("--pet-shift-y", `${dy * 7}px`);
    shell.style.setProperty("--pet-rotate", `${dx * 6}deg`);
    shell.style.setProperty("--face-shift-x", `${dx * 4}px`);
    shell.style.setProperty("--face-shift-y", `${dy * 3}px`);
  }

  function resetPetShift(shell) {
    shell.style.setProperty("--pet-shift-x", "0px");
    shell.style.setProperty("--pet-shift-y", "0px");
    shell.style.setProperty("--pet-rotate", "0deg");
    shell.style.setProperty("--face-shift-x", "0px");
    shell.style.setProperty("--face-shift-y", "0px");
  }

  function showPetMessage(config, message) {
    const bubble = document.getElementById(config.bubbleId);
    const shell = document.querySelector(`[data-pet-key="${config.key}"]`);
    if (!bubble || !shell) {
      return;
    }

    bubble.textContent = message;
    shell.classList.add("is-talking", "is-active");

    clearTimeout(shell._talkTimer);
    clearTimeout(shell._activeTimer);

    shell._talkTimer = setTimeout(() => {
      shell.classList.remove("is-talking");
    }, 1700);

    shell._activeTimer = setTimeout(() => {
      shell.classList.remove("is-active");
    }, 950);
  }

  function bouncePet(shell) {
    shell.classList.remove("is-bouncing");
    void shell.offsetWidth;
    shell.classList.add("is-bouncing");

    clearTimeout(shell._bounceTimer);
    shell._bounceTimer = setTimeout(() => {
      shell.classList.remove("is-bouncing");
    }, 700);
  }

  function activatePet(config) {
    const shell = document.querySelector(`[data-pet-key="${config.key}"]`);
    if (!shell) {
      return;
    }

    showPetMessage(config, pickMessage(config));
    bouncePet(shell);
  }

  function bindPet(config) {
    const shell = document.querySelector(`[data-pet-key="${config.key}"]`);
    if (!shell || shell.dataset.bound === "true") {
      return false;
    }

    shell.dataset.bound = "true";

    shell.addEventListener("pointermove", (event) => {
      setPetShift(shell, event);
    });

    shell.addEventListener("pointerleave", () => {
      resetPetShift(shell);
      shell.classList.remove("is-active");
    });

    shell.addEventListener("pointerenter", () => {
      showPetMessage(config, pickMessage(config));
    });

    shell.addEventListener("click", () => {
      activatePet(config);
    });

    return true;
  }

  function initPets() {
    if (petState.started) {
      return;
    }

    petState.started = true;
    let count = 0;

    PET_CONFIGS.forEach((config) => {
      if (bindPet(config)) {
        count += 1;
      }
    });

    window.__petLoadedCount = count;
  }

  function createSparkles(x, y) {
    for (let index = 0; index < 6; index += 1) {
      const spark = document.createElement("span");
      spark.className = "click-spark";
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty("--spark-x", `${(Math.random() - 0.5) * 70}px`);
      spark.style.setProperty("--spark-y", `${(Math.random() - 0.5) * 70}px`);
      spark.style.background = index % 2 === 0
        ? "linear-gradient(135deg, #ff9369, #ffd972)"
        : "linear-gradient(135deg, #8ce0d4, #c5b8ff)";
      document.body.appendChild(spark);
      spark.addEventListener("animationend", () => spark.remove(), { once: true });
    }
  }

  function initPointerAura() {
    if (!window.matchMedia("(pointer:fine)").matches) {
      return;
    }

    let aura = document.querySelector(".cursor-aura");
    if (!aura) {
      aura = document.createElement("div");
      aura.className = "cursor-aura";
      document.body.appendChild(aura);
    }

    window.addEventListener("pointermove", (event) => {
      aura.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    });

    window.addEventListener("click", (event) => {
      createSparkles(event.clientX, event.clientY);
    });
  }

  function bindHeroPetButton() {
    const button = document.getElementById("heroPetBtn");
    if (!button || button.dataset.bound === "true") {
      return;
    }

    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      PET_CONFIGS.forEach((config, index) => {
        window.setTimeout(() => activatePet(config), index * 120);
      });
    });
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

      if (name === "intro") {
        initPets();
      }
    });
  };

  bindHeroPetButton();
  initPointerAura();
  initPets();
  normalizePoster();
  observe(document);
  revealWithinScreen("intro");
})();
