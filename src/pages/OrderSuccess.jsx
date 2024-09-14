import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { ShowToast } from "../utils/ToastUtils";
import { contextData } from "../context/ContextApi";
import Navbar from "../components/Navbar";

function OrderSuccess() {
  const { state } = useLocation();
  const {currentUser} = useContext(contextData)
  const { orderDetails, address, totalAmount } = state;
  const navigate = useNavigate()

  // Generate a random order ID
  const generateOrderId = () => {
    return Math.random().toString(36).substring(2, 15).toUpperCase();
  };

  const orderId = generateOrderId();

  useEffect(() => {
    if(!currentUser){
      ShowToast("please login to order any items!", "waring")
      navigate("/");
    }
  }, []);

  return (
    <>
    <Navbar/>
      <div className="container mx-auto px-4 lg:px-0 py-2 sm:mt-2 lg:py-16">
        <div className="bg-white p-4 lg:p-8 shadow-lg rounded-lg max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-green-600">
            Order Placed Successfully🎉
          </h1>
          <h2 className="text-xl lg:text-2xl font-semibold  text-gray-700">
            Order ID: {orderId}
          </h2>
          <Link to={"/profile/orders"}><h2 className="text-blue-600 sm:text-lg mb-4 cursor-pointer">See orders</h2></Link>
          <div className="mb-8">
            <h3 className="text-lg lg:text-xl font-semibold mb-4 text-gray-700">
              Order Details
            </h3>
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  Total Amount
                </h4>
                <p className="text-lg text-gray-900">₹{totalAmount}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  Delivery Address
                </h4>
                <p className="text-gray-700">{address.name}</p>
                <p className="text-gray-700">{address.phone}</p>
                <p className="text-gray-700">{address.addressLine1}</p>
                {address.addressLine2 && (
                  <p className="text-gray-700">{address.addressLine2}</p>
                )}
                <p className="text-gray-700">
                  {address.city}, {address.state}, {address.zip}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  Billing Address
                </h4>
                <p className="text-gray-700">{address.name}</p>
                <p className="text-gray-700">{address.phone}</p>
                <p className="text-gray-700">{address.addressLine1}</p>
                {address.addressLine2 && (
                  <p className="text-gray-700">{address.addressLine2}</p>
                )}
                <p className="text-gray-700">
                  {address.city}, {address.state}, {address.zip}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  Ordered Items
                </h4>
                <ul className="list-disc list-inside text-gray-700">
                  {orderDetails.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item.name} - ₹{item.price.toFixed(2)} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSuccess;
