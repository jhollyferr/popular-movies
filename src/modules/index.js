import { movies } from "./data-movies.js";
import { handleFavorite, renderMovies } from "./utils.js";

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    renderMovies(movies);
    _favorite.addEventListener("click", handleFavorite);
  }
};
