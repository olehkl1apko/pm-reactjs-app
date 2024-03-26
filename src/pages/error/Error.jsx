import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function error() {
  const error = useRouteError();

  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
