(() => {
  const photo = (id, width = 1200, height = 1400) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=${height}&w=${width}`;

  const ASSET_GROUPS = {
    sharp: {
      theme: "sharp",
      images: [
        {
          src: photo(31690584, 1400, 1600),
          page: "https://www.pexels.com/photo/elegant-interior-corridor-with-plants-and-natural-light-31690584/",
          label: "Hyeok Jang"
        },
        {
          src: photo(33342708, 1400, 1600),
          page: "https://www.pexels.com/photo/modern-office-hallway-with-glass-partitions-33342708/",
          label: "Essentia Media"
        },
        {
          src: photo(7534179, 1400, 1600),
          page: "https://www.pexels.com/photo/desk-lamp-on-a-wooden-table-near-the-wall-7534179/",
          label: "Max Vakhtbovych"
        }
      ]
    },
    city: {
      theme: "city",
      images: [
        {
          src: photo(35625428),
          page: "https://www.pexels.com/photo/stylish-urban-fashion-portrait-at-night-35625428/",
          label: "Joint X"
        },
        {
          src: photo(35136130),
          page: "https://www.pexels.com/photo/stylish-man-on-lit-urban-steps-at-night-35136130/",
          label: "Oliver Matos"
        },
        {
          src: photo(29660400),
          page: "https://www.pexels.com/photo/dynamic-portrait-of-a-model-against-an-urban-backdrop-29660400/",
          label: "Eddson Lens"
        }
      ]
    },
    social: {
      theme: "social",
      images: [
        {
          src: photo(36729758),
          page: "https://www.pexels.com/photo/four-young-adults-sharing-conversation-at-a-sidewalk-cafe-36729758/",
          label: "Vitaly Gariev"
        },
        {
          src: photo(28852458),
          page: "https://www.pexels.com/photo/group-of-friends-in-a-neon-lit-diner-sharing-a-meal-28852458/",
          label: "Digital Pixel¹"
        },
        {
          src: photo(6140394),
          page: "https://www.pexels.com/photo/teenagers-sitting-at-a-coffee-shop-6140394/",
          label: "William Fortunato"
        }
      ]
    },
    soft: {
      theme: "soft",
      images: [
        {
          src: photo(12176126),
          page: "https://www.pexels.com/photo/sunlight-over-a-posing-woman-12176126/",
          label: "ALEKSEY DANILOV"
        },
        {
          src: photo(35654277),
          page: "https://www.pexels.com/photo/stylish-fashion-portrait-outdoors-in-sunlight-35654277/",
          label: "brandon retratos"
        },
        {
          src: photo(34460727),
          page: "https://www.pexels.com/photo/fashionable-woman-in-sunlit-outdoor-portrait-34460727/",
          label: "Alena Evseenko"
        }
      ]
    },
    pop: {
      theme: "pop",
      images: [
        {
          src: photo(35236902),
          page: "https://www.pexels.com/photo/creative-portrait-with-colorful-lighting-35236902/",
          label: "Daniel Adesina"
        },
        {
          src: photo(30176072),
          page: "https://www.pexels.com/photo/stylish-portrait-with-neon-accent-lighting-30176072/",
          label: "Ferdinand Studio"
        },
        {
          src: photo(32782506),
          page: "https://www.pexels.com/photo/stylish-young-woman-portrait-in-urban-setting-32782506/",
          label: "Shalom Ejiofor"
        }
      ]
    }
  };

  const TYPE_ASSET_MAP = {
    "ATM-er": "sharp",
    "BOSS": "sharp",
    "CTRL": "sharp",
    "DEAD": "city",
    "Dior-s": "pop",
    "DRUNK": "social",
    "FAKE": "city",
    "FUCK": "city",
    "GOGO": "sharp",
    "HHHH": "city",
    "IMFW": "pop",
    "IMSB": "pop",
    "JOKE-R": "city",
    "LOVE-R": "soft",
    "MALO": "city",
    "MONK": "soft",
    "MUM": "soft",
    "OH-NO": "city",
    "OJBK": "social",
    "POOR": "pop",
    "SEXY": "pop",
    "SHIT": "city",
    "SOLO": "soft",
    "THAN-K": "sharp",
    "THIN-K": "sharp",
    "WOC!": "pop",
    "ZZZZ": "soft"
  };

  const INTRO_ASSETS = [
    ASSET_GROUPS.soft.images[0],
    ASSET_GROUPS.pop.images[0],
    ASSET_GROUPS.social.images[0]
  ];

  Object.entries(TYPE_ASSET_MAP).forEach(([code, key]) => {
    TYPE_IMAGES[code] = ASSET_GROUPS[key].images[0].src;
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

  function revealWithinScreen(name) {
    const screen = document.getElementById(name);
    if (!screen) {
      return;
    }
    screen.querySelectorAll(".reveal").forEach((node) => {
      node.classList.add("is-visible");
    });
  }

  function ensureHeroGallery() {
    const wrap = document.querySelector(".hero-visual-wrap");
    if (!wrap || wrap.dataset.enhanced === "true") {
      return;
    }

    wrap.innerHTML = `
      <div class="hero-gallery">
        ${INTRO_ASSETS.map((asset, index) => `
          <a
            class="hero-card ${index === 0 ? "hero-card-main" : ""}"
            href="${asset.page}"
            target="_blank"
            rel="noreferrer"
          >
            <img src="${asset.src}" alt="SBTI visual ${index + 1}">
          </a>
        `).join("")}
      </div>
      <div class="hero-sources">
        ${INTRO_ASSETS.map((asset, index) => `
          <a class="source-pill" href="${asset.page}" target="_blank" rel="noreferrer">
            图源 0${index + 1}
          </a>
        `).join("")}
      </div>
    `;

    wrap.dataset.enhanced = "true";
  }

  function ensurePosterGallery() {
    const posterBox = document.getElementById("posterBox");
    if (!posterBox || posterBox.dataset.enhanced === "true") {
      return;
    }

    posterBox.innerHTML = `
      <div class="poster-gallery">
        <a id="posterAnchor" class="poster-anchor poster-main" href="#" target="_blank" rel="noreferrer">
          <img id="posterImage" class="poster-image" alt="人格结果图">
        </a>
        <div class="poster-side">
          <a id="posterThumbAnchor1" class="poster-thumb" href="#" target="_blank" rel="noreferrer">
            <img id="posterThumbImage1" alt="人格视觉 1">
          </a>
          <a id="posterThumbAnchor2" class="poster-thumb" href="#" target="_blank" rel="noreferrer">
            <img id="posterThumbImage2" alt="人格视觉 2">
          </a>
        </div>
      </div>
      <div class="poster-meta">
        <div id="posterCaption" class="poster-caption">怎么回事，被我拿捏了吧？</div>
        <div class="poster-source-list">
          <a id="posterSourceLink" class="source-pill" href="#" target="_blank" rel="noreferrer">图源 01</a>
          <a id="posterSourceLink1" class="source-pill" href="#" target="_blank" rel="noreferrer">图源 02</a>
          <a id="posterSourceLink2" class="source-pill" href="#" target="_blank" rel="noreferrer">图源 03</a>
        </div>
      </div>
    `;

    posterBox.dataset.enhanced = "true";
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

  function setPoster(typeCode) {
    ensurePosterGallery();

    const key = TYPE_ASSET_MAP[typeCode] || "soft";
    const group = ASSET_GROUPS[key];
    const [mainAsset, sideAssetA, sideAssetB] = group.images;

    const mainAnchor = document.getElementById("posterAnchor");
    const mainImage = document.getElementById("posterImage");
    const thumbAnchor1 = document.getElementById("posterThumbAnchor1");
    const thumbImage1 = document.getElementById("posterThumbImage1");
    const thumbAnchor2 = document.getElementById("posterThumbAnchor2");
    const thumbImage2 = document.getElementById("posterThumbImage2");
    const sourceLink0 = document.getElementById("posterSourceLink");
    const sourceLink1 = document.getElementById("posterSourceLink1");
    const sourceLink2 = document.getElementById("posterSourceLink2");

    document.body.dataset.resultTheme = group.theme;

    if (mainAnchor && mainImage) {
      mainAnchor.href = mainAsset.page;
      mainImage.src = mainAsset.src;
      mainImage.alt = `${typeCode} 主视觉`;
    }

    if (thumbAnchor1 && thumbImage1) {
      thumbAnchor1.href = sideAssetA.page;
      thumbImage1.src = sideAssetA.src;
      thumbImage1.alt = `${typeCode} 氛围图一`;
    }

    if (thumbAnchor2 && thumbImage2) {
      thumbAnchor2.href = sideAssetB.page;
      thumbImage2.src = sideAssetB.src;
      thumbImage2.alt = `${typeCode} 氛围图二`;
    }

    if (sourceLink0) {
      sourceLink0.href = mainAsset.page;
      sourceLink0.textContent = `图源 01 · ${mainAsset.label}`;
    }

    if (sourceLink1) {
      sourceLink1.href = sideAssetA.page;
      sourceLink1.textContent = `图源 02 · ${sideAssetA.label}`;
    }

    if (sourceLink2) {
      sourceLink2.href = sideAssetB.page;
      sourceLink2.textContent = `图源 03 · ${sideAssetB.label}`;
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
    setPoster(getTypeCode(typeText));
    tuneTypeName();
    observe(document);
  };

  const originalShowScreen = window.showScreen;
  window.showScreen = function showScreenPatched(name) {
    originalShowScreen(name);
    if (name !== "result") {
      delete document.body.dataset.resultTheme;
    }
    requestAnimationFrame(() => {
      observe(document);
      revealWithinScreen(name);
    });
  };

  ensureHeroGallery();
  ensurePosterGallery();
  observe(document);
})();
