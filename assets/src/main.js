const API_URL = "https://api.themoviedb.org/3/";

const getTrendingPreview = async () => {
    const res = await fetch(`${API_URL}trending/all/week?api_key=${API_KEY}`);
    const data = await res.json();

    const results = data.results;
    const moviesContainer = document.querySelector("#trendingPreview");

    results.map((movie) => {
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
        moviesContainer.appendChild(movieItem);
    });
};

const getTrendingMoviesPreview = async () => {
    const res = await fetch(`${API_URL}trending/movie/week?api_key=${API_KEY}`);
    const data = await res.json();

    const results = data.results;
    const moviesContainer = document.querySelector("#trendingMoviesPreview");

    results.map((movie) => {
        const { title, poster_path } = movie;
        const movieItem = document.createElement("div");
        movieItem.className = "movie-item";
        const movieImage = document.createElement("img");
        movieImage.src = `https://image.tmdb.org/t/p/w300/${poster_path}`;
        movieImage.alt = title;
        const movieTitle = document.createElement("p");
        movieTitle.className = "movie-item__title";
        movieTitle.innerText = title;

        movieItem.appendChild(movieImage);
        movieItem.appendChild(movieTitle);
        moviesContainer.appendChild(movieItem);
    });
};

const getTrendingTVShowsPreview = async () => {
    const res = await fetch(`${API_URL}trending/tv/week?api_key=${API_KEY}`);
    const data = await res.json();

    const results = data.results;
    const moviesContainer = document.querySelector("#trendingTVShowsPreview");

    results.map((movie) => {
        const { name, poster_path } = movie;
        const movieItem = document.createElement("div");
        movieItem.className = "movie-item";
        const movieImage = document.createElement("img");
        movieImage.src = `https://image.tmdb.org/t/p/w300/${poster_path}`;
        movieImage.alt = name;
        const movieTitle = document.createElement("p");
        movieTitle.className = "movie-item__title";
        movieTitle.innerText = name;

        movieItem.appendChild(movieImage);
        movieItem.appendChild(movieTitle);
        moviesContainer.appendChild(movieItem);
    });
};

const getCategories = async () => {
    const res = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();

    const results = data.genres;
    const categoriesContainer = document.querySelector("#moviesCategories");

    console.log(results);

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
        categoriesContainer.appendChild(li);
    }

    // results.map((category) => {
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

getTrendingPreview();
getTrendingMoviesPreview();
getTrendingTVShowsPreview();
getCategories();
