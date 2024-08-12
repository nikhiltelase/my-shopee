import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoTriangleSharp } from "react-icons/io5";
import {
  FaUser,
  FaClipboardList,
  FaHeart,
  FaBell,
  FaAddressBook,
  FaSignOutAlt,
} from "react-icons/fa";
import { contextData } from "../context/ContextApi";

const ProfileDropdown = () => {
  const { logout } = useContext(contextData);
  return (
    <>
      <IoTriangleSharp className="text-white absolute top-7 left-10" />
      <div className="absolute top-10 -left-10 mt-2 w-fit bg-white rounded-lg shadow-lg overflow-hidden z-10">
        <Link
          to="/profile/userDetails"
          className="flex items-center px-4 py-4 overflow-hidden text-gray-800 hover:bg-gray-200"
        >
          <FaUser className="mr-2 text-blue-500" size={18} />
          <span className="text-sm font-semibold">My Profile</span>
        </Link>

        <Link
          to="/profile/orders"
          className="flex items-center px-4 py-4 overflow-hidden text-gray-800 hover:bg-gray-200"
        >
          <FaClipboardList className="mr-2 text-blue-500" size={18} />
          <span className="text-sm font-semibold">Orders</span>
        </Link>
        <Link
          to="/profile/wishlist"
          className="flex items-center px-4 py-4 overflow-hidden text-gray-800 hover:bg-gray-200"
        >
          <FaHeart className="mr-2 text-blue-500" size={18} />
          <span className="text-sm font-semibold">Wishlist</span>
        </Link>

        <Link
          to="/profile/notifications"
          className="flex items-center px-4 py-4 overflow-hidden text-gray-800 hover:bg-gray-200"
        >
          <FaBell className="mr-2 text-blue-500" size={18} />
          <span className="text-sm font-semibold">Notifications</span>
        </Link>
        <Link
          to="/profile/contact"
          className="flex items-center px-4 py-4 overflow-hidden text-gray-800 hover:bg-gray-200"
        >
          <FaAddressBook className="mr-2 text-blue-500" size={18} />
          <span className="text-sm font-semibold">Contact</span>
        </Link>

        <Link
          to=""
          className="flex items-center px-4 py-4 overflow-hidden text-gray-800 hover:bg-gray-200"
          onClick={() => logout()}
        >
          <FaSignOutAlt className="mr-2 text-blue-500" size={18} />
          <span className="text-sm font-semibold">Logout</span>
        </Link>
        
      </div>
    </>
  );
};

export default ProfileDropdown;
