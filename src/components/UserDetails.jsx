import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { contextData } from "../context/ContextApi";
import { ShowToast } from "../utils/ToastUtils";
import { FaUserCircle, FaEdit } from "react-icons/fa";

function UserDetails() {
  const { currentUser, setCurrentUser } = useContext(contextData);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUserDetails({
        name: currentUser.name,
        email: currentUser.email,
        mobile: currentUser.mobile,
      });
    }
  }, [currentUser, setCurrentUser]);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.put(
        "http://localhost:1111/user/update",
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        ShowToast("User details updated successfully!");
        setIsEditing(false);
        setCurrentUser(data.user);
      } else {
        ShowToast(data.message, "error");
      }
    } catch (error) {
      console.log("Error:", error.message);
      ShowToast(error.response.data.message || "An error occurred.", "error");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 w-full rounded-lg shadow-lg sm:mt-7 sm:h-[580px] ">
      <div className="flex flex-col items-center mb-6">
        <FaUserCircle className="text-gray-500 text-6xl sm:text-8xl mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 flex items-center gap-3">
          {userDetails.name || "User Profile"}
          <FaEdit
            onClick={() => setIsEditing(!isEditing)}
            className="hover:text-blue-500 cursor-pointer"
          />
        </h2>
      </div>
      {isEditing ? (
        <>
          <div className="sm:pb-11">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded-lg w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded-lg w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Phone
              </label>
              <input
                type="text"
                name="mobile"
                value={userDetails.mobile}
                onChange={handleChange}
                className="shadow appearance-none border rounded-lg w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:py-2 sm:px-6 rounded-lg focus:outline-none focus:shadow-outline w-full"
            >
              Update
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <div
              className={`mb-6 sm:mb-10 border p-3 sm:p-4 rounded-lg ${
                isEditing ? "bg-white" : "bg-slate-50"
              }`}
            >
              <span className="block text-gray-700 text-sm font-semibold">
                Name:
              </span>
              <p className="text-gray-800 ">{userDetails.name}</p>
            </div>

            <div
              className={`mb-6 sm:mb-10 border p-3 sm:p-4 rounded-lg ${
                isEditing ? "bg-white" : "bg-slate-50"
              }`}
            >
              <span className="block text-gray-700 text-sm font-semibold">
                Email:
              </span>
              <p className="text-gray-800">{userDetails.email}</p>
            </div>

            <div
              className={`mb-6 sm:mb-10 border p-3 sm:p-4 rounded-lg ${
                isEditing ? "bg-white" : "bg-slate-50"
              }`}
            >
              <span className="block text-gray-700 text-sm font-semibold">
                Phone:
              </span>
              <p className="text-gray-800">{userDetails.mobile}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserDetails;
