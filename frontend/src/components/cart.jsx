import { useSwiggy } from "../context/SwiggyContext";
import Card from "./card";

function Cart() {
  const { cartItems } = useSwiggy();
  return (
    <div className="w-1/2 mx-auto text-center">
      <h1 className="font-bold">
        {cartItems.length === 0
          ? "cart is empty!"
          : `${cartItems.length} Item${
              cartItems.length == 1 ? "" : "s"
            } in cart`}
      </h1>
      {cartItems?.map((itemInCatagory, i) => (
        <RestaCard key={i} item={itemInCatagory} />
      ))}
    </div>
  );
}
const RestaCard = ({ item }) => {
  const { cartItems, setCartItems } = useSwiggy();
  const removeItemInCart = () => {
    setCartItems((cartItems) =>
      cartItems.filter((element) => element._id !== item._id)
    );
  };
  return (
    <div className=" flex justify-between px-3 py-1">
      <h1 className="">{item.name}</h1>
      <button onClick={removeItemInCart}>X</button>
    </div>
  );
};
export default Cart;
