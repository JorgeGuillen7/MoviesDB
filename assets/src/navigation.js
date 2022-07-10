window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

const history = [];
backButton.addEventListener("click", () => {
    history.pop();
    if (history.length > 0) {
        location.hash = "#search=" + history[history.length - 1];
    } else {
        location.hash = "#home";
    }
});

searcherHomeButton.addEventListener("click", () => {
    location.hash = "#search=" + searcherHomeInput.value;
});

searcherButton.addEventListener("click", () => {
    location.hash = "#search=" + searcherInput.value;
});

function navigator() {
    location.hash.startsWith("#trends")
        ? trendsPage()
        : location.hash.startsWith("#search")
        ? searchPage()
        : location.hash.startsWith("#movie")
        ? movieDetailsPage()
        : location.hash.startsWith("#category")
        ? categoriesPage()
        : homePage();

    window.scrollTo(0, 0);
}

const hideSections = () => {
    principalHeader.classList.add("hidden");
    movieDetailsHeader.classList.add("hidden");
    searchHeader.classList.add("hidden");
    categoryHeader.classList.add("hidden");

    mainSection.classList.add("hidden");
    movieDetailsSection.classList.add("hidden");
    genericSection.classList.add("hidden");
};

const homePage = () => {
    hideSections();
    principalHeader.classList.remove("hidden");
    mainSection.classList.remove("hidden");

    getTrendingPreview();
    getTrendingMoviesPreview();
    getTrendingTVShowsPreview();
    getCategories();
};

const searchPage = () => {
    hideSections();
    searchHeader.classList.remove("hidden");
    genericSection.classList.remove("hidden");

    const query = decodeURI(location.hash.split("=")[1]);
    getMoviesBySearch(query);
};

const movieDetailsPage = () => {
    hideSections();
    movieDetailsHeader.classList.remove("hidden");
    movieDetailsSection.classList.remove("hidden");
};

const categoriesPage = () => {
    hideSections();
    categoryHeader.classList.remove("hidden");
    genericSection.classList.remove("hidden");

    categoryTitle.innerText = decodeURI(location.hash.split("-")[1]);
    const id = location.hash.split("-")[0].split("=")[1];
    getMoviesByCategory(id);
};

const trendsPage = () => {
    hideSections();
    categoryHeader.classList.remove("hidden");
    genericSection.classList.remove("hidden");
};
