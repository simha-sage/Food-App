import { createContext, useContext, useEffect, useState } from "react";
const swiggyContext = createContext();
export const SwiggyProvider = ({ children }) => {
  const [swiggyData, setSwiggyData] = useState(() => {
    try {
      const savedCart = localStorage.getItem("DATA_STORAGE_KEY");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return {}; // Return empty array on error
    }
  });
  const [restarantData, setRestarantData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState("default");
  useEffect(() => {
    localStorage.setItem("DATA_STORAGE_KEY", JSON.stringify(swiggyData));
  }, [swiggyData]);

  useEffect(() => {
    localStorage.setItem("CART_STORAGE_KEY", JSON.stringify(cartItems));
    console.log(cartItems);
  }, [cartItems]);

  return (
    <swiggyContext.Provider
      value={{
        swiggyData,
        setSwiggyData,
        cartItems,
        setCartItems,
        user,
        setUser,
        restarantData,
        setRestarantData,
      }}
    >
      {children}
    </swiggyContext.Provider>
  );
};
export const useSwiggy = () => useContext(swiggyContext);
