import { createBrowserRouter } from "react-router";
import Home from "../../Pages/Home/Home/Home";
import MainLayout from "../../Layouts/MainLayout";
import Login from "../../Pages/Auth/Login/Login";
import Register from "../../Pages/Auth/Register/Register";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import TeachOnSN from "../../Pages/TeachOnSN/TeachOnSN";


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
          path: 'teach',
          element: <PrivateRoutes><TeachOnSN></TeachOnSN></PrivateRoutes>
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