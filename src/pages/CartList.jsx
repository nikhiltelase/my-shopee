import React, { useContext, useState } from "react";
import { contextData } from "../context/ContextApi";
import { Link } from "react-router-dom";
import Confirmation from "../components/Popup";
import { showToast } from "../utils/toastUtils";

function CartList() {
  const { cart, setCart } = useContext(contextData);
  const [showPopup, setShowPopup] = useState(false);
  const [removeItem, setRemoveItem] = useState(null);

  const onClose = () => {
    setShowPopup(false);
  };

  const onConfirm = () => {
    // Remove item from cart
    const updatedCart = cart.filter((item) => item !== removeItem);
    setCart(updatedCart);
    setShowPopup(false);
    showToast(`Successfully removed ${removeItem.name}`);
  };

  const removeFromCart = (item) => {
    setShowPopup(true);
    setRemoveItem(item);
  };

  const updateQuantity = (itemIndex, quantity) => {
    const updatedCart = cart.map((cartItem, index) =>
      index === itemIndex ? { ...cartItem, quantity } : cartItem
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      {showPopup && (
        <Confirmation
          message="Are you sure to remove!"
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
      <div className="container mx-auto pt-16 sm:pt-20 lg:pt-24 px-2 lg:px-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold sm:mb-4 lg:mb-8 lg:text-center">My Cart</h1>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full ">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between p-1 sm:p-2 lg:p-4 mb-4 bg-white shadow-lg rounded"
                >
                  <img
                    className="w-20 h-20 sm:w-32 sm:h-32 object-contain"
                    src={item.imgUrl[0]}
                    alt={item.name}
                  />
                  <div className="flex flex-col flex-1 sm:ml-4">
                    <Link to={`/item/${item.id}`}>
                      <h2 className="font-bold text-xl mb-2 text-gray-800 hover:text-blue-700 transition-all duration-300">
                        {item.name}
                      </h2>
                    </Link>
                    <p className="text-gray-700 text-lg">₹{item.price.toFixed(2)}</p>
                    <Link to={`/category/${item.category}`}>
                      <p className="text-gray-500 text-sm hover:font-semibold hover:text-blue-700 transition-colors duration-300">
                        {item.category}
                      </p>
                    </Link>
                    <div className="flex mt-2">
                      <button
                        onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="mx-2 text-lg font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end mt-4 md:mt-0">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="hover:text-blue-500 text-black font-bold py-2 px-4 rounded mb-2 transition-colors duration-300"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 w-full text-2xl text-center">
                Your cart is empty.{" "}
                <Link
                  to="/"
                  className="text-blue-600 underline hover:text-blue-700 transition-all duration-300"
                >
                  Shop now
                </Link>
              </p>
            )}
          </div>
          {cart.length > 0 && (
            <div className="w-full lg:w-1/4 bg-white shadow-lg rounded p-6 mt-6 lg:mt-0 lg:ml-6">
              <h2 className="text-2xl font-semibold mb-6">Price Details</h2>
              <div className="flex justify-between mb-4">
                <span className="text-lg">Price ({cart.length} items)</span>
                <span className="text-lg">₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-lg">Discount</span>
                <span className="text-lg text-green-500">- ₹0</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-lg">Delivery Charges</span>
                <span className="text-lg text-green-500">Free</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-lg font-bold">₹{calculateTotal()}</span>
              </div>
              <Link to="/checkout">
                <button className="bg-orange-500 hover:bg-orange-700 text-white text-xl font-bold py-4 w-full rounded transition-colors duration-300">
                  Place Order
                </button>
              </Link>
              <p className="mt-4 text-green-500">You will save ₹0 on this order</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartList;
