import {
  Navigate,
    createBrowserRouter, redirect,
  } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Search from "../pages/Search";
import SearchDisplayAll from "../components/react/searchDisplay/SearchDisplayAll";
import SearchDisplay from "../components/react/searchDisplay/SearchDisplay";
import { currentToken, getToken } from "../services/auth";
import CollectionDisplayLikedTracks from "../components/react/collectionDisplay/CollectionDisplayLikedTracks";
import CollectionDisplayPlaylist from "../components/react/collectionDisplay/CollectionDisplayPlaylist";
import CollectionDisplayAlbum from "../components/react/collectionDisplay/CollectionDisplayAlbum";


export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      loader : async () => {
        // On page load, try to fetch auth code from current browser search URL
        const args = new URLSearchParams(window.location.search)
        const code = args.get('code')

        // If we find a code, we're in a callback, do a token exchange
        if(code)
        {
          await getToken(code)
          // Remove code from URL so we can refresh correctly.
          const url = new URL(window.location.href)
          url.searchParams.delete('code')
          const updatedUrl = url.search ? url.href : url.href.replace('?', '');
          window.history.replaceState({}, document.title, updatedUrl);
          return null

        }
        if(!currentToken.access_token || currentToken.access_token === 'undefined'){
          return redirect('/login')
        } 
        return null
      },
      children: [
        {
          path: "search",
          element: <Search />,
          children: [
            {
                path : ':query',
                element : <SearchDisplayAll />,
            },
            {
                path : ':query/:type',
                element : <SearchDisplay />
            },
          ]
        },
        {
          path : "collection",
          element : <CollectionDisplayLikedTracks/>
        },
        {
          path : "album/:id",
          element : <CollectionDisplayAlbum/>
        },
        {
          path : "playlist/:id",
          element : <CollectionDisplayPlaylist/>
        },

      ],
      
    },
    {
        path: "/login",
        element: <Login />,
    },
  ]);