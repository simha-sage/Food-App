import { useState } from "react";
import { useSwiggy } from "../context/SwiggyContext";
import { useDispatch } from "react-redux";
import { update } from "../redux/cartSlice";
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
import { useSelector } from "react-redux";
const RestaCard = ({ item, selectedRestaurant }) => {
  const cartItemsRaw = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cartItemsRaw);
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const addToCart = (item, selectedRestaurant) => {
    let updatedCartItems = [...cartItems]; // start with a copy

    const exitingRestaurantIndex = updatedCartItems.findIndex(
      (r) => r.restaurantId === selectedRestaurant._id
    );

    if (exitingRestaurantIndex !== -1) {
      const existingDishIndex = updatedCartItems[
        exitingRestaurantIndex
      ].dishes.findIndex((d) => d._id === item._id);

      if (existingDishIndex !== -1) {
        // create a new dish object instead of mutating
        const updatedDish = {
          ...updatedCartItems[exitingRestaurantIndex].dishes[existingDishIndex],
          count:
            updatedCartItems[exitingRestaurantIndex].dishes[existingDishIndex]
              .count + 1,
        };

        const updatedDishes = [
          ...updatedCartItems[exitingRestaurantIndex].dishes,
        ];
        updatedDishes[existingDishIndex] = updatedDish;

        updatedCartItems[exitingRestaurantIndex] = {
          ...updatedCartItems[exitingRestaurantIndex],
          dishes: updatedDishes,
        };
      } else {
        // add new dish
        updatedCartItems[exitingRestaurantIndex] = {
          ...updatedCartItems[exitingRestaurantIndex],
          dishes: [
            ...updatedCartItems[exitingRestaurantIndex].dishes,
            { ...item, count: 1 },
          ],
        };
      }
    } else {
      // add new restaurant
      updatedCartItems.push({
        restaurantId: selectedRestaurant._id,
        restaurantName: selectedRestaurant.name,
        logo: selectedRestaurant.media.logo,
        city: selectedRestaurant.location.city,
        dishes: [{ ...item, count: 1 }],
      });
    }

    setCartItems(updatedCartItems);
    dispatch(update(updatedCartItems));
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
        {!added ? (
          <button
            className="absolute bottom-0 bg-white font-bold border text-green-500 px-4 py-2 rounded hover:bg-amber-200"
            onClick={() => {
              addToCart(item, selectedRestaurant);
              setAdded(true);
            }}
          >
            Add
          </button>
        ) : (
          <button
            className="absolute bottom-0 bg-green-500 text-white font-bold border px-4 py-2 rounded hover:bg-green-600"
            onClick={() => setAdded(false)}
          >
            ✔️
          </button>
        )}
      </div>
    </div>
  );
};

export default RestarantDishes;
