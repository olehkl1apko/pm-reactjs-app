import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import ErrorPage from "./pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/create", element: <Create /> },
      { path: "/projects/:id", element: <Project /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
