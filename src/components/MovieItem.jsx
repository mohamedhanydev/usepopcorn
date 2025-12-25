import InfoItem from "./InfoItem.jsx";

export default function MovieItem({ movie, setSelected }) {
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
