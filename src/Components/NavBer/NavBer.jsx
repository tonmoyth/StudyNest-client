import React from "react";
import { Link, NavLink } from "react-router";
import logo from '../../assets/education-logo.png'

const NavBer = () => {

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
          EduManage
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        <Link to="/signin" className="btn btn-outline btn-sm">
            Sign In
          </Link>
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
