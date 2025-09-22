import Card from "./card";
import Notice from "./notice";
import Footer from "./footer";
import Navigation from "./navigation";
import { useSwiggy } from "../context/SwiggyContext";
import { useState } from "react";
import RestarantDishes from "./restaurantDishes";

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
  return (
    <>
      <div className="relative min-h-screen flex flex-col ">
        <Notice />
        <Navigation />

        <CurrentMain
          setCurrentMain={setCurrentMain}
          setSelectRestaurant={setSelectRestaurant}
          selectedRestaurant={selectedRestaurant}
        />

        <Footer />
      </div>
    </>
  );
};
export default Home;
