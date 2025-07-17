import { Link, NavLink, Outlet } from "react-router";

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
import { FiGrid } from "react-icons/fi";
import logo from "../assets/education-logo.png";

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
  const links = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded transition duration-200 
      ${
        isActive
          ? "bg-[var(--secondary)] text-[var(--text)] font-semibold border-[var(--accent)]"
          : "text-[var(--text)]"
      }
      hover:bg-[var(--primary)] hover:text-white`
          }
        >
          <FiGrid className="text-lg" />
          Dashboard
        </NavLink>
      </li>

      {/* Admin Routes */}
      {role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard/teacher-request"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded transition duration-200 
              ${
                isActive
                  ? "bg-[var(--secondary)] text-[var(--text)] font-semibold border-[var(--accent)]"
                  : "text-[var(--text)]"
              }
              hover:bg-[var(--primary)] hover:text-white`
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
                `flex items-center gap-2 p-2 rounded transition duration-200 
              ${
                isActive
                  ? "bg-[var(--secondary)] text-[var(--text)] font-semibold border-[var(--accent)]"
                  : "text-[var(--text)]"
              }
              hover:bg-[var(--primary)] hover:text-white`
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
                `flex items-center gap-2 p-2 rounded transition duration-200 
              ${
                isActive
                  ? "bg-[var(--secondary)] text-[var(--text)] font-semibold border-[var(--accent)]"
                  : "text-[var(--text)]"
              }
              hover:bg-[var(--primary)] hover:text-white`
              }
            >
              <FaClipboardList className="text-lg" />
              All Classes
            </NavLink>
          </li>
        </>
      )}

      {/* Teacher Routes */}
      {(role === "teacher" || teacher?.status === "accepted") && (
        <>
          <li>
            <NavLink
              to="/dashboard/add-class"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded transition duration-200 
              ${
                isActive
                  ? "bg-[var(--secondary)] text-[var(--text)] font-semibold border-[var(--accent)]"
                  : "text-[var(--text)]"
              }
              hover:bg-[var(--primary)] hover:text-white`
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
                `flex items-center gap-2 p-2 rounded transition duration-200 
              ${
                isActive
                  ? "bg-[var(--secondary)] text-[var(--text)] font-semibold  border-[var(--accent)]"
                  : "text-[var(--text)]"
              }
              hover:bg-[var(--primary)] hover:text-white`
              }
            >
              <FaChalkboard className="text-lg" />
              My Classes
            </NavLink>
          </li>
        </>
      )}

      {/* Student Routes */}
      {role === "student" && (
        <li>
          <NavLink
            to="/dashboard/my-enrolled-class"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded transition duration-200 
            ${
              isActive
                ? "bg-[var(--secondary)] text-[var(--text)] font-semibold  border-[var(--accent)]"
                : "text-[var(--text)]"
            }
            hover:bg-[var(--primary)] hover:text-white`
            }
          >
            <FaBookOpen className="text-lg" />
            My Enrolled Class
          </NavLink>
        </li>
      )}

      {/* Profile (For All Roles) */}
      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded transition duration-200 
          ${
            isActive
              ? "bg-[var(--secondary)] text-[var(--text)] font-semibold  border-[var(--accent)]"
              : "text-[var(--text)]"
          }
          hover:bg-[var(--primary)] hover:text-white`
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
            <ul className="menu bg-base-200 min-h-full w-70 p-4">
              <div className="flex gap-4 items-center mb-2">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-xl font-bold"
                >
                  <img
                    src={logo}
                    alt="EduManage Logo"
                    className="w-10 h-10 lg:w-12 lg:h-12"
                  />
                  StudyNest
                </Link>
               
              </div>
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

        <ul className="menu bg-[var(--background)] text-base-content min-h-full w-80 p-4">
          <div className="flex gap-4 items-center mb-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <img
                src={logo}
                alt="EduManage Logo"
                className="w-10 h-10 lg:w-12 lg:h-12"
              />
              StudyNest
            </Link>
            {/* <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                <Link to="/">
                  <img src={user?.photoURL} />
                </Link>
              </div>
            </div> */}
            {/* <div>
              <h1 className="text-xl font-semibold">{user?.displayName}</h1>
            </div> */}
          </div>
          {/* Sidebar content here */}
          {links}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
