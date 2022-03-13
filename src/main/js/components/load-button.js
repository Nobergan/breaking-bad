import refs from "../refs";

const loadBtn = {
  enable() {
    refs.loadMoreBtn.disabled = true;
    refs.loadMoreBtnLable.textContent = "Loading...";
    refs.loadMoreBtnSpinner.classList.remove("is-hidden");
  },
  disable() {
    refs.loadMoreBtn.disabled = false;
    refs.loadMoreBtnLable.textContent = "Load more";
    refs.loadMoreBtnSpinner.classList.add("is-hidden");
  }
};

export default loadBtn;