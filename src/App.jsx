import { useState, useEffect } from "react";
import RatingStars from "./components/RatingStars";
import TextExpander from "./components/TextExpander";

const KEY = "879206e0";
const average = (arr) => {
  if (!arr.length) return 0;
  const res = arr.reduce((acc, cur, i, arr) => acc + cur, 0);
  return res / arr.length;
};

async function fetchData(query, type = "s") {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${KEY}&${type}=${query}`
  );
  if (!res.ok) throw new Error("fetching data failed...");
  const data = await res.json();
  if (data.Response === "False") throw new Error("No Movies Found!");
  console.log(data);
  if (type === "s") return data.Search;
  else return data;
}
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (!query) {
      setError("Start Searching For A Movie!");
      return;
    }
    setIsLoading(true);
    setError("");
    fetchData(query)
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [query]);
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Results count={movies.length} />
      </Navbar>
      <MainContent>
        <Box isLoading={isLoading} error={error} query={query}>
          <MoviesList movies={movies} setSelected={setSelected} />
        </Box>
        <Box>
          {!selected ? (
            <>
              <WatchedListSummary watched={watched} />
              <WatchedListMovies watched={watched} />
            </>
          ) : (
            <Details
              selected={selected}
              isLoading={isLoading2}
              setSelected={setSelected}
              setWatched={setWatched}
              watched={watched}
              setIsLoading={setIsLoading2}
            />
          )}
        </Box>
      </MainContent>
    </>
  );
}
function Details({
  selected,
  setWatched,
  isLoading,
  setSelected,
  setIsLoading,
  watched,
}) {
  const [movie, setMovie] = useState(null);
  const [starRating, setStarRating] = useState(0);
  const found = watched.find((cur) => cur.imdbID === selected);
  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      try {
        const res = await fetchData(selected, "i");
        setMovie(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [selected]);

  useEffect(() => {
    if (!movie) return;
    document.title = movie.Title;
    return () => {
      document.title = "usepopcorn";
    };
  }, [movie]);
  return (
    <>
      {isLoading || !movie ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={() => setSelected(null)}>
              ←
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} • {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>8.1 IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {found ? (
                `you have rated this movie by: ${found.userRating}`
              ) : (
                <RatingStars setStarRating={setStarRating} />
              )}
              {starRating > 0 && !found ? (
                <button
                  className="btn-add"
                  onClick={() => {
                    setWatched([
                      ...watched,
                      { ...movie, userRating: starRating },
                    ]);
                    setSelected(null);
                  }}
                >
                  Add to List
                </button>
              ) : null}
            </div>
            <TextExpander>{movie.Plot}</TextExpander>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </div>
      )}
    </>
  );
}
function MessageError({ message, query }) {
  return <p className="error">{query ? `⛔️ ${message}` : message}</p>;
}
function Loader() {
  // return <p className="loader">Loading...</p>;
  const spinner = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M11 2v4c0 0.552 0.448 1 1 1s1-0.448 1-1v-4c0-0.552-0.448-1-1-1s-1 0.448-1 1zM11 18v4c0 0.552 0.448 1 1 1s1-0.448 1-1v-4c0-0.552-0.448-1-1-1s-1 0.448-1 1zM4.223 5.637l2.83 2.83c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-2.83-2.83c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414zM15.533 16.947l2.83 2.83c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-2.83-2.83c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414zM2 13h4c0.552 0 1-0.448 1-1s-0.448-1-1-1h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1zM18 13h4c0.552 0 1-0.448 1-1s-0.448-1-1-1h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1zM5.637 19.777l2.83-2.83c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-2.83 2.83c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0zM16.947 8.467l2.83-2.83c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-2.83 2.83c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z"></path>
    </svg>
  );

  return <div className="spinner">{spinner}</div>;
}
function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Results({ count }) {
  return (
    <p className="num-results">
      Found <strong>{count}</strong> results
    </p>
  );
}
function MainContent({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children, isLoading, error, query = "" }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToogleBtn setIsOpen={setIsOpen} open={isOpen} />
      {isOpen &&
        (isLoading && !error ? (
          <Loader />
        ) : error ? (
          <MessageError message={error} query={query} />
        ) : (
          children
        ))}
    </div>
  );
}
function MoviesList({ movies, setSelected }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem movie={movie} setSelected={setSelected} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function ToogleBtn({ open, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {open ? "–" : "+"}
    </button>
  );
}
function MovieItem({ movie, setSelected }) {
  return (
    <li id={movie.imdbID} onClick={() => setSelected(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <InfoItem icon="🗓">{movie.Year}</InfoItem>
      </div>
    </li>
  );
}
function InfoItem({ icon, children }) {
  return (
    <p>
      <span>{icon}</span>
      <span>{children}</span>
    </p>
  );
}
function WatchedListMovies({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <InfoItem icon="⭐️">{movie.imdbRating}</InfoItem>
            <InfoItem icon="🌟">{movie.userRating}</InfoItem>
            <InfoItem icon="⏳">{parseFloat(movie.Runtime)} min</InfoItem>
          </div>
        </li>
      ))}
    </ul>
  );
}
function WatchedListSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => +movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => +movie.userRating));
  const avgRuntime = average(watched.map((movie) => parseFloat(movie.Runtime)));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <InfoItem icon="#️⃣">{watched.length} movies</InfoItem>
        <InfoItem icon="⭐️">{avgImdbRating.toFixed()}</InfoItem>
        <InfoItem icon="🌟">
          {avgUserRating === 0 ? 0 : avgUserRating.toFixed(2)}
        </InfoItem>
        <InfoItem icon="⏳">
          {avgRuntime === 0 ? 0 : avgRuntime.toFixed(2)} min
        </InfoItem>
      </div>
    </div>
  );
}
