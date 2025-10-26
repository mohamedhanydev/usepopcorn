export default function MessageError({ message, query }) {
  return <p className="error">{query ? `⛔️ ${message}` : message}</p>;
}