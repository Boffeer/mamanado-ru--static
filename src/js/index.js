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

import Swiper, { Navigation, Autoplay } from "swiper";
Swiper.use([Navigation, Autoplay]);

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
  pagination: {
    el: ".offers-slider__pagination",
  },
  autoplay: {
    delay: 15000,
  },
});
