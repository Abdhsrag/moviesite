import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../actions/favAction";
import { useState, useRef, useEffect } from "react";
import { fetchMovies } from "../common/api";
import { Link } from "react-router-dom";
import "./todo.css";

function Todo() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchAreaRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    try {
      const response = await fetchMovies({ searchTerm: inputValue });
      setSearchResults(response.data.results);
    } catch (error) {
      setSearchResults([]);
    }
    setSearching(false);
  };

  const isFavorite = (movie) => favorites.some((m) => m.id === movie.id);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(event.target)
      ) {
        setSearchResults([]);
        setInputValue("");
      }
    }
    if (searchResults.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchResults]);

  return (
    <div className="todo-bg d-flex align-items-center justify-content-center">
      <div className="card shadow-lg todo-glass-card border-0">
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-5 fw-bold todo-title">     
            Your <i className="bi bi-heart-fill text-danger mx-2"></i> Movies
            <span className="badge bg-danger ms-2 todo-badge">
              {favorites.length}
            </span>
          </h2>

          <div ref={searchAreaRef}>
            <form
              className="d-flex justify-content-center mb-4 todo-form"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="form-control w-50 rounded-pill shadow-sm"
                placeholder="Search for a movie to add..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="btn btn-primary rounded-pill px-4 fw-semibold d-flex align-items-center"
                type="submit"
                disabled={searching}
              >
                <i className="bi bi-search me-1"></i> Search
              </button>
            </form>

            {searchResults.length > 0 && (
              <div className="mb-4">
                <h5 className="fw-bold mb-3 text-primary">
                  <i className="bi bi-search me-2"></i>Search Results
                </h5>
                <ul className="list-group">
                  {searchResults.map((movie) => (
                    <li
                      key={movie.id}
                      className="list-group-item d-flex justify-content-between align-items-center todo-list-item"
                    >
                      <Link
                        to={`/movies/${movie.id}`}
                        className="d-flex align-items-center text-decoration-none flex-grow-1"
                        style={{ color: "#1e293b" }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="todo-movie-img"
                        />
                        <span className="fw-semibold">{movie.title}</span>
                        <span className="badge bg-secondary ms-2">
                          {movie.release_date?.slice(0, 4)}
                        </span>
                      </Link>
                      <button
                        className={`btn btn-sm ms-2 d-flex align-items-center rounded-pill px-3 ${
                          isFavorite(movie) ? "btn-secondary" : "btn-success"
                        }`}
                        onClick={() => {
                          if (!isFavorite(movie)) dispatch(addFavorite(movie));
                        }}
                        disabled={isFavorite(movie)}
                        style={{ fontWeight: 500 }}
                      >
                        <i
                          className={`bi ${
                            isFavorite(movie) ? "bi-heart-fill" : "bi-heart"
                          } me-1`}
                        ></i>
                        {isFavorite(movie) ? "Added" : "Add"}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="todo-list mt-4">
            <h4 className="fw-bold mb-3 text-primary">
              <i className="bi bi-list-stars me-2"></i>Favorites List
            </h4>
            {favorites.length === 0 ? (
              <div className="text-center text-muted py-5">
                <i className="bi bi-emoji-frown fs-1"></i>
                <div>No favorite movies yet.</div>
              </div>
            ) : (
              <ul className="list-group">
                {favorites.map((movie) => (
                  <li
                    key={movie.id}
                    className="list-group-item d-flex justify-content-between align-items-center todo-list-item"
                  >
                    <Link
                      to={`/movies/${movie.id}`}
                      className="d-flex align-items-center text-decoration-none flex-grow-1"
                      style={{ color: "#1e293b" }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="todo-movie-img"
                      />
                      <span className="fw-semibold">{movie.title}</span>
                      <span className="badge bg-secondary ms-2">
                        {movie.release_date?.slice(0, 4)}
                      </span>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm ms-2 d-flex align-items-center rounded-pill px-3"
                      onClick={() => dispatch(removeFavorite(movie.id))}
                      style={{ fontWeight: 500 }}
                    >
                      <i className="bi bi-trash me-1"></i> Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;