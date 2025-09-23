import { useState } from "react";
import { useSwiggy } from "../context/SwiggyContext";
const RestarantDishes = ({ selectedRestaurant }) => {
  const [display, setDisplay] = useState(true);
  return (
    <div className="mb-10 ">
      {selectedRestaurant.categories.map((item, i) => (
        <div className="w-6/12  mx-auto" key={i}>
          <h1
            onClick={() => {
              setDisplay(!display);
            }}
            className=" font-bold text-center font-mono text-grey pt-4 "
          >
            ◆ {item.title.toUpperCase()} ◆
          </h1>
          {display
            ? item.dishes.map((dish) => (
                <RestaCard
                  key={dish._id}
                  item={dish}
                  selectedRestaurant={selectedRestaurant}
                />
              ))
            : null}
        </div>
      ))}
      <div className="h-77">
        <h1 className="text-center font-bold text-black pt-10">
          ~ end of menu ~
        </h1>
      </div>
    </div>
  );
};
const RestaCard = ({ item, selectedRestaurant }) => {
  const { cartItems, setCartItems } = useSwiggy();
  const [added, setAdded] = useState(false);
  const addToCart = (item, selectedRestaurant) => {
    const exitingRestaurantIndex = cartItems.findIndex(
      (i) => i.restaurantId === selectedRestaurant._id
    );
    if (exitingRestaurantIndex !== -1) {
      const existingDishIndex = cartItems[
        exitingRestaurantIndex
      ].dishes.findIndex((i) => i._id === item._id);
      if (existingDishIndex !== -1) {
        const updatedDishes = [...cartItems[exitingRestaurantIndex].dishes];
        updatedDishes[existingDishIndex].count += 1;
        const updatedCartItem = {
          ...cartItems[exitingRestaurantIndex],
          dishes: updatedDishes,
        };
        const updatedCartItems = [...cartItems];
        updatedCartItems[exitingRestaurantIndex] = updatedCartItem;
        setCartItems(updatedCartItems);
      } else {
        const updatedCartItem = {
          ...cartItems[exitingRestaurantIndex],
          dishes: [
            ...cartItems[exitingRestaurantIndex].dishes,
            { ...item, count: 1 },
          ],
        };
        const updatedCartItems = [...cartItems];
        updatedCartItems[exitingRestaurantIndex] = updatedCartItem;
        setCartItems(updatedCartItems);
      }
    } else {
      setCartItems([
        ...cartItems,
        {
          restaurantId: selectedRestaurant._id,
          restaurantName: selectedRestaurant.name,
          logo: selectedRestaurant.media.logo,
          city: selectedRestaurant.location.city,
          dishes: [{ ...item, count: 1 }],
        },
      ]);
    }
  };
  return (
    <div className=" flex justify-between px-3 py-4 border-b">
      <div className="flex flex-col w-5/6">
        <h1 className="font-extrabold">{item.name.toUpperCase()}</h1>
        <h1>Price: ₹{item.price}</h1>
        <h1 className="font-extralight">{item.description}</h1>
      </div>
      <div className="relative flex flex-col justify-center items-center h-40 w-1/6 ">
        <img src={item.image} className=" relative rounded-2xl h-30 w-40 " />
        <button
          className="absolute bottom-0  bg-white-300 rounded bg-white font-bold border text-green-500 px-4 py-2 hover:bg-amber-200"
          onClick={() => {
            addToCart(item, selectedRestaurant);
            setAdded(true);
          }}
        >
          {added ? "✔️" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default RestarantDishes;
