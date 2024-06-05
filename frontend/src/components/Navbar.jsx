// components/Navbar/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../admin/src/services/reducer/authSlice";
import { Button } from "@headlessui/react";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
// import CartIcon from "./cartComponent/cartIcon";
import CartMenu from "./CartMenu.jsx";
// import WishlistPage from "./WishlistPage.jsx";

const Navbar = () => {
  const user = useSelector((state) => state.auth.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const cartMenuRef = useRef(null);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartMenuRef.current && !cartMenuRef.current.contains(event.target)) {
        setCartMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const checkActive = (path) => {
    // Function to check if the path is the current location
    return location.pathname === path ? "active" : "";
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setIsScrolled(position > 30);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div>
      <nav
        className={`fixed w-full flex flex-wrap z-50 py-2 md:grid md:grid-cols-12 basis-full items-center px-4  md:px-8 mx-auto mt-0 ${
          isScrolled ? "bg-gray-50" : ""
        }`}
        aria-label="Global"
      >
        <div className="md:col-span-3">
          <a
            className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
            href="/"
            aria-label="Petopia"
          >
            <img src="../../logoo.png" alt="Pet Store" className="w-40 ml-8" />
          </a>
        </div>
        {isAuthenticated ? (
          <div
            ref={dropdownRef}
            className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3"
          >
            <div className="flex items-center gap-2">
              <a href="/wishlist">
                <Button
                  className="rounded-full p-2 hover:text-white hover:bg-amber-600"
                  size="icon"
                  variant="ghost"
                >
                  <HeartIcon className="h-5 w-5 hover:text-gray-50" />
                  <span className="sr-only">Watchlist</span>
                </Button>
              </a>
              <Button
                className="rounded-full p-2 hover:text-white hover:bg-amber-600"
                size="icon"
                variant="ghost"
                onClick={() => setCartMenuOpen(!cartMenuOpen)}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="sr-only">Basket</span>
              </Button>
              {cartMenuOpen && (
                <CartMenu
                  cartItems={cartItems}
                  onClose={() => setCartMenuOpen(false)}
                  ref={cartMenuRef}
                />
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="py-2 px-3 ml-4 text-sm font-semibold text-white bg-amber-500 rounded-full hover:bg-amber-600"
              >
                {user && user.username ? user.username[0].toUpperCase() : "G"}
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
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
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-md border border-transparent bg-amber-600 text-white font-semibold hover:bg-amber-700 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-lime-500"
            >
              Sign up
            </Link>
          </div>
        )}
        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
        >
          <div className="flex flex-col font-primary gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
            <a
              className={`relative inline-block dark:text-white hover:text-primary ${checkActive(
                "/"
              )}`}
              href="./"
              aria-current={location.pathname === "/" ? "page" : undefined}
            >
              Home
            </a>
            <a
              className={`relative inline-block dark:text-white hover:text-primary dark:hover:text-neutral-300 ${checkActive(
                "/pets"
              )}`}
              href="/pets"
            >
              Pets
            </a>
            <a
              className={`relative inline-block dark:text-white hover:text-primary dark:hover:text-neutral-300 ${checkActive(
                "/products"
              )}`}
              href="/products"
            >
              Shop
            </a>
            <a
              className={`relative inline-block dark:text-white hover:text-primary dark:hover:text-neutral-300 ${checkActive(
                "/about"
              )}`}
              href="/about"
            >
              About Us
            </a>
            <a
              className={`relative inline-block dark:text-white hover:text-primary dark:hover:text-neutral-300 ${checkActive(
                "/contact"
              )}`}
              href="/contact"
            >
              Contact
            </a>
            <a
              className="relative inline-block dark:text-white hover:text-primary dark:hover:text-neutral-300"
              href="#"
            >
              Blog
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
