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
import AddClass from "../../Pages/Dashboard/TeacherPages/AddClass/AddClass";
import MyClass from "../../Pages/Dashboard/TeacherPages/MyClass/MyClass";
import SeeDetails from "../../Pages/Dashboard/TeacherPages/MyClass/SeeDetails";
import AllClasses from "../../Pages/Dashboard/AdminPages/AllClasses/AllClasses";
import Classes from "../../Pages/Classes/Classes";
import ClassDetails from "../../Pages/Classes/ClassDetails";
import Payment from "../../Pages/Payment/Payment";
import MyEnroll from "../../Pages/Dashboard/StudentPages/MyEnroll";
import MyEnrolDetails from "../../Pages/Dashboard/StudentPages/MyEnrolDetails";
import ForbiddenPage from "../../Pages/Forbidden/ForbiddenPage";


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
          path: 'classes',
          Component: Classes
        },
        {
          path: 'forbidden',
          Component: ForbiddenPage
        },
        {
          path: 'class/:id',
          element: <PrivateRoutes><ClassDetails></ClassDetails></PrivateRoutes>
        },
        {
          path: 'payment/:id',
          element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
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
          path: 'all_classes',
          Component: AllClasses
        },
        {
          path: 'my-enrolled-class',
          Component: MyEnroll
        },
        {
          path: 'myEnroll-class/:id',
          Component: MyEnrolDetails
        },
        {
          path: 'profile',
          Component:Profile
        },
        {
          path: 'add-class',
          Component: AddClass
        },
        {
          path: 'my-classes',
          Component: MyClass
        },
        {
          path: 'my-class/:id',
          Component: SeeDetails
        }
      ]
    }
]);