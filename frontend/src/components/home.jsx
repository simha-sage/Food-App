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
    <div className="flex flex-wrap justify-around">
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
      <Notice />
      <Navigation />

      <CurrentMain
        setCurrentMain={setCurrentMain}
        setSelectRestaurant={setSelectRestaurant}
        selectedRestaurant={selectedRestaurant}
      />

      <Footer />
    </>
  );
};
export default Home;
