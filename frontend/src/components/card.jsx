const Card = ({ item, setSelectRestaurant, setCurrentPage }) => {
  return (
    <div
      onClick={() => {
        setSelectRestaurant(item);
        setCurrentPage("restaurantDishes");
      }}
      className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md border border-zinc-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-[300px] m-4"
    >
      {/* 🍔 Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={item.media.logo}
          alt={item.name}
          loading="lazy"
        />

        {/* overlay badge */}
        <div className="absolute top-3 left-3 rounded-full bg-orange-500 text-white px-3 py-1 text-xs font-semibold shadow-md">
          {item.restaurantType}
        </div>
      </div>

      {/* 📄 Content */}
      <div className="p-4 space-y-2">
        <h1 className="text-lg font-bold text-zinc-900 truncate">
          {item.name}
        </h1>

        <p className="text-sm text-zinc-500">📍 {item.location.city}</p>

        <div className="flex items-center justify-between text-sm text-zinc-600">
          <span>⭐ 4.5</span>
          <span>30-40 min</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
