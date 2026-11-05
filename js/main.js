/* ============================================================
   个人主页 · 交互脚本
   双语切换 / 主题切换 / 导航 / 项目筛选 / 滚动动画 / 联系表单
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- 明暗主题 ---------- */
  var themeToggle = document.getElementById("themeToggle");
  var themeIcon = themeToggle ? themeToggle.querySelector(".theme-toggle__icon") : null;

  function getPreferredTheme() {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  }

  /* ---------- 中英双语切换（默认英文） ---------- */
  var langToggle = document.getElementById("langToggle");
  var metaDesc = document.getElementById("metaDesc");
  var META_DESC = {
    en: "YU HAITAO — Senior Research Engineer and data & AI practitioner. Projects, experience, interests and collaboration.",
    zh: "于海涛（YU HAITAO）— 高级研究工程师、数据与 AI 实践者。项目成果、经历、兴趣与合作。"
  };
  var currentLang = "en";

  function applyLang(lang) {
    currentLang = lang;
    root.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");

    var nodes = document.querySelectorAll("[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var text = nodes[i].getAttribute("data-" + lang);
      if (text !== null) nodes[i].textContent = text;
    }

    var phNodes = document.querySelectorAll("[data-en-ph]");
    for (var j = 0; j < phNodes.length; j++) {
      var ph = phNodes[j].getAttribute("data-" + lang + "-ph");
      if (ph !== null) phNodes[j].setAttribute("placeholder", ph);
    }

    if (metaDesc) metaDesc.setAttribute("content", META_DESC[lang]);

    if (langToggle) {
      langToggle.textContent = lang === "en" ? "中文" : "EN";
      langToggle.setAttribute("aria-label", lang === "en" ? "切换中文" : "Switch to English");
    }
  }

  var savedLang = localStorage.getItem("lang");
  applyLang(savedLang === "zh" ? "zh" : "en");

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = currentLang === "en" ? "zh" : "en";
      localStorage.setItem("lang", next);
      applyLang(next);
    });
  }

  /* ---------- 移动端导航 ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 导航阴影 / 回到顶部按钮 ---------- */
  var header = document.querySelector(".site-header");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 10);
    if (toTop) toTop.classList.toggle("is-visible", y > 500);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 页脚 / 品牌的“回到顶部”链接 ---------- */
  var topLinks = document.querySelectorAll('a[href="#top"]');
  for (var ti = 0; ti < topLinks.length; ti++) {
    topLinks[ti].addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 导航高亮当前区块 ---------- */
  var sectionIds = ["about", "projects", "publications", "experience", "interests", "collab", "contact"];
  var linkById = {};

  sectionIds.forEach(function (id) {
    var link = document.querySelector('.nav__links a[href="#' + id + '"]');
    if (link) linkById[id] = link;
  });

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = linkById[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            Object.keys(linkById).forEach(function (key) {
              linkById[key].classList.remove("is-active");
            });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });
  }

  /* ---------- 项目筛选 ---------- */
  var filterBtns = document.querySelectorAll(".projects__filter .chip");
  var cards = document.querySelectorAll("#projectsGrid .card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");

      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");

      cards.forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-cat") === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ---------- 滚动出现动画 ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 联系表单（mailto） ---------- */
  var CONTACT_EMAIL = "413168358@qq.com,yuhaitao521ok@gmail.com";
  var contactForm = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("fName").value.trim();
      var email = document.getElementById("fEmail").value.trim();
      var message = document.getElementById("fMsg").value.trim();

      var subject = encodeURIComponent(
        (currentLang === "zh" ? "【个人网站】来自 " : "[Website] Message from ") + name
      );
      var body = encodeURIComponent(
        message + "\n\n—— " + name + " (" + email + ")"
      );

      window.location.href =
        "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;

      if (formNote) formNote.hidden = false;
    });
  }

  /* ---------- 页脚年份 ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();