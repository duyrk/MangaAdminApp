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
import EditChapter from "./routes/editChapter";
import { Provider } from "react-redux";
import { store } from "./assets/redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/cpanel/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/cpanel/manga/add",
        element: <Add></Add>,
      },
      {
        path: "/cpanel/manga/:mangaId/edit",
        element: <Edit></Edit>,
      },
      {
        path: "/cpanel/manga/:mangaId/edit/characters",
        element: <Character></Character>,
      },
      {
        path: "/cpanel/manga/:mangaId/edit/characters/:characterId/edit",
        element: <EditCharacter></EditCharacter>,
      },
      {
        path: "/cpanel/manga/:mangaId/edit/characters/add",
        element: <AddCharacter></AddCharacter>,
      },
      {
        path: "/cpanel/manga/:mangaId/edit/add-chapter",
        element: <Addchapter></Addchapter>,
      },
      {
        path: "/cpanel/manga/:mangaId/edit/chapter/:chapterId",
        element: <EditChapter></EditChapter>
      },
      {
        path: "/feature",
        element: <Feature></Feature>,
      },
      {
        path: "cpanel/genre/add",
        element: <AddGenre></AddGenre>,
      },
      {
        path: "cpanel/genre/:id/genre",
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
  {
    path: "/test",
    element: <Test></Test>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
<Provider store={store}>
<RouterProvider router={router} />
</Provider>
    

);
