import RestarantDishes from "./restaurantDishes";
const Card = ({ item, setSelectRestaurant, setCurrentMain }) => {
  return (
    <div
      className="bg-[#d9e8f2] hover:bg-[#acc6da] transition-colors duration-200 h-[300px] w-[300px] m-4 p-4 rounded-xl"
      onClick={() => {
        setSelectRestaurant(item);
        setCurrentMain(() => RestarantDishes);
      }}
    >
      <div className="h-7/12  rounded-xl">
        <img
          className="h-full w-full object-cover rounded-xl transition-transform duration-300 border hover:scale-105"
          src={item.media.logo}
          alt="no image"
          loading="lazy"
        />
      </div>
      <h1 className="font-bold pt-2">{item.name.toUpperCase()}</h1>
      <h1>{item.restaurantType}</h1>
      <h1>{item.location.city}</h1>
    </div>
  );
};
export default Card;
