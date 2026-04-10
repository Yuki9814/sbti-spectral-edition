(() => {
  const ASSETS = {
    precision: {
      src: "https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1600",
      page: "https://www.pexels.com/photo/white-and-black-hallway-with-glass-windows-8445619/",
      credit: "Pexels / Spencer Lee",
      theme: "precision"
    },
    neon: {
      src: "https://images.pexels.com/photos/35886060/pexels-photo-35886060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200",
      page: "https://www.pexels.com/photo/nighttime-cityscape-with-illuminated-skyscrapers-35886056/",
      credit: "Pexels / Arnold Nagy",
      theme: "neon"
    },
    velvet: {
      src: "https://images.pexels.com/photos/5224561/pexels-photo-5224561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200",
      page: "https://www.pexels.com/photo/portrait-of-woman-with-shadows-on-face-5224561/",
      credit: "Pexels / Ivan Aguilar",
      theme: "velvet"
    },
    noir: {
      src: "https://images.pexels.com/photos/36352244/pexels-photo-36352244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200",
      page: "https://www.pexels.com/photo/majestic-lion-statue-with-architectural-shadow-36352244/",
      credit: "Pexels / Peter Dyllong",
      theme: "noir"
    }
  };

  const TYPE_ASSET_MAP = {
    "ATM-er": "precision",
    "BOSS": "precision",
    "CTRL": "precision",
    "DEAD": "noir",
    "Dior-s": "neon",
    "DRUNK": "noir",
    "FAKE": "noir",
    "FUCK": "noir",
    "GOGO": "precision",
    "HHHH": "noir",
    "IMFW": "neon",
    "IMSB": "neon",
    "JOKE-R": "noir",
    "LOVE-R": "velvet",
    "MALO": "noir",
    "MONK": "velvet",
    "MUM": "velvet",
    "OH-NO": "noir",
    "OJBK": "velvet",
    "POOR": "neon",
    "SEXY": "velvet",
    "SHIT": "noir",
    "SOLO": "velvet",
    "THAN-K": "precision",
    "THIN-K": "precision",
    "WOC!": "neon",
    "ZZZZ": "velvet"
  };

  Object.entries(TYPE_ASSET_MAP).forEach(([code, key]) => {
    TYPE_IMAGES[code] = ASSETS[key].src;
  });

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

  function decorateQuestions() {
    document.querySelectorAll(".question").forEach((card, index) => {
      card.classList.add("reveal");
      card.style.transitionDelay = `${Math.min(index, 8) * 40}ms`;
    });
    observe(document);
  }

  function setPoster(typeCode) {
    const key = TYPE_ASSET_MAP[typeCode] || "precision";
    const asset = ASSETS[key];
    const anchor = document.getElementById("posterAnchor");
    const link = document.getElementById("posterSourceLink");

    document.body.dataset.resultTheme = asset.theme;

    if (anchor) {
      anchor.href = asset.page;
    }

    if (link) {
      link.href = asset.page;
      link.textContent = `图片来源 · ${asset.credit}`;
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
    const typeCode = typeText.split("（")[0].trim();
    setPoster(typeCode);
    observe(document);
  };

  const originalShowScreen = window.showScreen;
  window.showScreen = function showScreenPatched(name) {
    originalShowScreen(name);
    if (name !== "result") {
      delete document.body.dataset.resultTheme;
    }
    requestAnimationFrame(() => observe(document));
  };

  observe(document);
})();
