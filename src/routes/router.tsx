import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Search from "../pages/Search";
import SearchDisplayAll from "../components/react/searchDisplay/SearchDisplayAll";
import SearchDisplayArtists from "../components/react/searchDisplay/SearchDisplayArtists";
import SearchDisplayTracks from "../components/react/searchDisplay/SearchDisplayTracks";
import SearchDisplayPlaylists from "../components/react/searchDisplay/SearchDisplayPlaylists";
import SearchDisplayAlbums from "../components/react/searchDisplay/SearchDisplayAlbums";

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
            },
            {
                path : ':query/tracks',
                element : <SearchDisplayTracks />
            },
            {
                path : ':query/playlists',
                element : <SearchDisplayPlaylists />
            },
            {
                path : ':query/albums',
                element : <SearchDisplayAlbums />
            },
          ]
        },
      ],
      
    },
    {
        path: "login",
        element: <Login />,
    },
  ]);