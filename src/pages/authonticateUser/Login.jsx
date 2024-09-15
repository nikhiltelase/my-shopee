import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { ShowToast } from "../../utils/ToastUtils";
import { contextData } from "../../context/ContextApi";
import Loader from "../../components/loaders/Loader";
import { backendUrl } from "../../context/apiCallFunctions";
import Navbar from "../../components/Navbar";

const Login = () => {
  const { initializeUser } = useContext(contextData);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    let firstErrorField = null;

    if (!user.email) {
      setEmailError("Email is required");
      if (!firstErrorField) {
        firstErrorField = emailRef;
      }
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      setEmailError("Please enter a valid email");
      if (!firstErrorField) {
        firstErrorField = emailRef;
      }
    } else {
      setEmailError("");
    }
    if (!user.password) {
      setPasswordError("Password is required");
      if (!firstErrorField) {
        firstErrorField = passwordRef;
      }
    } else {
      setPasswordError("");
    }

    if (firstErrorField) {
      firstErrorField.current.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Make API call here
      setShowLoader(true);
      try {
        const { data } = await axios.post(`${backendUrl}/user/login`, user);
        if (data.success) {
          localStorage.setItem("authToken", data.token);
          ShowToast("Login successfully!");
          initializeUser();
          navigate("/");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            setEmailError("Email not found");
            emailRef.current.focus();
          } else if (error.response.status == 401) {
            setPasswordError("Incorrect password");
            passwordRef.current.focus();
          } else {
            ShowToast(error.response.data.message, "error");
          }
        } else {
          ShowToast(error.message, "error");
        }
      } finally {
        setShowLoader(false);
      }
    }
  };

  return (
    <>
    <Navbar/>
      <div className="sm:h-screen flex justify-center items-center">
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
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
              />
              <p className="text-red-500 text-xs italic">{emailError}</p>
            </div>
            <div className="mb-6">
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
                    passwordError ? "border-red-500" : "border-gray-300"
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

              <p className="text-red-500 text-xs italic">{passwordError}</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <Link
                to="/forget-password"
                className="text-blue-500 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
              {showLoader ? <Loader width={8} height={8} /> : ""}
            </div>
          </form>
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
