import "./movies.css";
import { useEffect, useState } from "react";
import { fetchMovies } from "../common/api";
import MovieList from "./movielist";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");

 useEffect(() => {
    fetchMovies({ page, searchTerm })
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, [page, searchTerm]);

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

        <MovieList movies={movies} />
        
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
