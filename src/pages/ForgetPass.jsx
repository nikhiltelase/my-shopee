import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { ShowToast } from "../utils/ToastUtils";
import ButtonLoader from "../components/ButtonLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [otpToken, setOtpToken] = useState(null);
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [editEmailButton, setEditEmailButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

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
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
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
    let firstErrorField = null;

    if (!newPassword) {
      formErrors.password = "Password is required";
      if (!firstErrorField) {
        firstErrorField = passwordRef;
      }
    } else if (newPassword.length < 8) {
      formErrors.password = "Password length must be 8 or more characters";
      if (!firstErrorField) {
        firstErrorField = passwordRef;
      }
    }

    if (newPassword !== confirmPassword) {
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
    emailRef.current.focus();
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      // Make API call to send OTP here
      setShowLoader(true);
      try {
        const { data } = await axios.post(
          "http://localhost:1111/user/send-otp",
          { email }
        );
        if (data.success) {
          ShowToast("Otp send successfully");
          setOtpSent(true);
          setOtpToken(data.token);
          setEditEmailButton(true);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            setErrors({ email: "email not found" });
            emailRef.current.focus();
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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (validateOtp()) {
      // Make API call to verify OTP here
      setShowLoader(true);
      try {
        const { data } = await axios.post(
          "http://localhost:1111/user/verify-otp",
          { enteredOtp: otp },
          {
            headers: {
              Authorization: `Bearer ${otpToken}`,
            },
          }
        );
        if (data.success) {
          ShowToast("OTP verified successfully");
          setOtpVerified(true);
          setOtpToken(data.token);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 400) {
            setErrors({ otp: "Invalid OTP" });
            otpRef.current.focus();
          } else if (error.response.data.message === "jwt expired") {
            ShowToast("OTP Expired", "error");
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

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // Make API call to forget password
      setShowLoader(true);
      try {
        const { data } = await axios.post(
          "http://localhost:1111/user/forget-password",
          { newPassword },
          {
            headers: {
              Authorization: `Bearer ${otpToken}`,
            },
          }
        );
        if (data.success) {
          ShowToast("Password Changed successfully");
          navigate("/login");
        }
      } catch (error) {
        if (error.response) {
          ShowToast(error.response.data.message, "error");
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
                {otpSent ? (
                  <div>
                    {showLoader ? (
                      <ButtonLoader text={"Verifying"} />
                    ) : (
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Verify OTP
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    {showLoader ? (
                      <ButtonLoader text={"Sending"} />
                    ) : (
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Send OTP
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgetPassword}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  New Password
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
                {showLoader ? (
                  <ButtonLoader text={"changing password"}/>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Forget password
                  </button>
                )}
              </div>
            </form>
          )}
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
