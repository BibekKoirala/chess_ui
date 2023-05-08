import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./../index.css";
import Home from "./Home/Home";
import Forgetpassword from "./Forgetpassword/Forgetpassword";
import Register from "./Register/Register";
import UserRegistration from "./UserRegistration/UserRegistration";
import UserRegistrationSuccess from "./UserRegistration/UserRegistrationSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/forgetpassword",
    element: <Forgetpassword />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/userregistration/:token",
    element: <UserRegistration />
  },
  {
    path: "/userregistrationsuccess/:success",
    element: <UserRegistrationSuccess />
  },
]);

export default function () {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
