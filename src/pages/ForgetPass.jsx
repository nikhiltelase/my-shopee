import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [editEmailButton, setEditEmailButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const otpRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const validateEmail = () => {
    let formErrors = {};
    let isValid = true;

    if (!email) {
      formErrors.email = "Email is required";
      emailRef.current.focus();
      isValid = false;
    } else if (!email.includes("@")) {
      formErrors.email = "Please enter a valid email";
      emailRef.current.focus();
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const validateOtp = () => {
    let formErrors = {};
    let isValid = true;

    if (!otp) {
      formErrors.otp = "OTP is required";
      otpRef.current.focus();
      isValid = false;
    } else if (otp.length !== 6) {
      formErrors.otp = "Please enter a valid 6-digit OTP";
      otpRef.current.focus();
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const validatePassword = () => {
    let formErrors = {};
    let isValid = true;

    if (!newPassword) {
      formErrors.password = "Password is required";
      passwordRef.current.focus();
      isValid = false;
    } else if (newPassword.length < 8) {
      formErrors.password = "Password length must be 8 or more characters";
      passwordRef.current.focus();
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
      confirmPasswordRef.current.focus();
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleOtpField = (e) => {
    if (otp.length < 6) {
      setOtp(e.target.value);
    } else {
      setOtp(e.target.value.slice(0, 6));
    }
  };

  const handleEditEmail = () => {
    setOtpSent(false);
    setEditEmailButton(false);
    setSuccessMessage("");
    emailRef.current.focus();
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      setEditEmailButton(true);
      // Make API call to send OTP here
      console.log("Email:", email);
      //if otp send successfully
      setSuccessMessage("OTP sent to your email");
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (validateOtp()) {
      // Make API call to verify OTP here
      console.log("OTP:", otp);
      //if otp verified successfully
      setSuccessMessage("OTP verified successfully");
      setOtpVerified(true);
    }
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // Make API call to forget password
      console.log("new password:", newPassword);
      //if success then password change successfully
      setSuccessMessage("password change successfully");
    }
  };

  return (
    <>
      <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Forgot Password
          </h2>
          {!otpVerified ? (
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
              <div className="mb-4">
                <div className="flex mb-2 items-center justify-between">
                  <label className="block text-gray-700  text-sm font-bold">
                    Email
                  </label>
                  {editEmailButton ? (
                    <span
                      onClick={handleEditEmail}
                      className="text-blue-600 text-sm font-bold ml-3 cursor-pointer hover:text-blue-800 duration-500"
                    >
                      Edit
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailRef}
                  disabled={otpSent}
                  className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              </div>

              {otpSent && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="number"
                    name="otp"
                    value={otp}
                    onChange={handleOtpField}
                    ref={otpRef}
                    className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${
                      errors.otp ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  <p className="text-red-500 text-xs italic">{errors.otp}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {otpSent ? "Verify OTP" : "Send OTP"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgetPassword}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
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
                  Forget password
                </button>
              </div>
            </form>
          )}
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

export default ForgotPassword;
