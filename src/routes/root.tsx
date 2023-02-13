import { createBrowserRouter, Route, Link } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../pages/Login";
import routeDashboard from "./dashboard";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
   },
   {
      path: "/about",
      element: <About />,
   },
   {
      path: "/login",
      element: <Login />,
   },
   ...routeDashboard,
]);
export default router;
