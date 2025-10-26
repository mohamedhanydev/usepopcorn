export default function ToogleBtn({ open, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {open ? "–" : "+"}
    </button>
  );
}