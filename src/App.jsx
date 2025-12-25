import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Logo from "./components/Logo.jsx";
import Search from "./components/Search.jsx";
import Results from "./components/Results.jsx";
import MainContent from "./components/MainContent.jsx";
import Box from "./components/Box.jsx";
import MoviesList from "./components/MoviesList.jsx";
import WatchedListSummary from "./components/WatchedListSummary.jsx";
import WatchedListMovies from "./components/WatchedListMovies.jsx";
import Details from "./components/Details.jsx";

const KEY = "879206e0";

async function fetchData(query, signal, type = "s") {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${KEY}&${type}=${query}`,
    { signal: signal }
  );
  if (!res.ok) throw new Error("fetching data failed...");
  const data = await res.json();
  if (data.Response === "False") throw new Error("No Movies Found!");
  if (type === "s") return data.Search;
  else return data;
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(
    () => JSON.parse(localStorage.getItem("watchedMovies")) || []
  );
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    if (!query) {
      setError("Start Searching For A Movie!");
      return;
    }
    setIsLoading(true);
    setError("");
    fetchData(query, controller.signal)
      .then((data) => {
        const uniqueMovies = new Map();
        for (const movie of data) {
          if (movie.imdbID) uniqueMovies.set(movie.imdbID, movie);
        }
        setMovies(Array.from(uniqueMovies.values()));
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setIsLoading(false));
    return function () {
      controller.abort();
    };
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
