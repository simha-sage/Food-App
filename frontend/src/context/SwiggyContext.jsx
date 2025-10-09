import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const swiggyContext = createContext();
export const SwiggyProvider = ({ children }) => {
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
        const res = await fetch(`${apiUrl}/api/restaurant/${seller._id}`); // backend URL
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
        const res = await fetch(`${apiUrl}/api/restaurant/all`); // backend URL
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
