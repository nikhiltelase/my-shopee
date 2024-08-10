import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ShowToast } from "../utils/ToastUtils";

export const contextData = createContext(null);

function ContextApi(props) {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const getItemData = async () => {
    try {
      const { data } = await axios.get("http://localhost:1111/item/all-items");
      if (data.success) {
        setItems(data.items);
      } else {
        ShowToast("Failed to fetch items", "error");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      ShowToast("An error occurred while fetching items.", "error");
    }
  };

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        ShowToast("Please log in to access your account", "warning");
        return;
      }
      const { data } = await axios.get(
        "http://localhost:1111/user/currentUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setCurrentUser(data.user);
      } else {
        ShowToast("Failed to fetch user data", "error");
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      ShowToast("Session expired, please log in again.", "error");
      localStorage.removeItem("authToken");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken")
    setCurrentUser(null)
    ShowToast("Please log in to access your account", "warning");
  }

  useEffect(() => {
    getItemData();
    getCurrentUser();
  }, []);

  const addToCart = (item) => {
    let existingItem = cart.some((cartItem) => cartItem._id === item._id);
    if (!existingItem) {
      setCart([...cart, { ...item, quantity: 1 }]);
      ShowToast(`Successfully added ${item.name}`);
    } else {
      ShowToast(`${item.name} is already in the cart`, "info");
    }
  };

  const isItemInCart = (itemId) => {
    return cart.some((cartItem) => cartItem._id === itemId);
  };

  const contextValue = {
    items,
    cart,
    currentUser,
    setCart,
    addToCart,
    isItemInCart,
    getCurrentUser,
    logout
  };

  return (
    <contextData.Provider value={contextValue}>
      {props.children}
    </contextData.Provider>
  );
}

export default ContextApi;
