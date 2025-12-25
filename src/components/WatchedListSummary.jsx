import InfoItem from "./InfoItem.jsx";

const average = (arr) => {
  if (!arr.length) return 0;
  const res = arr.reduce((acc, cur, i, arr) => acc + cur, 0);
  return res / arr.length;
};

export default function WatchedListSummary({ watched }) {
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
