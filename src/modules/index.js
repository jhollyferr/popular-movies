import { getMovies } from "./data-movies-module.js";
import {
  handleFavorite,
  handleSearch,
  handleSearchInput,
  renderMovies,
} from "./movies-module.js";

document.onreadystatechange = async () => {
  if (document.readyState === "complete") {
    const movies = await getMovies();

    renderMovies(movies);

    _favorite.addEventListener("click", handleFavorite);

    _search.addEventListener("click", handleSearch);

    _searchInput.addEventListener("keyup", handleSearchInput);
  }
};
