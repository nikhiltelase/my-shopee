import React, { useContext } from "react";
import CategoryLinks from "../components/CategoryLinks";
import OfferSlider from "../components/Slider";
import ItemList from "../components/ItemList";
import { contextData } from "../context/ContextApi";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  const { items} = useContext(contextData)

  return (
    <div className=" bg-white">
      <Navbar searchBar={true}/>
      <CategoryLinks />
      <OfferSlider />
      <ItemList displayItems={items} />
      <Footer />
    </div>
  );
}

export default Home;
