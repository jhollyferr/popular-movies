import { getMovies } from "./data-movies.js";
import { handleFavorite, renderMovies } from "./utils.js";

document.onreadystatechange = async () => {
  if (document.readyState === "complete") {
    const movies = await getMovies();

    renderMovies(movies);

    _favorite.addEventListener("click", handleFavorite);
    console.log("Movies: ", await getMovies());
  }
};
