import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./../index.css";
import Home from "./Home/Home";
import Forgetpassword from "./Prelogin/Forgetpassword/Forgetpassword";
import Register from "./Prelogin/Register/Register";
import UserRegistration from "./Prelogin/UserRegistration/UserRegistration";
import UserRegistrationSuccess from "./Prelogin/UserRegistration/UserRegistrationSuccess";
import SecureRoute from "./SecureRoute";
import Settings from "./PostLoggedin/GameSettings/Settings";
import MainHeader from "./Headers/MainHeader";
import DefaultRoute from "./DefaultRoute";
import Game from "./PostLoggedin/NewGame/Game";
import Statistics from "./PostLoggedin/Statistics/Statistics";

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
    element: <DefaultRoute Component={Register} />
  },
  {
    path: "/userregistration/:token",
    element: <DefaultRoute Component={UserRegistration} />
  },
  {
    path: "/userregistrationsuccess/:success",
    element: <DefaultRoute Component={UserRegistrationSuccess} />
  },
  {
    path: "/setting",
    element: <SecureRoute Component={Settings} />
  },
  {
    path: "/game",
    element: <SecureRoute Component={Game} />
  },
  {
    path: "/stats",
    element: <SecureRoute Component={Statistics} />
  },
]);

export default function () {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
