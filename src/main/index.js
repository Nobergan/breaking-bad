import "./scss/index.scss";

import refs from "./js/refs";
import episodesApiService from "./js/episodes-api-service";

import "./js/swiper-slider";
import Router from "./js/components/Router.js";

// const it = document.querySelector(".tippy-content");
// console.log(it)
//       it.style.width = "400px";

const router = new Router({
  mode: "history",
  root: "http://192.168.88.161:8080/",
});

router
  .add(/episodes.html/, () => {
    episodesApiService.loadEpisodes();
  })
  // .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
  //   alert(`products: ${id} specification: ${specification}`);
  // })
  .add("", () => {
    // general controller
    console.log("welcome in catch all controller");
  });
