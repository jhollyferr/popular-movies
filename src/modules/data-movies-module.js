import { STORAGE_KEY } from "../secret/index.js";
import { API } from "./service-module.js";

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

export const getFavoritedMovies = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

export const saveFavoriteToStorage = (movie) => {
  try {
    const favorites = getFavoritedMovies();

    movie.isFavorited = true;

    const data = [...favorites, movie];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const removeFavoriteFromStorage = (movie) => {
  try {
    const favorites = getFavoritedMovies();

    const index = favorites.findIndex((item) => item.title === movie.title);

    favorites.splice(index, 1);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.log(error.message);
  }
};

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

    return [...results].map((movie) =>
      defineMovieData(movie, getFavoritedMovies())
    );
  } catch (error) {
    console.log(error.message);
  }
};
