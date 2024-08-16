import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserDetails from "../components/profileComponents/UserDetails";
import Orders from "../components/profileComponents/Orders";
import { contextData } from "../context/ContextApi";
import Wishlist from "../components/profileComponents/Wishlist";
import Notifications from "../components/profileComponents/Notifications";
import Contact from "../components/profileComponents/Contact";
import {
  FaUser,
  FaClipboardList,
  FaHeart,
  FaBell,
  FaAddressBook,
  FaSignOutAlt,
} from "react-icons/fa";

function Profile() {
  const { logout } = useContext(contextData);
  const { option } = useParams();

  const renderComponent = () => {
    switch (option) {
      case "userDetails":
        return <UserDetails />;
      case "orders":
        return <Orders />;
      case "wishlist":
        return <Wishlist />;
      case "notifications":
        return <Notifications />;
      case "contact":
        return <Contact />;
      default:
        return <UserDetails />;
    }
  };

  return (
    <div className="bg-slate-100 h-screen ">
      <div className="flex flex-col sm:flex-row h-auto sm:h-[610px] mt-16 px-4 sm:px-32 ">
        {/*left side */}
        <div className="w-full sm:w-1/4 px-4 py-2 bg-white rounded-lg shadow-lg sm:mt-7 mb-6 sm:mb-0">
          <ul className="grid grid-cols-2 gap-4 sm:pt-10 sm:flex sm:flex-col sm:space-y-6">
            <li>
              <Link
                to="/profile/userDetails"
                className={`flex items-center gap-2 text-sm lg:text-lg font-medium ${
                  option === "userDetails" ? "text-blue-600" : "text-gray-600"
                } hover:text-blue-500`}
              >
                <FaUser className="text-blue-600 text-xl lg:text-2xl" />
                My Profile
              </Link>
            </li>

            <li>
              <Link
                to="/profile/orders"
                className={`flex items-center gap-2 text-sm lg:text-lg font-medium ${
                  option === "orders" ? "text-blue-600" : "text-gray-600"
                } hover:text-blue-500`}
              >
                <FaClipboardList className="text-blue-600 text-xl lg:text-2xl" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/profile/wishlist"
                className={`flex items-center gap-2 text-sm lg:text-lg font-medium ${
                  option === "wishlist" ? "text-blue-600" : "text-gray-600"
                } hover:text-blue-500`}
              >
                <FaHeart className="text-blue-600 text-xl lg:text-2xl" />
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/profile/notifications"
                className={`flex items-center gap-2 text-sm lg:text-lg font-medium ${
                  option === "notifications" ? "text-blue-600" : "text-gray-600"
                } hover:text-blue-500`}
              >
                <FaBell className="text-blue-600 text-xl lg:text-2xl" />
                Notifications
              </Link>
            </li>
            <li>
              <Link
                to="/profile/contact"
                className={`flex items-center gap-2 text-sm lg:text-lg font-medium ${
                  option === "contact" ? "text-blue-600" : "text-gray-600"
                } hover:text-blue-500`}
              >
                <FaAddressBook className="text-blue-600 text-xl lg:text-2xl" />
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="flex items-center gap-2 text-sm lg:text-lg font-medium text-gray-700 hover:text-red-500"
              >
                <FaSignOutAlt className="text-blue-600 text-xl lg:text-2xl" />
                Logout
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side content */}
        <div className="w-full sm:w-3/4 -mt-3 sm:mt-0 sm:px-3">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
