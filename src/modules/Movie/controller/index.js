import { getMovies, searchMovies } from "../service";

import {
  getFavoritedMovies,
  removeFavoriteFromStorage,
  saveFavoriteToStorage,
} from "../../Storage";
import { toast } from "../../Toast";

const template = document.querySelector(".card");
const container = document.querySelector(".cards");

const getCardTemplate = () => {
  try {
    const card = template.cloneNode(true);
    card.classList.remove("hidden");

    const [card_image, card_details, card_description] = card.children;

    const [image] = card_image.children;
    const [title] = card_details.children;
    const [, rating, favoriteIcon] = card_details.children[1].children;

    return {
      card,
      image,
      title,
      rating,
      favoriteIcon,
      description: card_description,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const renderMovie = (movie) => {
  try {
    const { card, image, title, rating, favoriteIcon, description } =
      getCardTemplate();

    image.src = movie.image;
    image.alt = `${movie.title} (${movie.year})`;
    title.textContent = `${movie.title} (${movie.year})`;
    rating.textContent = movie.rating;
    favoriteIcon.textContent = movie.isFavorited
      ? "favorite"
      : "favorite_border";

    favoriteIcon.addEventListener("click", () => {
      favoriteIcon.textContent === "favorite"
        ? (favoriteIcon.textContent = "favorite_border")
        : (favoriteIcon.textContent = "favorite");
      saveOrRemoveFavoriteMovie(movie);
    });

    description.textContent = movie.description;

    return card;
  } catch (error) {
    console.log(error.message);
  }
};

export const renderMovies = (movies) => {
  try {
    container.innerHTML = "";

    const cards = movies.map((movie) => renderMovie(movie));

    container.append(...cards);
  } catch (error) {
    console.log(error.message);
  }
};

export const handleFavorite = async (event) => {
  try {
    const { target } = event;

    _searchInput.value = "";

    const favorites = getFavoritedMovies();
    const movies = await getMovies();

    cards.style.display = "none";
    loading.style.display = "flex";

    if (!(favorites.length > 0)) {
      toast("There are no favorites. Please add some favorites.", "info");
      throw new Error("There are no favorites. Please add some favorites.");
    }

    cards.style.display = "none";
    loading.style.display = "flex";

    setTimeout(() => {
      loading.style.display = "none";
      cards.style.display = "";
    }, 3000);

    return target.checked ? renderMovies(favorites) : renderMovies(movies);
  } catch (error) {
    console.log(error.message);
  }
};

export const handleSearch = async (event) => {
  try {
    const { target } = event;

    const searchInputValue = target.parentElement.children[0].value;

    if (_favorite.checked) _favorite.checked = false;

    if (!searchInputValue) {
      toast("Please enter a movie title.", "info");
      throw new Error("Search input is empty, please enter a movie title");
    }

    _searchInput.value = "";

    const movies = await searchMovies(searchInputValue);

    renderMovies(movies);
  } catch (error) {
    console.log(error.message);
  }
};

export const handleSearchInput = async (event) => {
  try {
    const { target } = event;
    const searchInputValue = target.value;

    if (event.key === "Enter") {
      if (!searchInputValue) {
        toast("Please enter a movie title.", "info");
        throw new Error("Search input is empty, please enter a movie title");
      }

      _searchInput.value = "";

      if (_favorite.checked) _favorite.checked = false;

      const movies = await searchMovies(searchInputValue);

      renderMovies(movies);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const saveOrRemoveFavoriteMovie = (movie) => {
  try {
    const favorites = getFavoritedMovies();

    const index = favorites.findIndex(
      (item) => item.title === movie.title && item.isFavorited
    );

    cards.style.display = "none";
    loading.style.display = "flex";

    setTimeout(() => {
      loading.style.display = "none";
      cards.style.display = "";
    }, 2000);

    index === -1
      ? saveFavoriteToStorage(movie)
      : removeFavoriteFromStorage(movie);
  } catch (error) {
    console.log(error.message);
  }
};
