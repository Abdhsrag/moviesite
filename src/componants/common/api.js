import axios from "axios";

export const fetchMovies = async ({
  page = 1,
  searchTerm = "",
  language = "en-US",
}) => {
  const apiKey = "2d34604310533209ef7ea81e57deefc2";
  const baseUrl = "https://api.themoviedb.org/3";
  let url = "";

  if (searchTerm) {
    url = `${baseUrl}/search/movie?api_key=${apiKey}&language=${language}&query=${encodeURIComponent(
      searchTerm
    )}&page=${page}`;
  } else {
    url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=${language}&page=${page}`;
  }

  return axios.get(url);
};

export const fetchMovieDetailsApi = ({ id, language = "en-US" }) => {
  const apiKey = "2d34604310533209ef7ea81e57deefc2";
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${language}`
  );
};
