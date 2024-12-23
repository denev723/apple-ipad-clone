import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

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

searchCloserEl.addEventListener("click", (e) => {
  e.stopPropagation();
  hideSearch();
});

shadowEl.addEventListener("click", hideSearch);

function showSearch() {
  stopScroll();
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
  playScroll();
  headerEl.classList.remove("searching");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = `${(0.4 * (index + 1)) / headerMenuEls.length}s`;
  });
  searchDelayEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${(index * 0.4) / searchDelayEls.length}s`;
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

function playScroll() {
  document.documentElement.classList.remove("fixed");
}

function stopScroll() {
  document.documentElement.classList.add("fixed");
}

const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", function () {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

const searchTextFieldEl = document.querySelector("header .textfield");
const searchCanceEl = document.querySelector("header .search-canceler");

searchTextFieldEl.addEventListener("click", function () {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus();
});

searchCanceEl.addEventListener("click", function () {
  headerEl.classList.remove("searching--mobile");
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

const navEl = document.querySelector("nav");
const navMenuToggleEl = navEl.querySelector(".menu-toggler");
const navMenuShadowEl = navEl.querySelector(".shadow");

navMenuToggleEl.addEventListener("click", () => {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});

navEl.addEventListener("click", (e) => {
  e.stopPropagation();
});

navMenuShadowEl.addEventListener("click", hideNavMenu);

window.addEventListener("click", hideNavMenu);

function showNavMenu() {
  navEl.classList.add("menuing");
}

function hideNavMenu() {
  navEl.classList.remove("menuing");
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

const itemsEl = document.querySelector("section.compare .items");

ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");
  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color: ${color}"></li>`;
  });
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;
  itemsEl.append(itemEl);
});

const navigationsEl = document.querySelector("footer .navigations");

navigations.forEach((navigation) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  navigation.maps.forEach((map) => {
    mapList += /* html */ `
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>
    `;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${navigation.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
});

const yearEl = document.querySelector("footer .this-year");
yearEl.textContent = new Date().getFullYear();

const mapEl = document.querySelectorAll("footer .navigations .map");
mapEl.forEach((el) => {
  const h3El = el.querySelector("h3");
  h3El.addEventListener("click", () => {
    el.classList.toggle("active");
  });
});
