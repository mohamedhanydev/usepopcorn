import { useState } from "react";
export default function TextExpander({
  expanded = false,
  className = "",
  buttonColor = "blue",
  expandButtonText = "Show More",
  collapseButtonText = "Show Less",
  collapsedNumWords = 20,
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const collapsedText = children
    .split(" ")
    .slice(0, collapsedNumWords + 1)
    .join(" ");
  return (
    <div className={className}>
      {isExpanded ? (
        <>
          {children}{" "}
          <Button
            buttonColor={buttonColor}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {collapseButtonText}
          </Button>
        </>
      ) : (
        <>
          {collapsedText}
          {"... "}
          <Button
            buttonColor={buttonColor}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {expandButtonText}
          </Button>
        </>
      )}
    </div>
  );
}
function Button({ buttonColor, onClick, children }) {
  return (
    <span
      role="button"
      style={{ color: buttonColor, cursor: "pointer" }}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
