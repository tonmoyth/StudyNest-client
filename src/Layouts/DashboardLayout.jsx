import { NavLink, Outlet } from "react-router";

import {
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardList,
  FaUserCircle,
  FaPlus,
  FaChalkboard,
  FaBookOpen,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";

const DashboardLayout = () => {
  const { role, isRoleLoading, refetchRole } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: teacher = {}, isLoading } = useQuery({
    queryKey: ["teacher", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(teacher.status, role);
  const links = (
    <>
      {/* admin route */}
      {role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard/teacher-request"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-violet-100 font-semibold text-violet-700" : ""
                }`
              }
            >
              <FaChalkboardTeacher className="text-lg" />
              Teacher Request
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-violet-100 font-semibold text-violet-700" : ""
                }`
              }
            >
              <FaUsers className="text-lg" />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all_classes"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-violet-100 font-semibold text-violet-700" : ""
                }`
              }
            >
              <FaClipboardList className="text-lg" />
              All Classes
            </NavLink>
          </li>
        </>
      )}
      {/* teacher route */}
      {(role === "teacher" || teacher?.status === "accepted") && (
        <>
          <li>
            <NavLink
              to="/dashboard/add-class"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-violet-100 font-semibold text-violet-700" : ""
                }`
              }
            >
              <FaPlus className="text-lg" />
              Add Class
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-classes"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-violet-100 font-semibold text-violet-700" : ""
                }`
              }
            >
              <FaChalkboard className="text-lg" />
              My Classes
            </NavLink>
          </li>
        </>
      )}
      {/* student */}
      {role === "student" && (
        <>
          <li>
            <NavLink
              to="/dashboard/my-enrolled-class"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                  isActive ? "bg-violet-100 font-semibold text-violet-700" : ""
                }`
              }
            >
              <FaBookOpen className="text-lg" />
              My Enrolled Class
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
              isActive ? "bg-violet-100 font-semibold text-violet-700" : ""
            }`
          }
        >
          <FaUserCircle className="text-lg" />
          Profile
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar bg-base-300 w-full lg:hidden">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2">Dashboard</div>
            </div>
            {/* Page content here */}
            <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              {links}
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {links}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
