import axios from "axios";
import { ShowToast } from "../utils/ToastUtils";

// export const backendUrl = "http://localhost:1111";
export const backendUrl = "https://my-shope-backend.onrender.com";

// Fetch item data with pagination
export const fetchItemData = async (items, setItems, setHasMore) => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/item/all-items?limit=10&start=${items.length}`
    );

    if (data.success) {
      // If no more items are available
      if (data.items.length === 0) {
        setHasMore(false);
      }

      // Append fetched items to the existing list
      setItems([...items, ...data.items]);
    } else {
      ShowToast("Failed to fetch items", "error");
    }
  } catch (error) {
    console.error("Error fetching items:", error);

    // Display specific error message, if available
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while fetching items.";
    ShowToast(errorMessage, "error");
  }
};

// Update current user information
export const updateCurrentUser = async (
  setCurrentUser,
  setCart,
  setWishList,
  setOrders
) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      ShowToast("Please log in to access your account", "warning");
      return;
    }

    const { data } = await axios.get(`${backendUrl}/user/currentUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setCurrentUser(data.user);
      setCart(data.user.cart || []);
      setWishList(data.user.wishlist || []);
      setOrders(data.user.orders || []);
    } else {
      ShowToast("Failed to fetch user data", "error");
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    ShowToast("Session expired, please log in again.", "error");
    localStorage.removeItem("authToken");
  }
};

// Update user information
export const updateUser = async (updatedDetails) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      ShowToast("Please log in to update your cart", "warning");
      return false; // Return false if no token
    }

    const { data } = await axios.put(
      `${backendUrl}/user/update`,
      updatedDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      return true; // Return true if the update was successful
    } else {
      ShowToast("Failed to update user data", "error");
      return false; // Return false if the update failed
    }
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.response) {
      ShowToast(error.response.data.message, "error");
    } else {
      ShowToast(error.message, "error");
    }
    return false; // Return false in case of an error
  }
};
