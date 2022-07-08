window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

searcherMainSection.addEventListener(
    "click",
    () => (location.hash = "#search")
);

function navigator() {
    console.log({ location });

    if (location.hash.startsWith("#trends")) {
        console.log("trends");
        trendsPage();
    } else if (location.hash.startsWith("#search")) {
        console.log("search");
        searchPage();
    } else if (location.hash.startsWith("#movie=")) {
        console.log("movie details");
        movieDetailsPage();
    } else if (location.hash.startsWith("#category=")) {
        console.log("categories");
        categoriesPage();
    } else {
        console.log("home");
        homePage();
    }
}

const homePage = () => {
    principalHeader.classList.remove("hidden");
    movieDetailsHeader.classList.add("hidden");
    searchHeader.classList.add("hidden");
    categoryHeader.classList.add("hidden");

    mainSection.classList.remove("hidden");
    movieDetailsSection.classList.add("hidden");
    genericSection.classList.add("hidden");

    getTrendingPreview();
    getTrendingMoviesPreview();
    getTrendingTVShowsPreview();
    getCategories();
};

const searchPage = () => {
    principalHeader.classList.add("hidden");
    movieDetailsHeader.classList.add("hidden");
    searchHeader.classList.remove("hidden");
    categoryHeader.classList.add("hidden");

    mainSection.classList.add("hidden");
    movieDetailsSection.classList.add("hidden");
    genericSection.classList.remove("hidden");
};

const movieDetailsPage = () => {
    principalHeader.classList.add("hidden");
    movieDetailsHeader.classList.remove("hidden");
    searchHeader.classList.add("hidden");
    categoryHeader.classList.add("hidden");

    mainSection.classList.add("hidden");
    movieDetailsSection.classList.remove("hidden");
    genericSection.classList.add("hidden");
};

const categoriesPage = () => {
    principalHeader.classList.add("hidden");
    movieDetailsHeader.classList.add("hidden");
    searchHeader.classList.add("hidden");
    categoryHeader.classList.remove("hidden");

    mainSection.classList.add("hidden");
    movieDetailsSection.classList.add("hidden");
    genericSection.classList.remove("hidden");
};

const trendsPage = () => {
    principalHeader.classList.add("hidden");
    movieDetailsHeader.classList.add("hidden");
    searchHeader.classList.add("hidden");
    categoryHeader.classList.remove("hidden");

    mainSection.classList.add("hidden");
    movieDetailsSection.classList.add("hidden");
    genericSection.classList.remove("hidden");
};
