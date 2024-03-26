import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
