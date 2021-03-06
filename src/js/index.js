const htmlTag = document.querySelector("html");
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
  if (window.innerWidth < 1199) return;
  header.classList.remove(searchActiveClass);
  searchInput.blur();
});

const burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  header.classList.toggle("header--burger-opened");
  htmlTag.classList.toggle("poppa-block-scrolling");
  burger.classList.toggle("burger--active");
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
  a11y: {
    enabled: false,
  },
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
  pagination: {
    el: ".offers-slider__pagination",
    clickable: true,
    dynamicBullets: true,
  },
});

const featuredSliderOptions = {
  allowTouchMove: false,
  spaceBetween: 0,
  slidesPerView: 2,
  grabCursor: true,
  slidesPerView: "auto",
  navigation: {
    nextEl: ".featured__button-next",
    prevEl: ".featured__button-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    1200: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 4,
    },
    576: {
      spaceBetween: 20,
      allowTouchMove: true,
    },
  },
};
let featuresSlider = new Swiper(".featured-slider", featuredSliderOptions);

const featuredSliderElement = document.querySelector(".featured-slider");
if (featuredSliderElement) {
  const featuredSliderWrapper =
    featuredSliderElement.querySelector(".swiper-wrapper");
  const featuredSliderSlides =
    featuredSliderElement.querySelectorAll(".swiper-slide");

  function recalculateFeaturedSlider() {
    setTimeout(() => {
      if (window.innerWidth < 576) {
        featuredSliderWrapper.classList.remove("swiper-wrapper");
        featuredSliderWrapper.classList.add("features-slider__inner");
        featuredSliderSlides.forEach((slide) => {
          slide.classList.remove("swiper-slide");
        });
        featuresSlider = null;
      } else {
        featuredSliderWrapper.classList.add("swiper-wrapper");
        featuredSliderWrapper.classList.remove("features-slider__inner");
        featuredSliderSlides.forEach((slide) => {
          slide.classList.add("swiper-slide");
        });
        featuresSlider = new Swiper(".featured-slider", featuredSliderOptions);
      }
      console.log("resized");
    }, 100);
  }
  window.addEventListener("resize", () => recalculateFeaturedSlider());
  recalculateFeaturedSlider();
}

let partnersSlider = new Swiper(".partners-slider", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 14,
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
  breakpoints: {
    // when window width is >= 320px
    992: {
      slidesPerView: 5,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
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

if (shopsSection) {
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
    button
      .querySelector(".shops-addresses__location")
      .setAttribute("href", href);
  });

  const mapOptions = {
    once: true, //???????????? ???????? ??????, ?? ???????????????? ?????????????????????? ??????????
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
}

// @stepper
const steppers = document.querySelectorAll(".control-stepper");

if (steppers) {
  steppers.forEach((stepper) => {
    const minus = stepper.querySelector(".control-stepper__minus ");
    const input = stepper.querySelector(".control-stepper__input ");
    const plus = stepper.querySelector(".control-stepper__plus ");

    let inputMinExtremum = +input.getAttribute("data-min");
    let inputMaxExtremum = +input.getAttribute("data-max");

    let isMinusDisabled = false;
    let isPlusDisabled = false;

    let currentValue = input.value;
    optionalExtremums(currentValue);

    function checkExtremums(currentValue) {
      if (+currentValue <= inputMinExtremum) {
        minus.setAttribute("disabled", "disabled");
        isMinusDisabled = true;
      } else {
        minus.removeAttribute("disabled");
        isMinusDisabled = false;
      }
      if (+currentValue > inputMaxExtremum - 1) {
        plus.setAttribute("disabled", "disabled");
        isPlusDisabled = true;
      } else {
        plus.removeAttribute("disabled");
        isPlusDisabled = false;
      }
    }
    function optionalExtremums(currentValue) {
      if (!(inputMinExtremum && inputMaxExtremum)) {
        inputMaxExtremum = 999;
        inputMinExtremum = 1;
      }

      checkExtremums(currentValue);
    }

    function makeDecrement() {
      if (isMinusDisabled) return;

      +currentValue--;
      input.value = currentValue;
      optionalExtremums(currentValue);
    }

    function makeIncrement() {
      if (isPlusDisabled) return;
      +currentValue++;
      input.value = currentValue;
      optionalExtremums(currentValue);
    }

    function inputHandler() {
      let currentInput = input.value;
      currentInput = currentInput.replace(/\D+/g, "");

      if (currentInput > inputMaxExtremum) {
        input.value = inputMaxExtremum;
        currentValue = inputMaxExtremum;
        optionalExtremums(currentValue);
        return;
      }
      if (currentInput < inputMinExtremum) {
        input.value = inputMinExtremum;
        currentValue = inputMinExtremum;
        optionalExtremums(currentValue);
        return;
      }

      currentValue = currentInput;
      console.log(currentInput);
      input.value = currentValue;
      optionalExtremums(currentValue);
    }

    minus.addEventListener("click", makeDecrement);
    input.addEventListener("input", inputHandler);
    plus.addEventListener("click", makeIncrement);
  });
}

const inputFields = document.querySelectorAll(".input");
if (inputFields) {
  function checkInputContent(input, placeholder) {
    if (input.value !== "") {
      if (!placeholder.classList.contains("active")) {
        placeholder.classList.add("active");
      }
      return;
    }
    placeholder.classList.remove("active");
  }
  inputFields.forEach((input) => {
    const placeholder = input.parentElement.querySelector(
      ".input__placeholder"
    );
    input.addEventListener("focus", () => {
      if (!placeholder) return;

      placeholder.classList.add("active");
    });

    if (placeholder) {
      input.addEventListener("blur", () =>
        checkInputContent(input, placeholder)
      );
      input.addEventListener("change", () =>
        checkInputContent(input, placeholder)
      );
      input.addEventListener("input", () => {
        console.log("input", input.value.length);
        checkInputContent(input, placeholder);
      });
    }
    input.focus();
    input.blur();
    checkInputContent(input, placeholder);
  });
}

const anchors = document.querySelectorAll('a[href*="#"]');
if (anchors) {
  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const blockID = anchor.getAttribute("href").substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
}

const filterVisibilityTogglers = document.querySelectorAll(
  ".filter__button-toggle"
);
const filterBlock = document.querySelector(".filter");
if (filterVisibilityTogglers) {
  filterVisibilityTogglers.forEach((button) => {
    button.addEventListener("click", () => {
      filterBlock.classList.toggle("filter--visible");
    });
  });
}

// on button click scroll to top
const scrollToTopButton = document.querySelector(".button__scroll-top");
if (scrollToTopButton) {
  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

import { Datepicker } from "vanillajs-datepicker";
import ru from "vanillajs-datepicker/js/i18n/locales/ru.js";
Object.assign(Datepicker.locales, ru);
const calendarInputs = document.querySelectorAll(".input--calendar");
if (calendarInputs) {
  calendarInputs.forEach((calendar) => {
    const datepicker = new Datepicker(calendar, {
      format: "dd M. yyyy",
      autohide: true,
      maxDate: new Date(),
      language: "ru",
    });
  });
}

const phones = document.querySelectorAll(".js-phone");
if (phones) {
  phones.forEach((phone) => {
    // copy phone number to clipboard on click
    phone.addEventListener("click", (event) => {
      if (window.innerWidth > 1199) {
        event.preventDefault();
        const phoneNumber = phone.textContent;
        const textArea = document.createElement("textarea");
        textArea.value = phoneNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();

        const phoneNummber = phone.innerText;
        const copiedLabel = phone.getAttribute("data-label");
        phone.innerText = copiedLabel;

        setTimeout(() => {
          phone.innerText = phoneNummber;
        }, 2500);
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", (event) => {
  const headerTabs = document.querySelector(".header-nav__tabs");
  headerTabs.classList.remove("header-nav__tabs--loading");
});
