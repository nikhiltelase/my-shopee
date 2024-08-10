import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { contextData } from "../context/ContextApi";

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
      console.log(userDetails)
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
        alert("User details updated successfully!");
        setIsEditing(false);
        setCurrentUser(data.user);
      }
    } catch (error) {
      console.error("Failed to update user details", error);
    }
  };


  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2 mx-auto">
      {isEditing ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              name="mobile"
              value={userDetails.mobile}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </>
      ) : (
        <>
          <div className="mb-4">
            <span className="block text-gray-700 text-sm font-bold">Name:</span>
            <p className="text-gray-800">{userDetails.name}</p>
          </div>

          <div className="mb-4">
            <span className="block text-gray-700 text-sm font-bold">
              Email:
            </span>
            <p className="text-gray-800">{userDetails.email}</p>
          </div>

          <div className="mb-4">
            <span className="block text-gray-700 text-sm font-bold">
              Phone:
            </span>
            <p className="text-gray-800">{userDetails.mobile}</p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default UserDetails;
