import "./scss/index.scss";
import "./js/swiper-slider";
import refs from './js/refs';
import fetchEpisodes from "./js/fetch";
import updateMarkup from "./js/update-markup";

refs.seasonOneBtn.addEventListener("click", () => {
    // event.preventDefault();
    // console.log(event.currentTarget.elements.query);
  
    // const form = event.currentTarget;
    // const inputValue = form.elements.query.value;
  
    // console.log(inputValue);+
  
    // refs.contentBox.innerHTML = "";
    // form.reset();
  
    fetchEpisodes().then(updateMarkup);
  });