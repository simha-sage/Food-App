import { useState } from "react";
import { useSwiggy } from "../context/SwiggyContext";
const RestarantCard = () => {
  const { restarantData } = useSwiggy();
  if (!restarantData) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      {restarantData?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(
        (item, i) => (
          <Title key={i} item={item} />
        )
      )}
    </div>
  );
};
const RestaCard = ({ item }) => {
  const { cartItems, setCartItems } = useSwiggy();
  return (
    <div className=" flex justify-between px-3 py-1">
      <h1 className="">{item.card.info.name}</h1>
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
        {item?.card?.card?.title}
      </h1>
      {display
        ? item?.card?.card?.itemCards?.map((itemInCatagory, i) => (
            <RestaCard key={i} item={itemInCatagory} />
          ))
        : null}
    </div>
  );
};
export default RestarantCard;
