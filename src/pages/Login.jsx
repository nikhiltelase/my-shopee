import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    setErrors({
      email: "",
      password: "",
    });

    if (!user.email) {
      formErrors.email = "Email is required";
      emailRef.current.focus();
      isValid = false;
    } else if (!user.email.includes("@")) {
      formErrors.email = "Please enter a valid email";
      emailRef.current.focus();
      isValid = false;
    }

    if (!user.password) {
      formErrors.password = "Password is required";
      passwordRef.current.focus();
      isValid = false;
    } else if (user.password.length < 8) {
      formErrors.password = "Password length must be 8 or more characters";
      passwordRef.current.focus();
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Submitted successfully");
      // Make API call here
      console.log("Email:", user.email);
      console.log("Password:", user.password);
    }
  };

  return (
    <>
      <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                ref={emailRef}
                className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            </div>
            <div className="mb-6 ">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  ref={passwordRef}
                  className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 text-lg sm:text-xl flex items-center cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-green-500 text-xs italic">{successMessage}</p>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
