import React from "react";
import logo from '../../assets/education-logo.png'
import { Link } from "react-router";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <img
            src={logo}
            alt="EduManage Logo"
            className="w-10 h-10 lg:w-12 lg:h-12"
          />
          StudyNest
        </Link>
      </aside>

      <div>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </div>
     
       <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-2xl">
      <a href="https://www.facebook.com/nurislamhasantonmoyth" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="hover:text-primary transition" />
      </a>
      <a href="https://www.linkedin.com/in/tonmoynht/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="hover:text-primary transition" />
      </a>
      <a href="https://github.com/tonmoyth" target="_blank" rel="noopener noreferrer">
        <FaGithub className="hover:text-primary transition" />
      </a>
    </nav>
    </footer>
  );
};

export default Footer;
