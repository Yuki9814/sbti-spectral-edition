(() => {
  const ASSETS = {
    atrium: {
      src: "https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1600",
      page: "https://www.pexels.com/photo/white-and-black-hallway-with-glass-windows-8445619/",
      credit: "Pexels / Spencer Lee",
      theme: "command",
      flavor: "镜面中庭、纵深线条和冷暖反差更适合承载掌控感、执行感与结构感。"
    },
    corridor: {
      src: "https://images.pexels.com/photos/15421330/pexels-photo-15421330.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200",
      page: "https://www.pexels.com/photo/white-and-black-hallway-with-glass-windows-8445619/",
      credit: "Pexels / Berna Elif",
      theme: "luxe",
      flavor: "暖色石材、秩序构图和柔和灯带，把“高定感”落在了结果海报上。"
    },
    skyline: {
      src: "https://images.pexels.com/photos/35886060/pexels-photo-35886060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200",
      page: "https://www.pexels.com/photo/nighttime-cityscape-with-illuminated-skyscrapers-35886056/",
      credit: "Pexels / Arnold Nagy",
      theme: "city",
      flavor: "夜色建筑和反射玻璃给结果页加了一层都市冷调，更适合互联网感更强的类型。"
    },
    portrait: {
      src: "https://images.pexels.com/photos/5224561/pexels-photo-5224561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200",
      page: "https://www.pexels.com/photo/portrait-of-woman-with-shadows-on-face-5224561/",
      credit: "Pexels / Ivan Aguilar",
      theme: "portrait",
      flavor: "带阴影的人像会让结果更像一张杂志封面，而不是普通说明页。"
    },
    lion: {
      src: "https://images.pexels.com/photos/36352244/pexels-photo-36352244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200",
      page: "https://www.pexels.com/photo/majestic-lion-statue-with-architectural-shadow-36352244/",
      credit: "Pexels / Peter Dyllong",
      theme: "shadow",
      flavor: "强阴影与雕塑轮廓会把“危险”“反讽”“失真感”直接视觉化。"
    },
    tunnel: {
      src: "https://images.pexels.com/photos/6208143/pexels-photo-6208143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200",
      page: "https://www.pexels.com/photo/corridor-of-modern-building-with-glass-walls-6208143/",
      credit: "Pexels / Vika Glitter",
      theme: "tunnel",
      flavor: "长透视和低照度空间给那些游离、荒诞或偏离主流的类型更强的戏剧性。"
    }
  };

  const TYPE_ASSET_MAP = {
    "ATM-er": "atrium",
    "BOSS": "atrium",
    "CTRL": "atrium",
    "DEAD": "lion",
    "Dior-s": "skyline",
    "DRUNK": "lion",
    "FAKE": "lion",
    "FUCK": "lion",
    "GOGO": "atrium",
    "HHHH": "lion",
    "IMFW": "skyline",
    "IMSB": "skyline",
    "JOKE-R": "skyline",
    "LOVE-R": "portrait",
    "MALO": "tunnel",
    "MONK": "portrait",
    "MUM": "corridor",
    "OH-NO": "lion",
    "OJBK": "skyline",
    "POOR": "skyline",
    "SEXY": "corridor",
    "SHIT": "lion",
    "SOLO": "portrait",
    "THAN-K": "corridor",
    "THIN-K": "portrait",
    "WOC!": "skyline",
    "ZZZZ": "portrait"
  };

  Object.entries(TYPE_ASSET_MAP).forEach(([code, assetKey]) => {
    if (TYPE_IMAGES && ASSETS[assetKey]) {
      TYPE_IMAGES[code] = ASSETS[assetKey].src;
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, {
    threshold: 0.12
  });

  function observeReveals(root = document) {
    root.querySelectorAll(".reveal:not([data-observed])").forEach((node) => {
      node.dataset.observed = "true";
      observer.observe(node);
    });
  }

  function decorateQuestions() {
    document.querySelectorAll(".question").forEach((card, index) => {
      card.classList.add("reveal");
      card.style.setProperty("--delay", `${Math.min(index, 12) * 40}ms`);
    });
    observeReveals(document);
  }

  function setPosterLinks(typeCode) {
    const assetKey = TYPE_ASSET_MAP[typeCode] || "atrium";
    const asset = ASSETS[assetKey];
    const anchor = document.getElementById("posterAnchor");
    const sourceLink = document.getElementById("posterSourceLink");
    const flavor = document.getElementById("resultFlavor");

    document.body.dataset.resultTheme = asset.theme;

    if (anchor) {
      anchor.href = asset.page;
      anchor.title = `${typeCode} 图片来源`;
    }

    if (sourceLink) {
      sourceLink.href = asset.page;
      sourceLink.textContent = `查看图片来源 · ${asset.credit}`;
    }

    if (flavor) {
      flavor.textContent = asset.flavor;
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
    const typeName = document.getElementById("resultTypeName")?.textContent || "";
    const typeCode = typeName.split("（")[0].trim();
    setPosterLinks(typeCode);
    observeReveals(document);
  };

  const originalShowScreen = window.showScreen;
  window.showScreen = function showScreenPatched(name) {
    originalShowScreen(name);
    document.body.dataset.view = name;
    requestAnimationFrame(() => observeReveals(document));
  };

  observeReveals(document);
})();
