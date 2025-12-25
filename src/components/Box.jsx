import { useState } from "react";
import ToogleBtn from "./ToogleBtn.jsx";
import Loader from "./Loader.jsx";
import MessageError from "./MessageError.jsx";

export default function Box({ children, isLoading, error, query = "" }) {
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
