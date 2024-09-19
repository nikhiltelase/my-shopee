import React, { useContext, useEffect, useState } from "react";
import { contextData } from "../context/ContextApi";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import Loader from "./loaders/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

function ItemList({ displayItems }) {
  const navigate = useNavigate();
  const { addToCart, isItemInCart, hasMore, getItems, items, itemsLoader } =
    useContext(contextData);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [addButtonId, setAddButtonId] = useState(null);

  const addButtonFunction = (item) => {
    addToCart(item);
    const itemInCart = isItemInCart(item._id);
    if (itemInCart) {
      navigate("/cart");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      // Check if scrolling up
      if (currentScrollTop < lastScrollTop && currentScrollTop > 300) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={getItems}
        hasMore={hasMore}
        loader={<Loader width={"20"} height={"20"} />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="no-scrollbar"
      >
        <div className="img-container w-full pt-2 mb-10 p-2 sm:p-6 bg-gray-100 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {displayItems.map((item, index) => (
              <div
                key={index}
                className=" w-full rounded-lg overflow-hidden shadow-lg bg-white flex flex-col justify-between items-center transform transition-transform duration-500 hover:shadow-2xl"
                onMouseEnter={() => setAddButtonId(item._id)}
              >
                <Link to={`/item/${item._id}`} className="z-10 w-full">
                  <div className="w-full h-full ">
                    <div className="bg-white w-full h-full relative z-10 hover:opacity-0 p-1 sm:px-4 lg:pt-6 duration-500">
                      <img
                        className="w-full h-32 sm:h-48 lg:h-60 object-contain "
                        src={item.imgUrls[0]}
                        alt={item.name}
                      />
                    </div>
                    <div className="bg-white w-full absolute top-0 left-0  sm:px-4 lg:pt-6 transition-opacity duration-1000">
                      <img
                        className=" w-full h-32 sm:h-48 lg:h-60 bg-white object-contain "
                        src={
                          item.imgUrls[1] ? item.imgUrls[1] : item.imgUrls[0]
                        }
                        alt={item.name}
                      />
                    </div>
                  </div>
                </Link>

                <div className="px-2 py-2 sm:px-6 sm:py-4 text-center">
                  <Link to={`item/${item._id}`}>
                    <div className="font-bold text-sm sm:text-xl mb-2 text-gray-800">
                      {item.name}
                    </div>
                  </Link>
                  <p className="text-gray-700 text-md sm:text-lg">
                    ₹{item.price}
                  </p>
                  <Link to={`/category/${item.category}`}>
                    <p className="hidden sm:block text-gray-500 text-sm sm:text-base category-text hover:text-blue-600 transition-opacity duration-300">
                      {item.category}
                    </p>
                  </Link>
                </div>

                <div
                  className={`${
                    addButtonId == item._id ? "opacity-100 " : "opacity-0"
                  } hidden w-0 h-0 xl:w-auto xl:h-full xl:pb-4 xl:block transition-opacity duration-500`}
                >
                  <button
                    onClick={() => addButtonFunction(item)}
                    className={`${
                      isItemInCart(item._id)
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-indigo-500 hover:bg-indigo-700"
                    } text-white font-bold py-2 px-4 rounded-full transform transition-transform duration-500 hover:scale-110`}
                  >
                    {isItemInCart(item._id) ? "view cart" : "add to cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {itemsLoader && items.length === 0 ? (
            <Loader width={"20"} height={"20"} />
          ) : (
            ""
          )}
          {!itemsLoader && items.length === 0 ? (
            <p className="text-red-500">Item not found</p>
          ) : (
            ""
          )}
        </div>
        {showGoToTop && (
          <button
            onClick={scrollToTop}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white text-blue-700 px-3 py-2 font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            <div className="flex justify-center items-center">
              <FaArrowUp />
              <span className="ml-2">Back to top</span>
            </div>
          </button>
        )}
      </InfiniteScroll>
    </>
  );
}

export default ItemList;
