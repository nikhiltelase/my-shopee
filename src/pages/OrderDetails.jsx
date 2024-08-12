import React from "react";

const OrderDetails = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 mt-12">
      {/* Order Status Section */}
      <div className="bg-white shadow-lg rounded p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Order Details
        </h2>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">OnePlus Buds</h3>
            <p className="text-gray-600">White</p>
            <p className="text-gray-600">Seller: SuperCom</p>
            <p className="text-lg sm:text-xl font-semibold mt-2">₹4,499</p>
          </div>
          <img
            src="https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/g/t/t/42-t500-pro-max-69-android-ios-gamesir-yes-original-imahf3c2twrcgdyx.jpeg?q=70"
            alt="Product Image"
            className="w-20 sm:w-32  lg:w-40  object-cover rounded"
          />
        </div>
        <div className="mt-4 flex items-start">
          <div className="flex flex-col items-center mr-4">
            {/* Green indicators with connecting lines */}
            <div className="w-3 h-3 text-white bg-green-500 rounded-full shadow-[0_1px_3px_10px_rgba(0,0,0,0.2)] shadow-green-200"></div>
            <div className="w-1 h-8 bg-green-500"></div>

            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-1 h-8 bg-gray-500"></div>

            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-1 h-8 bg-gray-500"></div>

            <div className="w-3 h-3 bg-gray-500 rounded-full "></div>
          </div>
          <div>
            <div className="flex items-center ">
              <div>
                <p className="font-medium">Ordered</p>
                <p className="text-gray-600 text-sm">Thu, 6th Aug '20</p>
              </div>
            </div>
            <div className="flex items-center ">
              <div>
                <p className="font-medium">Packed</p>
                <p className="text-gray-600 text-sm">Mon, 10th Aug '20</p>
              </div>
            </div>
            <div className="flex items-center ">
              <div>
                <p className="font-medium">Shipped</p>
                <p className="text-gray-600 text-sm">Mon, 11th Aug '20</p>
              </div>
            </div>
            <div className="flex items-center ">
              <div>
                <p className="font-medium">Delivery</p>
                <p className="text-gray-600 text-sm">
                  Expected by Fri, 14th Aug '20
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:flex sm:bg-white justify-between shadow-lg rounded-lg">
        {/* Delivery Address Section */}
        <div className="bg-white shadow-lg sm:shadow-none rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            Delivery Address
          </h2>
          <p className="text-base sm:text-lg font-semibold">Nikhil Telase</p>
          <p className="text-gray-700">08305230871</p>
          <p className="text-gray-700">
            Garra word no.7, rampayli, Waraseoni, balaghat 481335
          </p>
          <p className="text-gray-700">Balaghat, Madhya Pradesh, 481335</p>
        </div>

        {/* Price Details Section */}
        <div className="bg-white shadow-lg sm:shadow-none sm:w-[40%] rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            Price Details
          </h2>
          <div className="flex justify-between mb-4">
            <span className="text-sm sm:text-base">Price (1 item)</span>
            <span className="text-sm sm:text-base">₹4,499</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm sm:text-base">Discount</span>
            <span className="text-sm sm:text-base text-green-500">- ₹0</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm sm:text-base">Delivery Charges</span>
            <span className="text-sm sm:text-base text-green-500">Free</span>
          </div>
          <div className="flex justify-between mb-4 font-bold">
            <span className="text-sm sm:text-base">Total Amount</span>
            <span className="text-sm sm:text-base">₹4,499</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
