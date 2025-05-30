import "./movies.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../actions/movieActions";
import MovieList from "./movielist";
import { useLanguage } from "../common/languageContext";

function Movies() {
  const dispatch = useDispatch();
  const { movies, totalPages, loading, error } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    dispatch(fetchMovies({ page, searchTerm, language }));
  }, [dispatch, page, searchTerm, language]);

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
    window.scrollTo(0, 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    setPage(1);
  };

  return (
    <div className="modern-movies-bg min-vh-100 py-4">
      <div className="container">
        <div className="card shadow-lg border-0 mb-4 modern-header-card">
          <div className="card-body text-center py-4">
            <h2 className="mb-0 fw-bold display-5 text-primary">
              <i className="bi bi-film me-2"></i>Popular Movies
            </h2>
            <p className="text-muted mt-2 mb-0">
              Discover trending movies from around the world
            </p>
            <form
              className="d-flex justify-content-center mt-4"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="form-control w-50 me-2"
                placeholder="Search for a movie..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-search"></i> Search
              </button>
            </form>
          </div>
        </div>

        {loading ? (
          <div className="text-center my-5">Loading...</div>
        ) : error ? (
          <div className="text-center text-danger my-5">{error}</div>
        ) : (
          <MovieList movies={movies} />
        )}

        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            className="btn modern-pg-btn me-2"
            onClick={handlePrev}
            disabled={page === 1}
          >
            <i className="bi bi-chevron-left"></i> Previous
          </button>
          <span className="mx-3 fw-semibold fs-5 text-primary">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn modern-pg-btn ms-2"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Movies;