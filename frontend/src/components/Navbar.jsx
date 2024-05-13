// components/Navbar/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Get current location
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkActive = (path) => {
    // Function to check if the path is the current location
    return location.pathname === path ? "active" : "";
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set the state based on scroll position
      const position = window.pageYOffset;
      setIsScrolled(position > 50); // Change background if scrolled more than 50px
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed w-full flex flex-wrap py-2 md:grid md:grid-cols-12 basis-full items-center px-4  md:px-8 mx-auto mb-10 mt-0 ${
        isScrolled ? "bg-gray-50" : ""
      }`}
      aria-label="Global"
    >
      <div className="md:col-span-3">
        <a
          className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
          href="#"
          aria-label="Petopia"
        >
          <img
            src="../../public/logo.png"
            alt="Pet Store"
            className="w-40 ml-8"
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

          {/* <div className="md:hidden">
          <button
            type="button"
            className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl  text-black hover:text-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
            data-hs-collapse="#navbar-collapse-with-animation"
            aria-controls="navbar-collapse-with-animation"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"></path>
            </svg>
          </button>
        </div> */}
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
