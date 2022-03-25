import Swiper, { Navigation, Autoplay, Pagination } from "swiper";
Swiper.use([Navigation, Autoplay, Pagination]);

let productThumbnails = new Swiper(".proudct-details-thumbnails", {
  // slidesPerView: "auto",
  slidesPerView: 3,
  spaceBetween: 15,
  direction: "vertical",
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
    nextEl: ".proudct-details-thumbnails__button-next",
    prevEl: ".proudct-details-thumbnails__button-prev",
  },
  pagination: {
    el: ".proudct-details-thumbnails__pagination",
  },
  watchSlidesProgress: true,
});
let productGallery = new Swiper(".product-detail-gallery", {
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
    nextEl: ".product-detail-gallery__button-next",
    prevEl: ".product-detail-gallery__button-prev",
  },
  pagination: {
    el: ".product-detail-gallery__pagination",
    clickable: true,
    dynamicBullets: true,
  },
  thumbs: {
    swiper: productThumbnails,
  },
});

const productTabButtons = document.querySelectorAll(".product-details__taber");
const productTabs = document.querySelectorAll(".product-details__tab");

productTabButtons.forEach((button) => {
  const tabButtonName = button.getAttribute("data-tab");
  button.addEventListener("click", () => {
    productTabButtons.forEach((button) => {
      button.classList.remove("product-details__taber--active");
    });
    button.classList.add("product-details__taber--active");

    productTabs.forEach((tab) => {
      tab.classList.remove("product-details__tab--active");
      if (tab.getAttribute("data-tab") === tabButtonName) {
        tab.classList.add("product-details__tab--active");
      }
    });
  });
});
