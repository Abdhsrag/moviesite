import MovieCard from "./moviecard";

function MovieList({ movies }) {
  return (
    <div className="row">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;