import Swiper, { Navigation, Autoplay, Pagination } from "swiper";
Swiper.use([Navigation, Autoplay, Pagination]);

let subcategories = new Swiper(".category-subcategories", {
  spaceBetween: 20,
  grabCursor: true,
  slidesPerView: "auto",
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
    nextEl: ".category-subcategories__button-next",
    prevEl: ".category-subcategories__button-prev",
  },
});
