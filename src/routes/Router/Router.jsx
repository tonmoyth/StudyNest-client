import { createBrowserRouter } from "react-router";
import Home from "../../Pages/Home/Home/Home";
import MainLayout from "../../Layouts/MainLayout";


export const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
        {
            index: true,
            Component: Home
        }
    ]
  },
]);