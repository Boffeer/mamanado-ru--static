const header = document.querySelector(".header");
const searchButton = document.querySelector(".header-userbar__item--search");
const searchActiveClass = "header--search-active";
const searchInput = document.querySelector(".search__input");

function toggleSearchBar() {
  if (!header.classList.contains(searchActiveClass)) {
    header.classList.add(searchActiveClass);
    searchInput.focus();
  } else {
    header.classList.remove(searchActiveClass);
    searchInput.blur();
  }
}
searchButton.addEventListener("click", () => {
  toggleSearchBar();
});
header.addEventListener("mouseleave", () => {
  header.classList.remove(searchActiveClass);
  searchInput.blur();
});

import Swiper, { Navigation, Autoplay, Pagination } from "swiper";
Swiper.use([Navigation, Autoplay, Pagination]);

let headerStocks = new Swiper(".header-stocks", {
  grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
  navigation: {
    nextEl: ".header-stocks__button-next",
    prevEl: ".header-stocks__button-prev",
  },
  autoplay: {
    delay: 9000,
  },
});

let offersSlider = new Swiper(".offers-slider", {
  loop: true,
  grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
  navigation: {
    nextEl: ".offers-slider__button-next",
    prevEl: ".offers-slider__button-prev",
  },
  autoplay: {
    delay: 15000,
  },
});

let featuresSlider = new Swiper(".featured-slider", {
  grabCursor: true,
  effect: "creative",
  slidesPerView: 4,
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
  navigation: {
    nextEl: ".featured__button-next",
    prevEl: ".featured__button-prev",
  },
});

let partnersSlider = new Swiper(".partners-slider", {
  slidesPerView: 5,
  slidesPerGroup: 2,
  spaceBetween: 25,
  grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
  navigation: {
    nextEl: ".partners-slider__button-next",
    prevEl: ".partners-slider__button-prev",
  },
  pagination: {
    el: ".partners-slider__pagination",
    clickable: true,
    dynamicBullets: true,
  },
});

// @lazymaps

const yMapHrefBegin = "https://yandex.ru/maps/?";
const yMapHrefEnd = "&amp;source=constructorStatic";

const yMapImgBegin =
  "https://api-maps.yandex.ru/services/constructor/1.0/static/?";
const yMapImgEnd = "&amp;width=600&amp;height=450&amp;lang=ru_RU";

const yMapIframeBegin =
  "https://api-maps.yandex.ru/services/constructor/1.0/js/?";
const yMapIframeEnd =
  "&source=constructor&width=100%25&height=450&lang=ru_RU&scroll=true";
const yMapIframeEndSrc = "&source=constructor";

const mapsButtons = [...document.querySelectorAll(".shop-addresses__item")];
let mapsIds = mapsButtons.map((mapButton) => {
  let mapUrl = mapButton.getAttribute("data-address-map");
  mapUrl = mapUrl.replace(yMapIframeBegin, "");
  return mapUrl.replace(yMapIframeEnd, "");
});

let mapsIframes = mapsIds.map((map) => {
  return `https://yandex.ru/map-widget/v1/?${map}${yMapIframeEndSrc}`;
});

const shopsSection = document.querySelector(".shops");
const shopsPlaceholder = document.querySelector(".shops__map-placeholder");
const shopsIframe = document.querySelector(".shops__map-iframe");

let isPlaceholderLoaded = false;
const placeholderSrc = yMapImgBegin + mapsIds[0] + yMapImgEnd;
window.addEventListener("scroll", () => {
  if (isPlaceholderLoaded) return;

  const pixlesUntill = shopsSection.getBoundingClientRect().top;
  if (pixlesUntill > 1000) return;
  isPlaceholderLoaded = true;

  shopsPlaceholder.setAttribute("src", placeholderSrc);
});

mapsButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("shops-addresses--active")) return;

    mapsButtons.forEach((button) => {
      button.classList.remove("shops-addresses--active");
    });
    button.classList.add("shops-addresses--active");
    shopsIframe.classList.add("shops__map-iframe--active");
    shopsPlaceholder.classList.add("shops__map-placeholder--hidden");

    const iframeSrc = mapsIframes[index];
    shopsIframe.setAttribute("src", iframeSrc);
  });
  const href = yMapHrefBegin + mapsIds[index] + yMapIframeEnd;
  button.querySelector(".shops-addresses__location").setAttribute("href", href);
});

const mapOptions = {
  once: true, //запуск один раз, и удаление наблюдателя сразу
  passive: true,
  capture: true,
};

let isMapLoaded = false;
function startLazyMap() {
  if (isMapLoaded) return;

  isMapLoaded = true;
  shopsIframe.setAttribute("src", mapsIframes[0]);
  shopsPlaceholder.classList.add("shops__map-placeholder--hidden");
  shopsIframe.classList.add("shops__map-iframe--active");
}

shopsPlaceholder.addEventListener("click", startLazyMap, mapOptions);
shopsPlaceholder.addEventListener("mouseover", startLazyMap, mapOptions);
shopsPlaceholder.addEventListener("touchstart", startLazyMap, mapOptions);
shopsPlaceholder.addEventListener("touchmove", startLazyMap, mapOptions);
