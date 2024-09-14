import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { contextData } from "../context/ContextApi";
import RelatedItems from "../components/RelatedItems";
import { updateUser } from "../context/apiCallFunctions";
import { ShowToast } from "../utils/ToastUtils";
import Navbar from "../components/Navbar";

const Specifications = (specification) => {
  const pairs = specification.split(", ");
  const result = {};

  pairs.forEach((pair) => {
    if (pair.includes(": ")) {
      const [key, value] = pair.split(": ");
      result[key] = value;
    } else {
      const lastKey = Object.keys(result).pop();
      result[lastKey] += ", " + pair;
    }
  });

  return result;
};

function ItemView() {
  const navigate = useNavigate();
  const { items, addToCart, isItemInCart, wishList, setWishList, currentUser } =
    useContext(contextData);
  const { itemId } = useParams();

  const viewItem = items.find((item) => item._id == itemId);
  const [mainImg, setMainImg] = useState("");
  const [imgBorderIndex, setImgBorderIndex] = useState(0);

  const addButtonFunction = (item) => {
    addToCart(item);
    const itemInCart = isItemInCart(item._id);
    if (itemInCart) {
      navigate("/cart");
    }
  };

  useEffect(() => {
    if (viewItem) {
      setMainImg(viewItem.imgUrls[0]);
      setImgBorderIndex(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [itemId, viewItem]);

  if (!viewItem) {
    return <div className="text-center mt-10">Item not found</div>;
  }

  const isAddedToCart = isItemInCart(viewItem._id);
  const specifications = Specifications(viewItem.specification);

  const buyNow = (item) => {
    addToCart(item);
    navigate("/checkout");
  };
  const setImage = (index, img) => {
    setMainImg(img);
    setImgBorderIndex(index);
  };

  const updateWishList = async (item) => {
    if (currentUser) {
      const existingItem = wishList.find(
        (ListItem) => ListItem._id == item._id
      );
      if (existingItem) {
        const updatedWishList = wishList.filter(
          (ListItem) => ListItem._id !== item._id
        );
        const updateStatus = await updateUser({ wishlist: updatedWishList });
        if (updateStatus) {
          setWishList(updatedWishList);
          ShowToast(`${item.name} removed`);
        }
      } else {
        const updatedWishList = [...wishList, { ...item }];

        const updateStatus = await updateUser({ wishlist: updatedWishList });
        if (updateStatus) {
          setWishList(updatedWishList);
          ShowToast(`${item.name} added to wishlist`);
        }
      }
    } else {
      ShowToast("Please log in to add items to your cart", "warning");
    }
  };
  const isItemInWishList = (itemId) =>
    wishList.some((item) => item._id === itemId);


  return (
    <>
    <Navbar searchBar={true}/>
      <div className="bg-gray-100 mt-16 sm:mt-20 lg:mt-14">
        <div className="mx-auto p-4 lg:p-10 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-8 w-full lg:w-[600px]">
              <div className="w-full lg:w-1/2 select-none flex justify-center">
                <img
                  src={mainImg}
                  alt={viewItem.name}
                  className="object-contain h-60 lg:h-96 rounded-lg shadow-md"
                />
              </div>
              <div className="img-container p-1 flex items-center lg:flex-col lg:h-96 overflow-auto space-x-2 lg:space-x-0 lg:space-y-2">
                {viewItem.imgUrls.map((img, index) => (
                  <img
                    src={img}
                    className={`${
                      index === imgBorderIndex ? "border-2 border-blue-500" : ""
                    } w-20 lg:w-24 h-20 lg:h-24 p-1 rounded-lg object-contain cursor-pointer`}
                    key={index}
                    onClick={() => setImage(index, img)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col p-4 lg:p-6 select-none">
              <div className="flex gap-2 sm:gap-4 items-center mb-1 lg:mb-4">
                <h1 className="text-xl lg:text-3xl font-bold ">
                  {viewItem.name}
                </h1>
                <button
                  onClick={() => updateWishList(viewItem)}
                  className="text-red-500 text-2xl sm:text-3xl hover:text-red-600 select-none outline-none"
                  title={
                    isItemInWishList(viewItem._id)
                      ? "Remove from Favorites"
                      : "Add to Favorites"
                  }
                >
                  {isItemInWishList(viewItem._id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              <p className="text-lg lg:text-2xl text-blue-600 mb-1 lg:mb-4">
                ₹{viewItem.price}
              </p>
              <Link to={`/category/${viewItem.category}`}>
                <p className="text-base lg:text-lg text-gray-600 mb-1 lg:mb-4 hover:text-blue-600">
                  {viewItem.category}
                </p>
              </Link>
              <p className="text-sm lg:text-base mb-4 lg:mb-6">
                {viewItem.description}
              </p>
              <div className="w-full flex gap-2 lg:gap-4 mb-4 lg:mb-6">
                <button
                  onClick={() => addButtonFunction(viewItem)}
                  className={`py-2 sm:py-3 px-3 sm:px-6 rounded-md shadow-md text-white ${
                    isAddedToCart
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isAddedToCart ? "View Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() => buyNow(viewItem)}
                  className="bg-yellow-500 text-white py-2 sm:py-3 px-3 sm:px-6 rounded-md shadow-md hover:bg-yellow-600"
                >
                  Buy Now
                </button>
              </div>
              <div className="rounded">
                <h2 className="text-lg lg:text-2xl font-semibold mb-2 lg:mb-4">
                  Product Specifications
                </h2>
                <table className="table-auto w-full text-left">
                  <tbody>
                    {Object.entries(specifications).map(
                      ([key, value], index) => (
                        <tr key={index}>
                          <td className="border px-2 lg:px-4 py-2 font-semibold">
                            {key}
                          </td>
                          <td className="border px-2 lg:px-4 py-2">{value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RelatedItems viewItem={viewItem} items={items} />
        </div>
      </div>
    </>
  );
}

export default ItemView;
