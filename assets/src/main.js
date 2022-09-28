const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

const lazyLoader = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList = "fade";
        const urlImg = entry.target.getAttribute("data-img");
        entry.target.setAttribute("src", urlImg);
        console.log(urlImg);
        const name = entry.target.getAttribute("data-name");
        entry.target.setAttribute("alt", name);
        lazyLoader.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const createContainer = (itemsList, carouselContainer) => {
  carouselContainer.innerHTML = "";
  itemsList.forEach((movie) => {
    let name;
    if (movie.title) {
      name = movie.title;
    } else {
      name = movie.name;
    }

    const movieItem = document.createElement("div");
    movieItem.classList = "movie-item fade";
    const movieImage = document.createElement("img");
    movieImage.setAttribute(
      "data-img",
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        : "https://i.postimg.cc/W3g7CzPZ/Movies-DB-not-Found.png"
    );
    movieImage.setAttribute("data-name", name);
    const movieTitle = document.createElement("p");
    movieTitle.classList = "movie-item__title fade-text";
    movieTitle.innerText = name;

    movieItem.addEventListener("click", () => {
      if (movie.title) {
        location.hash = `#movie=${movie.id}`;
      } else {
        location.hash = `#tv=${movie.id}`;
      }
    });

    lazyLoader.observe(movieImage);

    movieItem.appendChild(movieImage);
    movieItem.appendChild(movieTitle);
    carouselContainer.appendChild(movieItem);
  });
};

const getTrendingData = async (mediaType, container) => {
  const { data } = await API(`trending/${mediaType}/week`);
  const results = data.results;

  createContainer(results, container);
};

const getTrendingPreview = () => getTrendingData("all", trendingPreview);

const getTrendingMoviesPreview = () =>
  getTrendingData("movie", trendingMoviesPreview);

const getTrendingTVShowsPreview = () =>
  getTrendingData("tv", trendingTVShowsPreview);

// const getTrending = () => getTrendingData("all", genericSection);
// const getTrendingMovies = () => getTrendingData("movie", genericSection);
// const getTrendingTVShows = () => getTrendingData("tv", genericSection);

const getCategories = async () => {
  moviesCategories.innerHTML = "";
  const { data } = await API(`genre/movie/list`);
  const results = data.genres;

  for (let i = 0; i < 10; i++) {
    const li = document.createElement("li");
    li.classList = "fade";
    const link = document.createElement("a");
    link.href = `#category=${results[i].id}-${results[i].name}`;
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-film";
    const title = document.createElement("span");
    title.innerText = results[i].name;

    li.appendChild(link);
    link.appendChild(icon);
    link.appendChild(title);
    moviesCategories.appendChild(li);
  }
};

const getMoviesByCategory = async (id) => {
  const { data } = await API(`discover/movie`, {
    params: {
      with_genres: id,
    },
  });
  const results = data.results;

  createContainer(results, genericSection);
};

const getMoviesBySearch = async (query) => {
  const { data } = await API(`search/movie`, {
    params: {
      query,
    },
  });
  const results = data.results;

  if (query !== "search") {
    createContainer(results, genericSection);
  } else {
    genericSection.innerHTML = "";
  }
};

const getMovieDetails = async (id, mediaType) => {
  let { data } = await API(`${mediaType}/${id}`);

  let name;
  if (data.title) {
    name = data.title;
  } else {
    name = data.name;
  }

  data.poster_path
    ? (movieDetailsHeader.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.25) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    top / 100% no-repeat url(https://image.tmdb.org/t/p/w1280/${data.poster_path})`)
    : (movieDetailsHeader.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.25) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    top / 100% no-repeat url(https://i.postimg.cc/0rRGfq4f/Movies-DB-not-Found-full.png)`);
  movieDetailsTitle.innerText = name;
  movieDetailsDescription.innerText = data.overview;
  movieDetailsCategories.innerHTML = "";
  data.genres.forEach((genre) => {
    movieDetailsCategories.innerHTML += `<p>${genre.name}</p>`;
  });
};

const getSimilarMovies = async (id, mediaType) => {
  const { data } = await API(`${mediaType}/${id}/similar`);
  const results = data.results;
  console.log(results);

  createContainer(results, similarMovies);
};
