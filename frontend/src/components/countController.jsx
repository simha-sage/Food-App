import React from "react";
import { useSwiggy } from "../context/SwiggyContext";

const CountController = ({ item, restaurant }) => {
  const { cartItems, setCartItems } = useSwiggy();
  const updateCart = (item, selectedRestaurant, increment) => {
    const exitingRestaurantIndex = cartItems.findIndex(
      (i) => i.restaurantId === selectedRestaurant.restaurantId
    );
    if (exitingRestaurantIndex !== -1) {
      const existingDishIndex = cartItems[
        exitingRestaurantIndex
      ].dishes.findIndex((i) => i._id === item._id);
      if (existingDishIndex !== -1) {
        const updatedDishes = [...cartItems[exitingRestaurantIndex].dishes];
        updatedDishes[existingDishIndex].count += increment ? 1 : -1;
        if (updatedDishes[existingDishIndex].count === 0) {
          updatedDishes.splice(existingDishIndex, 1);
          if (updatedDishes.length === 0) {
            const updatedCartItems = [...cartItems];
            updatedCartItems.splice(exitingRestaurantIndex, 1);
            setCartItems(updatedCartItems);
            return;
          }
        }
        const updatedCartItem = {
          ...cartItems[exitingRestaurantIndex],
          dishes: updatedDishes,
        };
        const updatedCartItems = [...cartItems];
        updatedCartItems[exitingRestaurantIndex] = updatedCartItem;
        setCartItems(updatedCartItems);
      }
    }
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
