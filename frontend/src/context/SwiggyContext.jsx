import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const swiggyContext = createContext();
export const SwiggyProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState([]);
  const [seller, setSeller] = useState([]);
  const [sellerRestaurants, setSellerRestaurants] = useState([]);
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSellerRestaurants = async () => {
      try {
        if (!seller || !seller._id || seller === null) {
          return;
        }
        const res = await fetch(
          `http://localhost:5000/api/restaurant/${seller._id}`
        ); // backend URL
        const data = await res.json();
        if (data.success) {
          setSellerRestaurants(data.data);
        } else {
          console.error("Failed to fetch restaurants");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerRestaurants();
  }, [seller]);

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
  useEffect(() => {
    if (user && user._id) {
      const getCart = async () => {
        try {
          const cartDetails = await fetch(`${apiUrl}/api/cart/${user._id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          const cartData = await cartDetails.json();
          if (cartData.success) {
            setCartItems(cartData.data.restaurants);
            console.log(cartData);
          } else {
            console.log("No cart found for user");
          }
        } catch (err) {
          console.error(err);
        }
      };
      getCart();
    }
  }, [user]);
  useEffect(() => {
    if (user && user._id) {
      const updateCart = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/cart/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ userId: user._id, restaurants: cartItems }),
          });
          const data = await response.json();
          if (data.success) {
            console.log("Cart updated successfully");
          } else {
            console.error("Failed to update cart");
          }
        } catch (err) {
          console.error(err);
        }
      };
      updateCart();
    }
  }, [cartItems]);

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
        sellerRestaurants,
        setSellerRestaurants,
        loading,
        setLoading,
        seller,
        setSeller,
      }}
    >
      {children}
    </swiggyContext.Provider>
  );
};
export const useSwiggy = () => useContext(swiggyContext);
