import { getMovies } from "./modules/Movie/service";
import {
  handleFavorite,
  handleSearch,
  handleSearchInput,
  renderMovies,
} from "./modules/Movie/controller";

import "toastify-js/src/toastify.css";
import "./styles/index.css";
import image from "./assets/template.jpg";

document.onreadystatechange = async () => {
  if (document.readyState === "complete") {
    _template.src = image;

    const movies = await getMovies();

    renderMovies(movies);

    _favorite.addEventListener("click", handleFavorite);

    _search.addEventListener("click", handleSearch);

    _searchInput.addEventListener("keyup", handleSearchInput);
  }
};
