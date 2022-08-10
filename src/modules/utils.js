import { movies } from "./data-movies.js";

const favoritesFiltered = movies.filter((movie) => movie.isFavorited);

const template = document.querySelector(".card");
const container = document.querySelector(".cards");

const getCardTemplate = () => {
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
};

const renderMovie = (movie) => {
  const { card, image, title, rating, favoriteIcon, description } =
    getCardTemplate();

  image.src = movie.image;
  image.alt = `${movie.title} (${movie.year})`;
  title.textContent = `${movie.title} (${movie.year})`;
  rating.textContent = movie.rating;
  favoriteIcon.textContent = movie.isFavorited ? "favorite" : "favorite_border";
  description.textContent = movie.description;

  return card;
};

export const renderMovies = (movies) => {
  container.innerHTML = "";

  const cards = movies.map((movie) => renderMovie(movie));

  container.append(...cards);
};

export const handleFavorite = (event) => {
  const { target } = event;

  return target.checked
    ? renderMovies(favoritesFiltered)
    : renderMovies(movies);
};
