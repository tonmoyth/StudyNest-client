import { createBrowserRouter } from "react-router";
import Home from "../../Pages/Home/Home/Home";
import MainLayout from "../../Layouts/MainLayout";
import Login from "../../Pages/Auth/Login/Login";
import Register from "../../Pages/Auth/Register/Register";


export const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'login',
          Component: Login
        },
        {
          path: 'register',
          Component: Register
        }
    ]
  },
]);