import { STORAGE_KEY } from "../../secret";
import { toast } from "../Toast";

export const getFavoritedMovies = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

export const saveFavoriteToStorage = (movie) => {
  try {
    const favorites = getFavoritedMovies();

    movie.isFavorited = true;

    const data = [...favorites, movie];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    toast("Movie added to favorites", "success");
  } catch (error) {
    toast("Something went wrong", "error");
    console.log(error.message);
  }
};

export const removeFavoriteFromStorage = (movie) => {
  try {
    const favorites = getFavoritedMovies();

    const index = favorites.findIndex((item) => item.title === movie.title);

    favorites.splice(index, 1);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));

    toast("Movie removed from favorites", "info");
  } catch (error) {
    toast("Something went wrong", "error");
    console.log(error.message);
  }
};
