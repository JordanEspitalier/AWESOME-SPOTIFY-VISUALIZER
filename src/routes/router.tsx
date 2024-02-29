import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Search from "../pages/Search";
import SearchDisplayAll from "../components/react/searchDisplay/SearchDisplayAll";
import SearchDisplay from "../components/react/searchDisplay/SearchDisplay";

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
                element : <SearchDisplayAll />,
            },
            {
                path : ':query/:type',
                element : <SearchDisplay />
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