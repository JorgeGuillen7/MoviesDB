const API = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    params: {
        api_key: API_KEY,
    },
});

const createCarousel = (itemsList, carouselContainer) => {
    itemsList.forEach((movie) => {
        let name;
        if (movie.media_type === "movie") {
            name = movie.title;
        } else {
            name = movie.name;
        }

        const movieItem = document.createElement("div");
        movieItem.className = "movie-item";
        const movieImage = document.createElement("img");
        movieImage.src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
        movieImage.alt = name;
        const movieTitle = document.createElement("p");
        movieTitle.className = "movie-item__title";
        movieTitle.innerText = name;

        movieItem.appendChild(movieImage);
        movieItem.appendChild(movieTitle);
        carouselContainer.appendChild(movieItem);
    });
};

const getTrendingPreview = async () => {
    const { data } = await API(`trending/all/week`);
    const results = data.results;

    createCarousel(results, trendingPreview);
};

const getTrendingMoviesPreview = async () => {
    const { data } = await API(`trending/movie/week`);
    const results = data.results;

    createCarousel(results, trendingMoviesPreview);
};

const getTrendingTVShowsPreview = async () => {
    const { data } = await API(`trending/tv/week`);
    const results = data.results;

    createCarousel(results, trendingTVShowsPreview);
};

const getCategories = async () => {
    const { data } = await API(`genre/movie/list`);
    const results = data.genres;

    for (let i = 0; i < 10; i++) {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#`;
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-film";
        const title = document.createElement("span");
        title.innerText = results[i].name;

        li.appendChild(link);
        link.appendChild(icon);
        link.appendChild(title);
        moviesCategories.appendChild(li);
    }

    // results.forEach((category) => {
    //     const li = document.createElement("li");
    //     const link = document.createElement("a");
    //     link.href = `#`;
    //     const icon = document.createElement("i");
    //     icon.className = "fa-solid fa-film";
    //     const title = document.createElement("span");
    //     title.innerText = category.name;

    //     li.appendChild(link);
    //     link.appendChild(icon);
    //     link.appendChild(title);
    //     categoriesContainer.appendChild(li);
    // });
};
