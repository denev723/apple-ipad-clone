// Basket
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", (e) => {
  e.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});

basketEl.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", hideBasket);

function showBasket() {
  basketEl.classList.add("show");
}

function hideBasket() {
  basketEl.classList.remove("show");
}

// Search
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const shadowEl = searchWrapEl.querySelector(".shadow");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];
const searchInputEl = searchWrapEl.querySelector("input");

searchStarterEl.addEventListener("click", showSearch);

searchCloserEl.addEventListener("click", hideSearch);

shadowEl.addEventListener("click", hideSearch);

function showSearch() {
  document.documentElement.classList.add("fixed");
  headerEl.classList.add("searching");
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${(0.4 * index) / headerMenuEls.length}s`;
  });
  searchDelayEls.forEach((el, index) => {
    el.style.transitionDelay = `${(index * 0.4) / searchDelayEls.length}s`;
  });
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  document.documentElement.classList.remove("fixed");
  headerEl.classList.remove("searching");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = `${(0.4 * (index + 1)) / headerMenuEls.length}s`;
  });
  searchDelayEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${(index * 0.4) / searchDelayEls.length}s`;
  });
  searchDelayEls.reverse();
  setTimeout(() => {
    searchInputEl.value = "";
  }, 600);
}

// 요소의 가시성 관찰 로직!
const io = new IntersectionObserver((entries) => {
  // entries는 `io.observe(el)`로 등록된 모든 관찰 대상 배열.
  entries.forEach((entry) => {
    // 사라질 때.
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});
// 관찰할 요소들 검색
const infoEls = document.querySelectorAll(".info");
// 관찰 시작!
infoEls.forEach((el) => io.observe(el));

const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", () => {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});
