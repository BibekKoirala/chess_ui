import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./../index.css";

import SecureRoute from "./SecureRoute";
import DefaultRoute from "./DefaultRoute";
import { CircularProgress } from "@mui/material";
import Loader from "./Common/Loader";
const Home = lazy(() => import("./Home/Home"));
const Forgetpassword = lazy(() =>
  import("./Prelogin/Forgetpassword/Forgetpassword")
);
const Register = lazy(() => import("./Prelogin/Register/Register"));
const UserRegistration = lazy(() =>
  import("./Prelogin/UserRegistration/UserRegistration")
);
const UserRegistrationSuccess = lazy(() =>
  import("./Prelogin/UserRegistration/UserRegistrationSuccess")
);
const Settings = lazy(() => import("./PostLoggedin/GameSettings/Settings"));
const Game = lazy(() => import("./PostLoggedin/NewGame/Game"));
const Statistics = lazy(() => import("./PostLoggedin/Statistics/Statistics"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultRoute Component={Home} />,
  },
  {
    path: "/forgetpassword",
    element: <DefaultRoute Component={Forgetpassword} />,
  },
  {
    path: "/register",
    element: <DefaultRoute Component={Register} />,
  },
  {
    path: "/userregistration/:token",
    element: <DefaultRoute Component={UserRegistration} />,
  },
  {
    path: "/userregistrationsuccess/:success",
    element: <DefaultRoute Component={UserRegistrationSuccess} />,
  },
  {
    path: "/setting",
    element: <SecureRoute Component={Settings} />,
  },
  {
    path: "/game",
    element: <SecureRoute Component={Game} />,
  },
  {
    path: "/stats",
    element: <SecureRoute Component={Statistics} />,
  },
]);

export default function () {
  return (
    <Suspense fallback={<Loader loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
