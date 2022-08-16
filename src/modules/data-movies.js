import { API } from "./service.js";

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

export const getMovies = async () => {
  try {
    const {
      status,
      data: { results },
    } = await API.get("/movie/popular", {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return [...results].map((item) => new Movie(item));
  } catch (error) {
    console.log(error.message);
    console.error(error);
  }
};
