import refs from "./refs";

// EPISODES HBS
import hbsSeasonOne from "../handlebars/episodes-season-one.hbs";
import hbsSeasonTwo from "../handlebars/episodes-season-two.hbs";
import hbsSeasonThree from "../handlebars/episodes-season-three.hbs";
import hbsSeasonFour from "../handlebars/episodes-season-four.hbs";
import hbsSeasonFive from "../handlebars/episodes-season-five.hbs";

// COMPONENTS
import loadSpinner from "./components/spinner";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/scale.css";

const baseUrl = "https://www.breakingbadapi.com/api/";

export default {
    fetchEpisodes() {
        const url = `${baseUrl}episodes`;

        return fetch(url)
            .then((res) => res.json())
            .then((data) => data)
            .catch((error) => error);
    },

    filterEpisodesBySeason(data, season, series) {
        const arr = data.filter(
            (el) => el.season === season && el.series === series
        );
        return arr;
    },

    updateEpisodesMarkup(articles, handlebarsFunc, box) {
        const markUp = handlebarsFunc(articles);
        box.insertAdjacentHTML("beforeend", markUp);
    },

    loadEpisodes() {
        loadSpinner.enable();

        this.fetchEpisodes().then((data) => {
            const serie = "Breaking Bad";
            const season1 = this.filterEpisodesBySeason(data, "1", serie);
            const season2 = this.filterEpisodesBySeason(data, "2", serie);
            const season3 = this.filterEpisodesBySeason(data, "3", serie);
            const season4 = this.filterEpisodesBySeason(data, "4", serie);
            const season5 = this.filterEpisodesBySeason(data, "5", serie);

            this.updateEpisodesMarkup(season1, hbsSeasonOne, refs.contentBox);
            this.updateEpisodesMarkup(season2, hbsSeasonTwo, refs.contentBox2);
            this.updateEpisodesMarkup(season3, hbsSeasonThree, refs.contentBox3);
            this.updateEpisodesMarkup(season4, hbsSeasonFour, refs.contentBox4);
            this.updateEpisodesMarkup(season5, hbsSeasonFive, refs.contentBox5);

            const listOfEpisodes = document.querySelectorAll(".episodes-list__item");

            this.addAttrToEpisodes(listOfEpisodes);

            // TOOLTIP
            tippy(".episodes-list__item", {
                content(reference) {
                    const id = reference.getAttribute("data-template");
                    const template = document.getElementById(id);
                    // content: template,
                    return template.innerHTML;
                },
                allowHTML: true,
                theme: "light",
                animation: "scale",
                trigger: "click",
                placement: "bottom",
                interactive: true,
                appendTo: document.body,
                arrow: false,
            });
            // 

            loadSpinner.disable();
        });
    },

    addAttrToEpisodes(item) {
        let count = 0;

        item.forEach((el) => el.setAttribute("data-template", (count += 1)));
    },
};