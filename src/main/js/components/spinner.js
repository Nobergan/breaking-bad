import refs from "../refs";

const loadSpinner = {
  enable() {
    refs.spinner.forEach(spinner => spinner.classList.remove("visually-hidden"));
  },
  disable() {
    refs.spinner.forEach(spinner => spinner.classList.add("visually-hidden"));
  },
};
export default loadSpinner;