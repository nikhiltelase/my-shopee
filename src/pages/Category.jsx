import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { contextData } from "../context/ContextApi";
import ItemList from "../components/ItemList";
import Navbar from "../components/Navbar";

function Category() {
  const { category } = useParams();
  const { items } = useContext(contextData);
  console.log(items)
  const filteredData = items.filter((item) => {
    return item.category === category;
  });
  console.log(filteredData)
  return (
    <div>
      <Navbar searchBar={true}/>
      <h1 className="mt-14 sm:mt-20 px-4 sm:px-8 lg:px-16 text-base sm:text-lg lg:text-xl font-semibold">
        {category}
      </h1>
      <ItemList displayItems={filteredData} />
    </div>
  );
}

export default Category;
