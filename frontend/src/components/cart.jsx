import { useSwiggy } from "../context/SwiggyContext";
import Navigation from "./navigation";
import CountController from "./countController";

function Cart() {
  const { cartItems, setCartItems } = useSwiggy();
  let totalcost = 0;
  let deliveryFee = 25.5;
  cartItems.map((restaurant) => {
    restaurant.dishes.map((item) => {
      totalcost += item.price * item.count;
    });
  });

  let gstFee = ((totalcost * 18) % 100.34) + (totalcost * 18) / 100;

  return (
    <div>
      <Navigation />
      <div className="w-1/4 mx-auto text-center">
        <h1 className="font-bold">
          {cartItems.length === 0 ? "cart is empty!" : ""}
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
                <div className="flex justify-between w-1/2">
                  <CountController item={item} restaurant={restaurant} />
                  <div>
                    <h1>₹{item.price * item.count}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {cartItems.length > 0 && (
          <div>
            <div className="my-3 flex flex-col justify-start border-b p-3 ">
              <div className="text-left">
                <h1>Bill Details</h1>
              </div>
              <div className="flex justify-between">
                <div>
                  <h1>Item Total</h1>
                </div>
                <div>
                  <h1>₹{totalcost.toFixed(2)}</h1>
                </div>
              </div>
              <div className="flex justify-between">
                <h1>Delivery Fee | 0.7 kms</h1>
                <h1>₹{deliveryFee.toFixed(2)}</h1>
              </div>
              <div className="flex justify-between">
                <div>
                  <h1>GST & Other Charges</h1>
                </div>
                <div>
                  <h1>₹{gstFee.toFixed(2)}</h1>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold p-3">
                <h1>TO PAY</h1>
                <h1>
                  ₹{(totalcost + deliveryFee + parseFloat(gstFee)).toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
