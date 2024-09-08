import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { contextData } from "../../context/ContextApi";

function Notifications() {
  const { currentUser } = useContext(contextData);
  return (
    <div className="bg-white rounded-lg shadow-lg mx-auto pt-1 sm:pt-2 sm:mt-7 lg:pt-2 px-4 lg:px-6 sm:h-[580px] overflow-scroll img-container">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4 lg:mb-2 lg:text-center">
          Notifications
        </h1>
        <button className="text-blue-600 text-sm sm:text-lg hover:text-blue-800 transition duration-300">
          Mark all as read
        </button>
      </div>

      {/* Today’s Notifications */}
      <div>
        <p className="text-gray-400 text-xs mb-2">Today</p>
        {currentUser ? (
          <div className="flex items-center justify-between p-1 sm:p-2 lg:p-4 mb-4 bg-white shadow-lg rounded hover:shadow-2xl hover:bg-blue-50 transition-all duration-300 transform ">
            <div className="flex items-center">
              <div className="w-10 sm:w-20 h-10 sm:h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-lg text-xs sm:text-xl hover:shadow-md transition-all duration-300">
                <p className=""> MS</p>
              </div>
              <Link to="/login">
                <div className="ml-3">
                  <p className="text-gray-700 font-semibold text-sm sm:text-lg hover:text-blue-800 transition-all duration-300">
                    Please verify your email address
                  </p>
                  <p className="text-gray-500 mb-1 text-xs sm:text-sm hover:font-semibold hover:text-blue-700 transition-colors duration-300">
                    1 min ago
                  </p>
                </div>
              </Link>
            </div>
            <button className="text-xs sm:text-lg text-blue-600 hover:text-blue-800 transition-colors duration-300">
              Remove
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-1 sm:p-2 lg:p-4 mb-4 bg-white shadow-lg rounded hover:shadow-2xl hover:bg-blue-50 transition-all duration-300 transform ">
            <div className="flex items-center">
              <div className="w-10 sm:w-20 h-10 sm:h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-lg text-xs sm:text-xl hover:shadow-md transition-all duration-300">
                <p className=""> MS</p>
              </div>
              <Link to="/login">
                <div className="ml-3">
                  <p className="text-gray-700 font-semibold text-sm sm:text-lg hover:text-blue-800 transition-all duration-300">
                    Please login to access your data.
                  </p>
                  <p className="text-gray-500 mb-1 text-xs sm:text-sm hover:font-semibold hover:text-blue-700 transition-colors duration-300">
                    1 hr ago
                  </p>
                </div>
              </Link>
            </div>
            <button className="text-xs sm:text-lg text-blue-600 hover:text-blue-800 transition-colors duration-300">
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Yesterday’s Notifications */}
      {/* <div>
        <p className="text-gray-400 text-xs mb-2">Yesterday</p>

        <div className="flex items-center justify-between p-1 sm:p-2 lg:p-4 mb-4 bg-white shadow-lg rounded hover:shadow-2xl hover:bg-blue-50 transition-all duration-300 transform ">
          <div className="flex items-center">
            <div className="w-10 sm:w-20 h-10 sm:h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-lg text-xs sm:text-xl hover:shadow-md transition-all duration-300">
              <p className=""> MS</p>
            </div>
            <div className="ml-3">
              <p className="text-gray-700 font-semibold text-sm sm:text-lg hover:text-blue-800 transition-all duration-300">
                Please login to access your data.
              </p>
              <p className="text-gray-500 mb-1 text-xs sm:text-sm hover:font-semibold hover:text-blue-700 transition-colors duration-300">
                1 hr ago
              </p>
            </div>
          </div>
          <button className="text-xs sm:text-lg text-blue-600 hover:text-blue-800 transition-colors duration-300">
            Remove
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Notifications;
