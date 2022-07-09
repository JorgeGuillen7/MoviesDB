window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

searcherMainSection.addEventListener(
    "click",
    () => (location.hash = "#search")
);

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
