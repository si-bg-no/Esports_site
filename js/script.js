/* ===============
  Scroll menu
=============== */

window.onload = () => {
  const newsGroup = document.querySelector(".news-group");
  const figures = newsGroup.querySelectorAll("figure");
  const style = getComputedStyle(newsGroup);
  const gap = parseInt(style.gap) || 0;
  const figureWidth = figures[0].offsetWidth + gap;

  const itemsPerScroll = 3;
  const scrollStep = figureWidth * itemsPerScroll;
  const maxScroll = figureWidth * figures.length;

  let scrollPosition = 0;
  let autoScrollInterval;
  let isReturning = false;

  function scrollToPosition(pos) {
    scrollPosition = pos;

    if (scrollPosition >= maxScroll) {
      clearInterval(autoScrollInterval);
      isReturning = true;

      newsGroup.scrollTo({
        left: maxScroll,
        behavior: "smooth",
      });

      setTimeout(() => {
        newsGroup.scrollTo({ left: 0, behavior: "smooth" });
        scrollPosition = 0;

        setTimeout(() => {
          isReturning = false;
          startAutoScroll();
        }, 1500);
      }, 1500);

      return;
    }

    if (scrollPosition < 0) scrollPosition = 0;

    if (!isReturning) {
      newsGroup.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }

  function scrollNext() {
    scrollToPosition(scrollPosition + scrollStep);
  }

  function scrollPrev() {
    scrollToPosition(scrollPosition - scrollStep);
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(scrollNext, 4000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  const prevBtn = document.querySelector(".news-scroll-btn.prev");
  const nextBtn = document.querySelector(".news-scroll-btn.next");

  prevBtn.addEventListener("click", () => {
    if (isReturning) return;
    stopAutoScroll();
    scrollPrev();
    startAutoScroll();
  });

  nextBtn.addEventListener("click", () => {
    if (isReturning) return;
    stopAutoScroll();
    scrollNext();
    startAutoScroll();
  });

  newsGroup.addEventListener("mouseenter", stopAutoScroll);
  newsGroup.addEventListener("mouseleave", () => {
    if (!isReturning) startAutoScroll();
  });

  startAutoScroll();
};

/* ===============
  Hamburger menu
=============== */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".header-nav-menu");
const overlay = document.getElementById("overlay");
const icon = menuToggle.querySelector("ion-icon");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");

  icon.setAttribute(
    "name",
    navMenu.classList.contains("active")
      ? "close-outline"
      : "menu-outline"
  );
});

overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
  icon.setAttribute("name", "menu-outline");
});

/* ===============
  Header fixed
=============== */

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  const headerHeight = header.offsetHeight;

  if (window.scrollY > headerHeight) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});
