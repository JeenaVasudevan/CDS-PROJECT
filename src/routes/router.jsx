import {
    createBrowserRouter,
  } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import ErrorPage from "../error-page";
import Home from "../pages/Home";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<UserLayout />,
      errorElement:<ErrorPage />,
      children:[
      {
        path:"",
        element:<Home />,
      },
      ],
    },
]);

