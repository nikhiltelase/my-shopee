import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.name) {
      formErrors.name = "Name is required";
      nameRef.current.focus();
      isValid = false;
    }

    if (!formData.email) {
      formErrors.email = "Email is required";
      emailRef.current.focus();
      isValid = false;
    } else if (!formData.email.includes("@")) {
      formErrors.email = "Please enter a valid email";
      emailRef.current.focus();
      isValid = false;
    }

    if (!formData.mobile) {
      formErrors.mobile = "Mobile number is required";
      mobileRef.current.focus();
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
      passwordRef.current.focus();
      isValid = false;
    } else if (formData.password.length < 8) {
      formErrors.password = "Password length must be 8 or more characters";
      passwordRef.current.focus();
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
      confirmPasswordRef.current.focus();
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
      console.log("Form Data:", formData);
    }
  };

  return (
    <>
      <div className="container mx-auto h-screen flex justify-center items-center sm:mt-7 ">
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
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                ref={emailRef}
                className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                ref={mobileRef}
                className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
              />
              <p className="text-red-500 text-xs italic">{errors.mobile}</p>
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

              <p className="text-red-500 text-xs italic">{errors.password}</p>
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
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
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
              
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword}
              </p>
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
          <p className="text-green-500 text-xs italic">{successMessage}</p>
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
