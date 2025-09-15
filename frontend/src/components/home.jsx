import Card from "./card";
import Banners from "./banners";
import Notice from "./notice";
import Footer from "./footer";
import Navigation from "./navigation";
import { useSwiggy } from "../context/SwiggyContext";

const Cards = () => {
  const { swiggyData } = useSwiggy();

  return (
    <div className="flex flex-wrap justify-around">
      {swiggyData?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map(
        (item, i) => (
          <Card key={i} item={item} />
        )
      )}
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Notice />
      <Navigation />
      <Banners />

      <Cards />

      <Footer />
    </>
  );
};
export default Home;
