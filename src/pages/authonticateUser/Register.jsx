import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { ShowToast } from "../../utils/ToastUtils";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "mobile" ? value.slice(0, 10) : value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    let firstErrorField = null;0

    if (!formData.name) {
      formErrors.name = "Name is required";
      if (!firstErrorField) {
        firstErrorField = nameRef;
      }
    }

    if (!formData.email) {
      formErrors.email = "Email is required";
      if (!firstErrorField) {
        firstErrorField = emailRef;
      }
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      formErrors.email = "Please enter a valid email";
      if (!firstErrorField) {
        firstErrorField = emailRef;
      }
    }

    if (!formData.mobile) {
      formErrors.mobile = "Mobile number is required";
      if (!firstErrorField) {
        firstErrorField = mobileRef;
      }
    } else if (formData.mobile.length !== 10) {
      formErrors.mobile = "Please enter a valid mobile number";
      if (!firstErrorField) {
        firstErrorField = mobileRef;
      }
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
      if (!firstErrorField) {
        firstErrorField = passwordRef;
      }
    } else if (formData.password.length < 8) {
      formErrors.password = "Password length must be 8 or more characters";
      if (!firstErrorField) {
        firstErrorField = passwordRef;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
      if (!firstErrorField) {
        firstErrorField = confirmPasswordRef;
      }
    }

    setErrors(formErrors);

    if (firstErrorField) {
      firstErrorField.current.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      //making api call
      try {
        const { data } = await axios.post(
          "http://localhost:1111/user/register",
          formData
        );
        if (data.success) {
          ShowToast("User registered successfully!");
          navigate("/login");
        } else {
          ShowToast(data.message, "error");
        }
      } catch (error) {
        ShowToast(error.response.data.message || "An error occurred.", "error");
      }
    }
  };
  

  return (
    <>
      <div className="container mx-auto h-screen flex justify-center items-center sm:mt-7">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                ref={nameRef}
                className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                ref={emailRef}
                className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mobile
              </label>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                ref={mobileRef}
                className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs italic">{errors.mobile}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
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
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  ref={confirmPasswordRef}
                  className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Register
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
