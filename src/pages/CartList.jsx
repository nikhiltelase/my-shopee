import React, { useContext, useState } from "react";
import { TiPlus, TiMinus } from "react-icons/ti";
import { contextData } from "../context/ContextApi";
import { Link } from "react-router-dom";
import Popup from "../components/Popup";
import { updateUser } from "../context/apiCallFunctions";
import { ShowToast } from "../utils/ToastUtils";
import Navbar from "../components/Navbar";

function CartList() {
  const { cart, setCart, currentUser } = useContext(contextData);
  const [showPopup, setShowPopup] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmRemove = async () => {
    setShowPopup(false);
    const updatedCart = cart.filter((item) => item._id !== itemToRemove._id);
    const updateStatus = await updateUser({ cart: updatedCart }, setShowLoader);
    if (updateStatus) {
      ShowToast(`${itemToRemove.name} removed`);
      setCart(updatedCart);
    }
  };

  const handleRemoveFromCart = (item) => {
    setShowPopup(true);
    setItemToRemove(item);
  };

  const handleUpdateQuantity = async (itemIndex, quantity) => {
    const updatedCart = cart.map((cartItem, index) =>
      index === itemIndex
        ? { ...cartItem, quantity: Math.max(1, quantity) }
        : cartItem
    );
    const updateStatus = await updateUser({ cart: updatedCart });
    if (updateStatus) {
      setCart(updatedCart);
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <Navbar searchBar={true} />
      {showPopup && (
        <Popup
          message="Are you sure you want to remove this item?"
          onClose={handleClosePopup}
          onConfirm={handleConfirmRemove}
        />
      )}
      <div className="container mx-auto pt-16 sm:pt-20 lg:pt-24 px-4 lg:px-8">
        <h1 className="text-xl sm:text-3xl font-bold mb-4 lg:mb-8 text-center lg:text-left">
          My Cart
        </h1>
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-2 lg:p-4 mb-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex">
                    <img
                      className="w-20 h-20 sm:w-32 sm:h-32 object-contain rounded-lg"
                      src={item.imgUrls[0]}
                      alt={item.name}
                    />
                    <div className="flex flex-col justify-center ml-4">
                      <Link to={`/item/${item._id}`}>
                        <h2 className="font-bold text-lg lg:text-xl mb-2 text-gray-800 hover:text-blue-700 transition-all duration-300">
                          {item.name}
                        </h2>
                      </Link>
                      <p className="text-gray-700 text-base sm:text-lg mb-2">
                        ₹{item.price.toFixed(2)}
                      </p>
                      <Link to={`/category/${item.category}`}>
                        <p className="text-gray-500 text-sm hover:text-blue-700 transition-colors duration-300">
                          {item.category}
                        </p>
                      </Link>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(index, item.quantity - 1)
                          }
                          className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300"
                          aria-label="Decrease quantity"
                        >
                          <TiMinus className="w-5 h-5" />
                        </button>
                        <span className="mx-3 text-lg font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(index, item.quantity + 1)
                          }
                          className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300"
                          aria-label="Increase quantity"
                        >
                          <TiPlus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="text-red-500 hover:text-red-700 text-sm sm:text-base font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center text-xl sm:text-2xl mt-4">
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
            <div className="w-full lg:w-[50%] bg-white shadow-md rounded-lg p-4 sm:p-6 mt-6 lg:mt-0 lg:ml-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-6">
                Price Details
              </h2>
              <div className="flex justify-between mb-4">
                <span className="text-base sm:text-lg">
                  Price ({cart.length} items)
                </span>
                <span className="text-base sm:text-lg">
                  ₹{calculateTotal()}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-base sm:text-lg">Discount</span>
                <span className="text-base sm:text-lg text-green-500">
                  - ₹0
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-base sm:text-lg">Delivery Charges</span>
                <span className="text-base sm:text-lg text-green-500">
                  Free
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-lg sm:text-xl font-bold">
                  Total Amount
                </span>
                <span className="text-lg sm:text-xl font-bold">
                  ₹{calculateTotal()}
                </span>
              </div>
              <Link
                to={`${!currentUser ? "/login" : "/checkout"}`}
                className="invisible lg:visible"
              >
                <button className="bg-orange-500 hover:bg-orange-700 text-white text-lg sm:text-xl font-bold py-3 w-full rounded-lg transition-colors duration-300">
                  Place Order
                </button>
              </Link>
              <p className="mt-4 text-green-500">
                You will save ₹0 on this order
              </p>
            </div>
          )}
        </div>

        {/* Mobile Total Amount and Checkout Button */}
        <div className="fixed left-0 bottom-0 w-full z-10 bg-white py-3 px-4 lg:hidden shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold">
                Total Amount
              </span>
              <span className="text-lg sm:text-xl font-bold">
                ₹{calculateTotal()}
              </span>
            </div>
            <Link to="/checkout">
              <button className="bg-orange-500 hover:bg-orange-700 text-white text-lg sm:text-xl font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                Place Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartList;
