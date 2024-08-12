// utils/validationUtils.js
export const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email";
    return null;
  };
  
  export const validateOtp = (otp) => {
    if (!otp) return "OTP is required";
    if (otp.length !== 6) return "Please enter a valid 6-digit OTP";
    return null;
  };
  
  export const validatePassword = (newPassword, confirmPassword) => {
    if (!newPassword) return "Password is required";
    if (newPassword.length < 8) return "Password length must be 8 or more characters";
    if (newPassword !== confirmPassword) return "Passwords do not match";
    return null;
  };
  
  export const validateLogin = (email, password) => {
    const errors = {};
    errors.email = validateEmail(email);
    errors.password = !password ? "Password is required" : null;
    return errors;
  };
  
  export const validateRegister = (username, email, password, confirmPassword) => {
    const errors = {};
    errors.username = !username ? "Username is required" : null;
    errors.email = validateEmail(email);
    errors.password = validatePassword(password, confirmPassword);
    return errors;
  };
  