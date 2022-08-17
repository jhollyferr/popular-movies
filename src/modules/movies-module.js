import {
  getFavoritedMovies,
  getMovies,
  removeFavoriteFromStorage,
  saveFavoriteToStorage,
  searchMovies,
} from "./data-movies-module.js";

const favoritesFiltered = async () => {
  try {
    const movies = await getMovies();
    return movies.filter((movie) => movie.isFavorited);
  } catch (error) {
    console.log(error.message);
  }
};

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
      saveOrFavoriteMovie(movie);
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

    const favorites = await favoritesFiltered();
    const movies = await getMovies();

    if (!favorites.length)
      throw new Error("There are no favorites. Please add some favorites.");

    return target.checked ? renderMovies(favorites) : renderMovies(movies);
  } catch (error) {
    console.log(error.message);
  }
};

export const handleSearch = async (event) => {
  try {
    const { target } = event;

    const searchInputValue = target.parentElement.children[0].value;

    if (!searchInputValue)
      throw new Error("Search input is empty, please enter a movie title");

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

    if (!searchInputValue)
      throw new Error("Search input is empty, please enter a movie title");

    if (event.key === "Enter") {
      const movies = await searchMovies(searchInputValue);

      renderMovies(movies);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const saveOrFavoriteMovie = (movie) => {
  try {
    const favorites = getFavoritedMovies();

    const index = favorites.findIndex(
      (item) => item.title === movie.title && item.isFavorited
    );

    index === -1
      ? saveFavoriteToStorage(movie)
      : removeFavoriteFromStorage(movie);
  } catch (error) {
    console.log(error.message);
  }
};
