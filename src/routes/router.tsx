import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Search from "../pages/Search";
import SearchDisplayAll from "../components/react/searchDisplay/SearchDisplayAll";
import SearchDisplayArtists from "../components/react/searchDisplay/SearchDisplayArtists";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "search",
          element: <Search />,
          children: [
            {
                path : ':query',
                element : <SearchDisplayAll />
            },
            {
                path : ':query/artists',
                element : <SearchDisplayArtists />
            }
          ]
        },
      ],
      
    },
    {
        path: "login",
        element: <Login />,
    },
  ]);