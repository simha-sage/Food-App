import Card from "./card";
import Footer from "./footer";
import Navigation from "./Navigation";
import RestuarantDishes from "./restaurantDishes";
import Cart from "./cart";
import About from "./about";
import { useSwiggy } from "../context/SwiggyContext";

const HomeContent = () => {
  const { restaurants, setSelectedRestaurant, setCurrentPage } = useSwiggy();

  return (
    <div className="flex flex-wrap justify-start">
      {restaurants.map((item, i) => (
        <Card
          key={i}
          item={item}
          setSelectRestaurant={setSelectedRestaurant}
          setCurrentPage={setCurrentPage}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const { currentPage } = useSwiggy();

  const renderPage = () => {
    switch (currentPage) {
      case "restaurantDishes":
        return <RestuarantDishes />;
      case "cart":
        return <Cart />;
      case "about":
        return <About />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default Home;
