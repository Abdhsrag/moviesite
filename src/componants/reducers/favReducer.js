import { ADD_FAVORITE, REMOVE_FAVORITE } from "../actions/favAction";

const initialState = {
  favorites: [],
};

export default function favReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      if (state.favorites.find((m) => m.id === action.payload.id)) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((m) => m.id !== action.payload),
      };
    default:
      return state;
  }
}