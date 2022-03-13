const refs = {
    // EPISODES
    contentBox: document.querySelector(".js-episodes-1"),
    contentBox2: document.querySelector(".js-episodes-2"),
    contentBox3: document.querySelector(".js-episodes-3"),
    contentBox4: document.querySelector(".js-episodes-4"),
    contentBox5: document.querySelector(".js-episodes-5"),

    // CHARACTERS
    cardsContentBox: document.querySelector(".cards .js-cards"),
    allDropdownItems: document.querySelectorAll(".cards .dropdown-item"),
    dropdownHeader: document.querySelector(".cards .dropdown-header"),

    // COMPONENTS
    spinner: document.querySelectorAll(".spinner"),
    spinnerDropdown: document.querySelector(".spinner-dropdown"),
    
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    loadMoreBtnLable: document.querySelector('[data-action="load-more"] > .label'),
    loadMoreBtnSpinner: document.querySelector('[data-action="load-more"] > .spinner'),
};

export default refs;