import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import "./Error.css";

export default function error() {
  const error = useRouteError();

  return (
    <>
      <div className="wrapper">
        <h1>Oops</h1>
        <p>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error occurred."}
        </p>
      </div>
    </>
  );
}
