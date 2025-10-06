import { useState } from "react";
const starContainerStyle = {
  display: "flex",
};
const starStyle = {
  width: "24px",
  height: "24px",
  display: "block",
  cursor: "pointer",
};
export default function RatingStars() {
  const [starCount, setStarCount] = useState(0);
  const [tempStarCount, setTempStarCount] = useState(0);
  function handleHover(num) {
    setTempStarCount(num);
  }
  function handleLeave() {
    setTempStarCount(starCount);
  }
  return (
    <div style={starContainerStyle}>
      {Array.from({ length: 10 }, (cur, i) => {
        return (
          <Star
            key={i}
            num={i + 1}
            starCount={tempStarCount}
            onClick={() => setStarCount(i + 1)}
            onMouseEnter={() => handleHover(i + 1)}
            onMouseLeave={() => handleLeave(i + 1)}
          />
        );
      })}
    </div>
  );
}
function Star({ starCount, num, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={num <= starCount ? "#fcc419" : "none"}
        viewBox="0 0 24 24"
        stroke="#fcc419"
      >
        <path
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        ></path>
      </svg>
    </span>
  );
}
