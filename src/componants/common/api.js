import axios from "axios";

const apiKey = "2d34604310533209ef7ea81e57deefc2";
const baseURL = "https://api.themoviedb.org/3/";

export function fetchMovies({ page = 1, searchTerm = "" }) {
  if (searchTerm.trim()) {
    return axios.get(`${baseURL}search/movie`, {
      params: { api_key: apiKey, query: searchTerm, page },
    });
  } else {
    return axios.get(`${baseURL}movie/popular`, {
      params: { api_key: apiKey, page },
    });
  }
}

export function fetchMovieDetails(id) {
  return axios.get(`${baseURL}movie/${id}`, {
    params: { api_key: apiKey },
  });
}