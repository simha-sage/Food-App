import { useState } from "react";
import { useSwiggy } from "../context/SwiggyContext";
import { Link } from "react-router-dom";
const Card = ({ item }) => {
  const img_url = item.info.cloudinaryImageId;
  const { cartItems, setCartItems, setRestarantData } = useSwiggy();
  const getRestarantData = async (id) => {
    const response = await fetch(
      "http://localhost:5000/gettingRestaurantData",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );
    const data = await response.json();
    setRestarantData(data);
  };
  return (
    <Link to={"/dishes"}>
      <div
        className="bg-[#d9e8f2] hover:bg-[#acc6da] transition-colors duration-200 h-[300px] w-[200px] m-4 rounded-xl"
        onClick={() => getRestarantData(item.info.id)}
      >
        <div className="h-[120px] w-[180px] m-2.5 rounded-xl">
          <img
            className="h-full w-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${img_url}`}
          />
          <h1 className="font-bold">{item.info.name}</h1>
          <h1>{item.info.costForTwo}</h1>
          <h1>{item.info.locality}</h1>
          <h1>{item.info.areaName}</h1>
        </div>
      </div>
    </Link>
  );
};
export default Card;
