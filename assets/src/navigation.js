window.addEventListener(
    "DOMContentLoaded",
    () => {
        navigator();
        window.history.pushState({ loadUrl: window.location.href }, null, "");
    },
    false
);
window.addEventListener("hashchange", navigator, false);

const backPage = () => {
    const stateLoad = window.history.state ? window.history.state.loadUrl : "";
    if (stateLoad.includes("#")) {
        window.location.hash = "";
    } else {
        window.history.back();
    }
};

backButton.addEventListener("click", backPage);
closeButton.addEventListener("click", backPage);

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
        : location.hash.startsWith("#tv")
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

    const id = location.hash.split("=")[1];
    const mediaType = location.hash.split("=")[0].split("#")[1];
    getMovieDetails(id, mediaType);
    getSimilarMovies(id, mediaType);
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

    const mediaType = location.hash.split("=")[1];
    getTrendingData(mediaType, genericSection);

    switch (mediaType) {
        case "all":
            categoryTitle.innerText = "Trending";
            break;
        case "movie":
            categoryTitle.innerText = "Trending Movies";
            break;
        case "tv":
            categoryTitle.innerText = "Trending TV Shows";
            break;
        default:
            break;
    }
};
