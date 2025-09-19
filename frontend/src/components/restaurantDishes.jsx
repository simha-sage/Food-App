import { useState } from "react";
import { useSwiggy } from "../context/SwiggyContext";
const RestarantDishes = ({ selectedRestaurant }) => {
  return (
    <div>
      {selectedRestaurant.categories.map((item, i) => (
        <Title key={i} item={item} />
      ))}
    </div>
  );
};
const RestaCard = ({ item }) => {
  const { cartItems, setCartItems } = useSwiggy();
  return (
    <div className=" flex justify-between px-3 py-1">
      <h1 className="">{item.name}</h1>
      <button
        className="bg-green-300 rounded px-1"
        onClick={() => {
          setCartItems((cartItems) => [...cartItems, item]);
        }}
      >
        ADD
      </button>
    </div>
  );
};
const Title = ({ item }) => {
  const [display, setDisplay] = useState(true);
  return (
    <div className="w-6/12 border mx-auto">
      <h1
        onClick={() => {
          setDisplay(!display);
        }}
        className="text-blue-800 font-bold text-center bg-amber-300"
      >
        {item.title}
      </h1>
      {display
        ? item.dishes.map((dish) => <RestaCard key={dish._id} item={dish} />)
        : null}
    </div>
  );
};
export default RestarantDishes;
