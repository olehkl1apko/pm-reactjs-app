import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import ErrorPage from "./pages/error/Error";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: user ? <Dashboard /> : <Navigate to="/login" />,
        },
        {
          path: "/create",
          element: user ? <Create /> : <Navigate to="/login" />,
        },
        {
          path: "/projects/:id",
          element: user ? <Project /> : <Navigate to="/login" />,
        },
        { path: "/login", element: !user ? <Login /> : <Navigate to="/" /> },
        { path: "/signup", element: !user ? <Signup /> : <Navigate to="/" /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
