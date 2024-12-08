import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link
            to="/"
            className="hover:text-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Hotel Management
          </Link>
        </div>
        {/* Mobile Hamburger Icon */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul
          className={`flex space-x-8 text-sm font-medium lg:flex ${isMenuOpen ? "flex-col" : "hidden"} lg:flex-row`}
        >
          <li>
            <Link
              to="/"
              className="hover:text-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add-guest"
              className="hover:text-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add Guest
            </Link>
          </li>
          <li>
            <Link
              to="/guests"
              className="hover:text-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Guests
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
