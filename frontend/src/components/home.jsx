import Card from "./card";
import Footer from "./footer";
import Navigation from "./navigation";
import { useSwiggy } from "../context/SwiggyContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const RestaCards = ({ setCurrentMain, setSelectRestaurant }) => {
  const { restaurants } = useSwiggy();

  return (
    <div className="flex flex-wrap justify-start">
      {restaurants.map((item, i) => (
        <Card
          key={i}
          item={item}
          setSelectRestaurant={setSelectRestaurant}
          setCurrentMain={setCurrentMain}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const [CurrentMain, setCurrentMain] = useState(() => RestaCards);
  const [selectedRestaurant, setSelectRestaurant] = useState(null);
  const navigate = useNavigate();
  const { user } = useSwiggy();

  // ✅ Redirect safely after render
  useEffect(() => {
    if (!user || !user._id) {
      navigate("/userAuthToggle");
    }
  }, [user, navigate]);

  if (!user || !user._id) {
    // optional: show nothing or a loader while redirecting
    return null;
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navigation />

      <CurrentMain
        setCurrentMain={setCurrentMain}
        setSelectRestaurant={setSelectRestaurant}
        selectedRestaurant={selectedRestaurant}
      />

      <Footer />
    </div>
  );
};

export default Home;
