import InfoItem from "./InfoItem";

export default function WatchedListMovies({ watched }) {
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