import "./moviedetalis.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetchMovieDetails} from "../common/api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  if (!movie) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg border-0 movie-details-card">
            <div className="row g-0">
              {movie.poster_path && (
                <div className="col-md-4 d-flex align-items-center bg-dark rounded-start">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="img-fluid rounded-start w-100"
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                </div>
              )}
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title mb-3 d-flex align-items-center">
                    {movie.title}
                    <span className="badge bg-secondary fs-6 ms-3">
                      {movie.release_date
                        ? movie.release_date.slice(0, 4)
                        : "N/A"}
                    </span>
                  </h2>
                  <div className="mb-3">
                    <span className="badge bg-warning text-dark me-2">
                      <i className="bi bi-star-fill me-1"></i>
                      {movie.vote_average}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Release Date:</strong> {movie.release_date} <br />
                    <strong>Runtime:</strong> {movie.runtime} min <br />
                    <strong>Genres:</strong>{" "}
                    {movie.genres && movie.genres.map((g) => g.name).join(", ")}
                  </div>
                  <p
                    className="card-text mt-3"
                    style={{ fontSize: "1.15rem", lineHeight: 1.6 }}
                  >
                    {movie.overview}
                  </p>
                  {movie.homepage && (
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary mt-3"
                    >
                      Official Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
