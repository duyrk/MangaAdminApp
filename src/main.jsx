import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Welcome from "./routes/welcome";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard";
import Add from "./routes/add";
import "bootstrap/dist/css/bootstrap.min.css";
import Edit from "./routes/edit";
import Addchapter from "./routes/addchapter";
import Test from "./routes/test";
import Feature from "./routes/feature";
import AddGenre from "./routes/addGenre";
import Character from "./routes/character";
import AddCharacter from "./routes/addCharacter";
import EditCharacter from "./routes/editcharacter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/:role/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/add",
        element: <Add></Add>,
      },
      ,
      {
        path: "/:mangaId/edit",
        element: <Edit></Edit>,
      },
      {
        path: "/:mangaId/edit/characters",
        element: <Character></Character>,
      },
      {
        path: "/:mangaId/edit/characters/:characterId/edit",
        element: <EditCharacter></EditCharacter>,
      },
      {
        path: "/:mangaId/edit/characters/add",
        element: <AddCharacter></AddCharacter>,
      },
      ,
      {
        path: "/:mangaId/edit/add-chapter",
        element: <Addchapter></Addchapter>,
      },
      ,
      {
        path: "/feature",
        element: <Feature></Feature>,
      },
      ,
      {
        path: "/genre/add",
        element: <AddGenre></AddGenre>,
      },
    ],
  },
  {
    path: "/welcome",
    element: <Welcome></Welcome>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  ,
  {
    path: "/test",
    element: <Test></Test>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
