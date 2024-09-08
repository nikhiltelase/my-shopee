import React, { useContext } from "react";
import { contextData } from "../../context/ContextApi";
import { Link } from "react-router-dom";

function Orders() {
  const { orders, setOrders } = useContext(contextData);

  return (
    <>
      <div className=" bg-white rounded-lg shadow-lg mx-auto pt-1 sm:pt-2 sm:mt-7 lg:pt-2 px-4 lg:px-6 sm:h-[580px] overflow-scroll img-container">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4 lg:mb-2 lg:text-center">
          Orders
        </h1>
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full ">
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-1 sm:p-2 lg:p-4 mb-4 bg-white shadow-lg rounded hover:shadow-2xl hover:bg-blue-50 transition-all duration-300 transform "
                >
                  <div className="flex">
                    <img
                      className="w-20 h-20 sm:w-32 sm:h-32 object-contain transition-transform duration-300"
                      src={item.imgUrls[0]}
                      alt={item.name}
                    />
                    <div className="flex flex-col justify-center ml-2 sm:ml-4">
                      <Link to={`/order-details/${item._id}`}>
                        <h2 className="font-bold text-sm sm:text-lg lg:text-xl mb-2 text-gray-800 hover:text-blue-700 transition-all duration-300">
                          {item.name}
                        </h2>
                      </Link>
                      <p className="text-gray-700 text-sm sm:text-lg">
                        ₹{item.price.toFixed(2)}
                      </p>

                      <Link to={`/category/${item.category}`}>
                        <p className="text-gray-500 mb-1 text-xs sm:text-sm hover:font-semibold hover:text-blue-700 transition-colors duration-300">
                          {item.category}
                        </p>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col items-end mt-4 md:mt-0">
                    <Link to={`/order-details/${item._id}`}>
                      <button
                        className="hover:text-blue-500 text-black text-sm sm:text-base font-bold py-2 px-4 rounded mb-2 transition-colors duration-300 hover:bg-blue-100"
                        aria-label="Remove item"
                      >
                        Status
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 py-32 w-full text-xl sm:text-2xl mt-2 sm:mt-0 text-center">
                You have no orders
                <Link
                  to="/"
                  className="text-blue-600 underline m-2 hover:text-blue-700 transition-all duration-300"
                >
                  Shop now
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
