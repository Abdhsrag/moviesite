import "./moviecard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../actions/favAction";

function MovieCard({
  movie,
  isFav: isFavProp,
  onFavorite,
  favoriteButtonText,
  favoriteButtonDisabled,
}) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  // Use prop if provided, otherwise fallback to redux
  const isFav = typeof isFavProp === "boolean" ? isFavProp : favorites.some((m) => m.id === movie.id);

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite();
    } else {
      if (isFav) dispatch(removeFavorite(movie.id));
      else dispatch(addFavorite(movie));
    }
  };

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 border-0 shadow movie-card-hover movie-card-gradient">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="card-img-top rounded-top"
            alt={movie.title}
            style={{ height: "350px", objectFit: "cover" }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title d-flex justify-content-between align-items-center fw-bold">
            <span>{movie.title}</span>
            <span className="badge bg-secondary ms-2">{releaseYear}</span>
          </h5>
          <span
            className="badge bg-warning text-dark mb-2 align-self-start shadow-sm"
            style={{ fontSize: "1rem" }}
          >
            <i className="bi bi-star-fill me-1"></i>
            {movie.vote_average}
          </span>
          <p
            className="card-text text-muted"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "60px",
              fontSize: "1rem",
            }}
          >
            {movie.overview}
          </p>
          <div className="mt-auto">
            <Link
              to={`/movies/${movie.id}`}
              className="btn btn-primary w-100 fw-semibold rounded-pill"
            >
              <i className="bi bi-info-circle me-1"></i>
              Details
            </Link>
            <button
              className="btn"
              onClick={handleFavorite}
              aria-label="Toggle Favorite"
              disabled={favoriteButtonDisabled}
            >
              <i
                className={`bi ${
                  isFav ? "bi-heart-fill text-danger" : "bi-heart"
                } fs-4`}
              ></i>
              {favoriteButtonText && (
                <span className="ms-1">{favoriteButtonText}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;