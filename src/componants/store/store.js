import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import favReducer from "../reducers/favReducer";
import movieReducer from "../reducers/movieReducer";
import movieDetailsReducer from "../reducers/movieDetailsReducer";


const rootReducer = combineReducers({
  favorites: favReducer,
  movies: movieReducer,
    movieDetails: movieDetailsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;