import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { contextData } from "../context/ContextApi";
import Search from "./Search";
import ProfileDropdown from "./ProfileDropdown";

function Navbar({ searchBar }) {
  const { cart, currentUser } = useContext(contextData);
  const [scrollY, setScrollY] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 py-4 px-4 sm:px-8 lg:px-20 sm:fixed w-full top-0 z-50 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex justify-between w-full sm:w-auto">
            <Link
              to={"/"}
              className="logo text-white text-2xl sm:text-3xl font-bold hover:opacity-80"
            >
              My Shopee
            </Link>

            {/* small screen  */}
            <div className="flex items-center gap-4 sm:gap-6 sm:hidden">
              {currentUser ? (
                <Link to={"/profile/userDetails"}>
                  <div className="relative text-white text-xl sm:text-2xl flex items-center gap-1 sm:gap-2 cursor-pointer">
                    <FaRegUserCircle />
                    {currentUser.name.split(" ")[0]}
                    {showDropDown && <ProfileDropdown />}
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-white text-xl sm:text-2xl flex items-center gap-1 sm:gap-2 hover:opacity-80"
                >
                  <FaRegUserCircle />
                  Login
                </Link>
              )}
              <Link
                to="/cart"
                className="text-white text-2xl sm:text-3xl relative cursor-pointer hover:opacity-80 select-none"
              >
                <FaShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute text-xs sm:text-sm -top-3 sm:-top-4 -right-3 sm:-right-4 bg-red-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex justify-center items-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {searchBar?(<div
            className={`w-full fixed z-10  ${
              scrollY > 60 ? "top-0  z-50" : "top-16"
            } sm:static bg-white sm:bg-transparent transition-all duration-300 ease-in-out sm:w-auto xl:w-3/4`}
          >
            <div className="shadow-lg m-2  rounded-lg  sm:shadow-none sm:m-0">
              <Search />
            </div>
          </div>): ""}

          {/* large screen  */}
          <div className="hidden sm:flex items-center gap-4 sm:gap-10">
            {currentUser ? (
              <Link to={"/profile/userDetails"}>
                <div
                  onMouseEnter={() => setShowDropDown(true)}
                  onMouseLeave={() => setShowDropDown(false)}
                  className="relative text-white text-xl sm:text-2xl flex items-center gap-1 sm:gap-2 cursor-pointer "
                >
                  <FaRegUserCircle />
                  {currentUser.name.split(" ")[0]}
                  {showDropDown && <ProfileDropdown />}
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white text-xl sm:text-2xl flex items-center gap-1 sm:gap-2 hover:opacity-80"
              >
                <FaRegUserCircle />
                Login
              </Link>
            )}

            <Link
              to="/cart"
              className="text-white text-2xl sm:text-3xl relative cursor-pointer hover:opacity-80 select-none"
            >
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="absolute text-xs sm:text-sm -top-3 sm:-top-4 -right-3 sm:-right-4 bg-red-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex justify-center items-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
