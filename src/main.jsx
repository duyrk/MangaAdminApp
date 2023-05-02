import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Welcome from "./routes/welcome";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:"/:role/dashboard",
        element: <Dashboard></Dashboard>
      }
    ]
  },
  {
    path: "/welcome",
    element: <Welcome></Welcome>
  },  {
    path: "/login",
    element: <Login></Login>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);