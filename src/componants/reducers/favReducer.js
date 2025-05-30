import { ADD_FAVORITE, REMOVE_FAVORITE } from "../actions/favAction";

const initialState = [];

export default function favReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.payload];
    case REMOVE_FAVORITE:
      return state.filter((movie) => movie.id !== action.payload);
    default:
      return state;
  }
}