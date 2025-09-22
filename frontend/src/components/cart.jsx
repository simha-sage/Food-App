import { useSwiggy } from "../context/SwiggyContext";
import Card from "./card";

function Cart() {
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
    <div className="w-1/2 mx-auto text-center">
      <h1 className="font-bold">
        {cartItems.length === 0
          ? "cart is empty!"
          : `${cartItems.length} Item${
              cartItems.length == 1 ? "" : "s"
            } in cart`}
      </h1>
      {cartItems?.map((restaurant) => (
        <div
          key={restaurant.restaurantId}
          className=" flex flex-col justify-between px-3 py-1 border-b"
        >
          <div className="flex justify-start items-center gap-4 ">
            <img src={restaurant.logo} alt="" className="w-20 h-20" />
            <div className="text-left">
              <h1 className="font-extrabold">
                {restaurant.restaurantName.toUpperCase()}
              </h1>
              <h1>{restaurant.city}</h1>
            </div>
          </div>
          {restaurant.dishes.map((item) => (
            <div className=" flex justify-between px-3 py-4 " key={item._id}>
              <div>
                <h1 className="font-bold">{item.name.toUpperCase()}</h1>
              </div>
              <div className="flex justify-between w-1/4">
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
                <div>
                  <h1>₹{item.price * item.count}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Cart;
