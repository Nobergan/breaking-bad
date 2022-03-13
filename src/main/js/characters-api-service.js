import refs from "./refs";

// CHARACTERS HBS
import hbsAllCharacters from "../handlebars//characters/all-chracters.hbs";

// COMPONENTS
import loadBtn from "./components/load-button";
import loadSpinner from "./components/spinner";

const baseUrl = "https://www.breakingbadapi.com/api/";

export default {
    offSet: 1,
    characterId: "",

    incrementOffSet() {
        return (this.offSet += 12);
      },

    updateCharactersMarkup(articles, hbs, box, place) {
        const markUp = hbs(articles);
        box.insertAdjacentHTML(place, markUp);
    },

    // ALL CHARACTERS
    fetchCharacters() {
        const url = `${baseUrl}characters?limit=12&category=Breaking Bad&offset=${this.offSet}`;

        return fetch(url)
            .then((res) => res.json())
            .then((data) => data)
            .catch((error) => error);
    },

    loadCharacters() {
        loadBtn.enable();

        this.fetchCharacters().then((data) => {
            this.updateCharactersMarkup(data, hbsAllCharacters, refs.cardsContentBox, "afterbegin");

            loadBtn.disable();
        })
    },

    loadMoreCharacters() {
        this.incrementOffSet();

        loadBtn.enable();

        this.fetchCharacters().then((data) => {
            this.updateCharactersMarkup(data, hbsAllCharacters, refs.cardsContentBox, "beforeend");

            loadBtn.disable();
        })
    },

    // ONE CHARACTER BY ID
    fetchCharacterById() {
        const url = `${baseUrl}characters/${this.characterId}`;

        return fetch(url)
            .then((res) => res.json())
            .then((data) => data)
            .catch((error) => error);
    },

    loadCharacterById() {
        loadSpinner.enable();

        this.fetchCharacterById().then((data) => {
            this.updateCharactersMarkup(data, hbsAllCharacters, refs.cardsContentBox, "afterbegin");

            loadSpinner.disable();
        })

    },

    // CLEAR CHARACTERS BOX
    clearCharacters() {
        refs.cardsContentBox.innerHTML = "";
        refs.loadMoreBtn.style.display = 'none';
    },
}