import { createBrowserRouter } from "react-router";
import Home from "../../Pages/Home/Home/Home";
import MainLayout from "../../Layouts/MainLayout";
import Login from "../../Pages/Auth/Login/Login";
import Register from "../../Pages/Auth/Register/Register";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import TeachOnSN from "../../Pages/TeachOnSN/TeachOnSN";
import DashboardLayout from "../../Layouts/DashboardLayout";
import TeacherRequest from "../../Pages/Dashboard/AdminPages/TeacherRequest/TeacherRequest";
import Users from "../../Pages/Dashboard/AdminPages/Users/Users";
import Profile from "../../Pages/Dashboard/Profile/Profile";
import ProfileUpdate from "../../Pages/ProfileUpdate/ProfileUpdate";


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
          path: 'profileUpdate',
          element: <PrivateRoutes><ProfileUpdate></ProfileUpdate></PrivateRoutes>
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
    {
      path: 'dashboard',
      element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
      children: [
        {
          path: 'teacher-request',
          Component: TeacherRequest
        },
        {
          path: 'users',
          Component: Users
        },
        {
          path: 'profile',
          Component:Profile
        }
      ]
    }
]);