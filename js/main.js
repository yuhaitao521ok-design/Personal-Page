/* ============================================================
   个人主页 · 交互脚本
   主题切换 / 导航 / 项目筛选 / 滚动动画 / 联系表单
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 明暗主题 ---------- */
  var root = document.documentElement;
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
        theme === "dark" ? "切换为浅色主题" : "切换为深色主题"
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

  /* ---------- 移动端导航 ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
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

  /* ---------- 导航高亮当前区块 ---------- */
  var sectionIds = ["about", "projects", "experience", "interests", "collab", "contact"];
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
  // 【占位内容】请把下面的邮箱替换为你的真实邮箱
  var CONTACT_EMAIL = "yourname@example.com";
  var contactForm = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("fName").value.trim();
      var email = document.getElementById("fEmail").value.trim();
      var message = document.getElementById("fMsg").value.trim();

      var subject = encodeURIComponent("【个人网站】来自 " + name + " 的留言");
      var body = encodeURIComponent(
        message + "\n\n—— 来自 " + name + "（" + email + "）"
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