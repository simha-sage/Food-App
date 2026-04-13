import { createContext, useContext, useEffect, useMemo, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
const SwiggyContext = createContext();

export const SwiggyProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);

  const [restaurants, setRestaurants] = useState([]);
  const [sellerRestaurants, setSellerRestaurants] = useState([]);

  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [sellerLoading, setSellerLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const restoreAuth = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        setUser(null);
        setSeller(null);
        return;
      }

      if (data.user.role === "seller") {
        setSeller(data.user);
        setUser(null);
      } else {
        setUser(data.user);
        setSeller(null);
      }
    } catch (error) {
      console.error("Auth restore failed:", error);
      setUser(null);
      setSeller(null);
    } finally {
      setAuthLoading(false);
    }
  };
  useEffect(() => {
    restoreAuth();
  }, []);

  // ✅ Fetch all restaurants once
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/restaurant/all`);
        const data = await res.json();

        if (data.success) {
          setRestaurants(data.data);
        }
      } catch (err) {
        console.error("Restaurant fetch error:", err);
      } finally {
        setRestaurantsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // ✅ Fetch seller restaurants only when seller logs in
  useEffect(() => {
    if (!seller?._id) return;

    const fetchSellerRestaurants = async () => {
      setSellerLoading(true);

      try {
        const res = await fetch(`${apiUrl}/api/restaurant/${seller._id}`);
        const data = await res.json();

        if (data.success) {
          setSellerRestaurants(data.data);
        }
      } catch (err) {
        console.error("Seller restaurant fetch error:", err);
      } finally {
        setSellerLoading(false);
      }
    };

    fetchSellerRestaurants();
  }, [seller?._id]);

  // ✅ Fetch cart only after user login
  useEffect(() => {
    if (!user?._id) return;

    const getCart = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/cart/${user?._id}`, {
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          setCartItems(data.data.restaurants || []);
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    getCart();
  }, [user?._id]);

  // ✅ Manual cart sync function (BEST)
  const syncCartToBackend = async (updatedCart) => {
    if (!user?._id) return;

    try {
      await fetch(`${apiUrl}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          restaurants: updatedCart,
        }),
      });
    } catch (err) {
      console.error("Cart sync error:", err);
    }
  };

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
      syncCartToBackend,

      user,
      setUser,

      seller,
      setSeller,

      restoreAuth,

      restaurants,
      sellerRestaurants,

      authLoading,
      restaurantsLoading,
      sellerLoading,
      currentPage,
      setCurrentPage,
      selectedRestaurant,
      setSelectedRestaurant,
    }),
    [
      cartItems,
      user,
      seller,
      restaurants,
      sellerRestaurants,
      restaurantsLoading,
      sellerLoading,
      currentPage,
      selectedRestaurant,
    ],
  );

  return (
    <SwiggyContext.Provider value={value}>{children}</SwiggyContext.Provider>
  );
};

export const useSwiggy = () => useContext(SwiggyContext);
