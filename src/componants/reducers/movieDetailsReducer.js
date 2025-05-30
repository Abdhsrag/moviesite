import {
  FETCH_MOVIE_DETAILS_REQUEST,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,
} from "../actions/movieActions";

const initialState = {
  movie: null,
  loading: false,
  error: null,
};

export default function movieDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIE_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MOVIE_DETAILS_SUCCESS:
      return { ...state, loading: false, movie: action.payload };
    case FETCH_MOVIE_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}