import { fetchMovies as fetchMoviesApi, fetchMovieDetailsApi } from "../common/api";


export const FETCH_MOVIES_REQUEST = "FETCH_MOVIES_REQUEST";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

export const FETCH_MOVIE_DETAILS_REQUEST = "FETCH_MOVIE_DETAILS_REQUEST";
export const FETCH_MOVIE_DETAILS_SUCCESS = "FETCH_MOVIE_DETAILS_SUCCESS";
export const FETCH_MOVIE_DETAILS_FAILURE = "FETCH_MOVIE_DETAILS_FAILURE";

export const fetchMovies = ({ page = 1, searchTerm = "", language = "en-US" }) => (dispatch) => {
  dispatch({ type: FETCH_MOVIES_REQUEST });
  fetchMoviesApi({ page, searchTerm, language })
    .then((response) => {
      dispatch({
        type: FETCH_MOVIES_SUCCESS,
        payload: {
          movies: response.data.results,
          totalPages: response.data.total_pages,
        },
      });
    })
    .catch((error) => {
      dispatch({ type: FETCH_MOVIES_FAILURE, error: error.message });
    });
};


export const fetchMovieDetails = (id, language = "en-US") => (dispatch) => {
  dispatch({ type: FETCH_MOVIE_DETAILS_REQUEST });
  fetchMovieDetailsApi({ id, language })
    .then((response) => {
      dispatch({
        type: FETCH_MOVIE_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: FETCH_MOVIE_DETAILS_FAILURE, error: error.message });
    });
};