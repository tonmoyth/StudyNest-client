import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/education-logo.png";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const NavBer = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Logged out successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
  //   const handleLogout = () => {
  //     console.log('logout')
  //   };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/classes">All Classes</NavLink>
      </li>
      <li>
        <NavLink to="/teach">Teach on EduManage</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <img src={logo} alt="EduManage Logo" className="w-8 h-8" />
          StudyNest
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-outline btn-sm">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL}
                  alt="User Avatar"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden dropdown dropdown-end ml-2">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {navLinks}
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          {/* {user ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            
          )} */}
        </ul>
      </div>
    </div>
  );
};

export default NavBer;
