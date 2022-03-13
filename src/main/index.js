import "./scss/index.scss";

import refs from "./js/refs";
import episodesApiService from "./js/episodes-api-service";
import charactersApiService from "./js/characters-api-service";

import "./js/swiper-slider";
import Router from "./js/components/Router.js";

const router = new Router({
  mode: "history",
  root: "http://192.168.88.161:8080/",
});

router
  .add(/episodes.html/, () => {
    episodesApiService.loadEpisodes();
  })
  .add(/characters.html/, () => {
    
    // LOAD ALL CHARACTERS
    charactersApiService.loadCharacters();

    refs.loadMoreBtn.addEventListener('click', handleCharactersMoreBtn);

    function handleCharactersMoreBtn() {
        charactersApiService.loadMoreCharacters();
    }

    // LOAD ONE CHARACTER BY ID

    [...refs.allDropdownItems].forEach(item => item.addEventListener('click', handleDropdown));

    function handleDropdown(event) {
      const currentItem = event.currentTarget;

      charactersApiService.characterId = currentItem.dataset.id;

      const currentItemText = currentItem.textContent;

      refs.dropdownHeader.textContent = `${currentItemText}`;

      charactersApiService.clearCharacters();

      charactersApiService.loadCharacterById();
    }
  })
  // .add(/characters.html\/(.*)\/specification\/(.*)/, (id, specification) => {
  //   alert(`products: ${id} specification: ${specification}`);
  // })
  .add("", () => {
    // general controller
    console.log("welcome in catch all controller");
  });

