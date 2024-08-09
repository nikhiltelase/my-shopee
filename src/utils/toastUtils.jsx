import { toast } from "react-toastify";

export const ShowToast = (message, type = "success") => {
  const toastOptions ={
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    }
  if (type === "success") {
    toast.success(message, toastOptions);
  } else if (type === "error") {
    toast.error(message, toastOptions);
  } else {
    toast(message, toastOptions); // Default toast for other types
  }
};
