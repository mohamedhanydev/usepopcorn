import MovieItem from "./MovieItem";

export default function MoviesList({ movies, setSelected }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem movie={movie} setSelected={setSelected} key={movie.imdbID} />
      ))}
    </ul>
  );
}