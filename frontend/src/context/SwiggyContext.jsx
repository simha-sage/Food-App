import { createContext, useContext, useEffect, useState } from "react";
const swiggyContext = createContext();
export const SwiggyProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState("default");

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/restaurant/all"); // backend URL
        const data = await res.json();
        if (data.success) {
          setRestaurants(data.data);
        } else {
          console.error("Failed to fetch restaurants");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p>Loading restaurants...</p>;
  return (
    <swiggyContext.Provider
      value={{
        cartItems,
        setCartItems,
        user,
        setUser,
        restaurants,
        setRestaurants,
        loading,
        setLoading,
      }}
    >
      {children}
    </swiggyContext.Provider>
  );
};
export const useSwiggy = () => useContext(swiggyContext);
