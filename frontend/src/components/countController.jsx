import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { update } from "../redux/cartSlice";
const CountController = ({ item, restaurant }) => {
  const dispatch = useDispatch();
  const cartItemsRaw = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cartItemsRaw);
  const updateCart = (item, selectedRestaurant, increment) => {
    const exitingRestaurantIndex = cartItems.findIndex(
      (i) => i.restaurantId === selectedRestaurant.restaurantId
    );

    if (exitingRestaurantIndex !== -1) {
      const existingDishIndex = cartItems[
        exitingRestaurantIndex
      ].dishes.findIndex((i) => i._id === item._id);

      if (existingDishIndex !== -1) {
        // Create a new dish object instead of mutating
        const updatedDish = {
          ...cartItems[exitingRestaurantIndex].dishes[existingDishIndex],
          count: increment
            ? cartItems[exitingRestaurantIndex].dishes[existingDishIndex]
                .count + 1
            : cartItems[exitingRestaurantIndex].dishes[existingDishIndex]
                .count - 1,
        };

        // Remove dish if count goes to 0
        let updatedDishes = [...cartItems[exitingRestaurantIndex].dishes];
        if (updatedDish.count <= 0) {
          updatedDishes.splice(existingDishIndex, 1);
        } else {
          updatedDishes[existingDishIndex] = updatedDish;
        }

        // Remove restaurant if no dishes left
        let updatedCartItems = [...cartItems];
        if (updatedDishes.length === 0) {
          updatedCartItems.splice(exitingRestaurantIndex, 1);
        } else {
          updatedCartItems[exitingRestaurantIndex] = {
            ...cartItems[exitingRestaurantIndex],
            dishes: updatedDishes,
          };
        }

        setCartItems(updatedCartItems);
      }
    }
    dispatch(update(cartItems));
  };

  return (
    <div>
      <div className="flex justify-around border w-15 h-7">
        <button
          onClick={() => {
            updateCart(item, restaurant, false);
          }}
        >
          -
        </button>
        <h1 className="font-bold">{item.count}</h1>
        <button
          onClick={() => {
            updateCart(item, restaurant, true);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CountController;
