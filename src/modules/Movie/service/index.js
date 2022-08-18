import { getFavoritedMovies } from "../../Storage";
import { API } from "../../Service";

let defaultOptions = {
  params: {
    language: "en-US",
    page: 1,
  },
};

class Movie {
  constructor(movie) {
    this.image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.title = movie.title;
    this.rating = movie.vote_average;
    this.year = new Date(movie.release_date).getFullYear();
    this.description = movie.overview;
    this.isFavorited = false;
  }
}

const defineMovieData = (movieData, favorites) => {
  const movie = new Movie(movieData);

  const isFavorited = favorites.find(
    (favorite) => favorite.title === movie.title
  );

  return isFavorited ? isFavorited : movie;
};

export const getMovies = async () => {
  try {
    const {
      status,
      data: { results },
    } = await API.get("/movie/popular", defaultOptions);

    cards.style.display = "none";
    loading.style.display = "flex";

    setTimeout(() => {
      loading.style.display = "none";
      cards.style.display = "";
    }, 3000);

    return [...results].map((movie) =>
      defineMovieData(movie, getFavoritedMovies())
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const searchMovies = async (title) => {
  try {
    defaultOptions.params["query"] = title;

    const {
      status,
      data: { results },
    } = await API.get("/search/movie", defaultOptions);

    cards.style.display = "none";
    loading.style.display = "flex";

    setTimeout(() => {
      loading.style.display = "none";
      cards.style.display = "";
    }, 3000);

    return [...results].map((movie) =>
      defineMovieData(movie, getFavoritedMovies())
    );
  } catch (error) {
    console.log(error.message);
  }
};
