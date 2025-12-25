import { useState, useEffect } from "react";
import RatingStars from "./RatingStars.jsx";
import TextExpander from "./TextExpander.jsx";
import Loader from "./Loader.jsx";

async function fetchData(query, signal, type = "s") {
  const KEY = "879206e0";
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

export default function Details({
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
    const controller = new AbortController();
    async function getMovieDetails() {
      setIsLoading(true);
      try {
        const res = await fetchData(selected, controller.signal, "i");
        setMovie(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
    return function () {
      controller.abort();
    };
  }, [selected]);
  useEffect(
    function () {
      function handleKeyDown(e) {
        if (e.code === "Escape") if (selected) setSelected(null);
      }
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [selected]
  );
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
        <div
          className="details"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSelected(null);
            }
          }}
        >
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
                    const newWatchedMovies = [
                      ...watched,
                      { ...movie, userRating: starRating },
                    ];
                    setWatched(newWatchedMovies);
                    localStorage.setItem(
                      "watchedMovies",
                      JSON.stringify(newWatchedMovies)
                    );
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
