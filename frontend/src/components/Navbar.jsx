// components/Navbar/Navbar.jsx
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../admin/src/services/reducer/authSlice";

const Navbar = () => {
  const location = useLocation(); // Get current location
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  console.log("isAuthenticated", isAuthenticated);
  const checkActive = (path) => {
    // Function to check if the path is the current location
    return location.pathname === path ? "active" : "";
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set the state based on scroll position
      const position = window.pageYOffset;
      setIsScrolled(position > 30); // Change background if scrolled more than 50px
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout()) // Dispatch logout action
      .unwrap() // Unwrap the Promise returned by dispatch
      .then(() => {
        navigate("/login"); // Navigate to login only after logout is successful
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };
  return (
    <nav
      className={`fixed z-50 w-full flex flex-wrap py-2 md:grid md:grid-cols-12 basis-full items-center px-4  md:px-8 mx-auto mb-10 mt-0 ${
        isScrolled ? "bg-gray-50" : ""
      }`}
      aria-label="Global"
    >
      <div className="md:col-span-3">
        <a
          className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
          href="#"
          aria-label="Meowtopia"
        >
          <img
            src="../../public/logoo.png"
            alt="Pet Store"
            className="w-48 ml-8"
          />
        </a>
      </div>
      {isAuthenticated ? (
        <div>Profile</div>
      ) : (
        <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-black text-black hover:border-transparent hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white"
          >
            <a href="/login">Sign in</a>
          </button>
          <Link
            to="/register"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm  rounded-md border border-transparent bg-amber-600 text-white font-semibold hover:bg-amber-700  transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500"
          >
            Sign up
          </Link>
        </div>
      )}
      <div
        id="navbar-collapse-with-animation"
        className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
      >
        <div className="flex flex-col font-serif gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
          <a
            className={`relative inline-block dark:text-white ${checkActive(
              "/home"
            )}`}
            href="./home"
            aria-current={location.pathname === "/home" ? "page" : undefined}
          >
            Home
          </a>
          <a
            className={`relative inline-block dark:text-white dark:hover:text-neutral-300 ${checkActive(
              "/services"
            )}`}
            href="services"
          >
            Products
          </a>
          <a
            className={`relative inline-block dark:text-white dark:hover:text-neutral-300 ${checkActive(
              "/pets"
            )}`}
            href="pets"
          >
            Pets
          </a>
          <a
            className={`relative inline-block dark:text-white dark:hover:text-neutral-300 ${checkActive(
              "/aboutus"
            )}`}
            href="aboutus"
          >
            About Us
          </a>
          <a
            className={`relative inline-block dark:text-white dark:hover:text-neutral-300 ${checkActive(
              "/contact"
            )}`}
            href="/contact"
          >
            Contact
          </a>
          <a
            className="relative inline-block dark:text-white dark:hover:text-neutral-300"
            href="#"
          >
            Blog
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;