import refs from "../refs";

const loadSpinner = {
  enable() {
    refs.spinnerEpisodes.forEach(spinner => spinner.classList.remove("visually-hidden"));
  },
  disable() {
    refs.spinnerEpisodes.forEach(spinner => spinner.classList.add("visually-hidden"));
  },
};
export default loadSpinner;