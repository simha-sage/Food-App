import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSwiggy } from "../context/SwiggyContext";

const RestarantDishes = () => {
  const { selectedRestaurant } = useSwiggy();
  const [openCategory, setOpenCategory] = useState(0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-zinc-900 mb-8">
        {selectedRestaurant.name} Menu
      </h1>

      {selectedRestaurant.categories.map((category, index) => (
        <div
          key={index}
          className="mb-6 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden"
        >
          <button
            onClick={() =>
              setOpenCategory(openCategory === index ? null : index)
            }
            className="w-full flex items-center justify-between px-6 py-4 bg-zinc-50 hover:bg-zinc-100 transition"
          >
            <span className="font-bold text-lg text-zinc-800">
              {category.title}
            </span>
            {openCategory === index ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>

          {openCategory === index && (
            <div className="divide-y">
              {category.dishes.map((dish) => (
                <RestaCard
                  key={dish._id}
                  item={dish}
                  selectedRestaurant={selectedRestaurant}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      <p className="text-center text-zinc-500 mt-10 text-sm">~ End of menu ~</p>
    </div>
  );
};

const RestaCard = ({ item, selectedRestaurant }) => {
  const { cartItems, setCartItems, syncCartToBackend } = useSwiggy();

  const addToCart = async () => {
    let updatedCartItems = [...cartItems];

    const restaurantIndex = updatedCartItems.findIndex(
      (r) => r.restaurantId === selectedRestaurant._id,
    );

    if (restaurantIndex !== -1) {
      const dishIndex = updatedCartItems[restaurantIndex].dishes.findIndex(
        (d) => d._id === item._id,
      );

      if (dishIndex !== -1) {
        updatedCartItems[restaurantIndex].dishes[dishIndex].count += 1;
      } else {
        updatedCartItems[restaurantIndex].dishes.push({
          ...item,
          count: 1,
        });
      }
    } else {
      updatedCartItems.push({
        restaurantId: selectedRestaurant._id,
        restaurantName: selectedRestaurant.name,
        logo: selectedRestaurant.media.logo,
        city: selectedRestaurant.location.city,
        dishes: [{ ...item, count: 1 }],
      });
    }

    setCartItems(updatedCartItems);
    await syncCartToBackend(updatedCartItems);
  };

  return (
    <div className="flex justify-between gap-6 p-6">
      {/* 🍲 Left content */}
      <div className="flex-1">
        <h2 className="font-bold text-lg text-zinc-900">{item.name}</h2>
        <p className="text-sm text-zinc-600 mt-1">₹{item.price}</p>
        <p className="text-sm text-zinc-500 mt-2 leading-6">
          {item.description}
        </p>
      </div>

      {/* 🖼 Right image */}
      <div className="relative w-40 h-32 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-2xl shadow-md"
        />

        <button
          onClick={addToCart}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-zinc-200 rounded-xl px-5 py-2 font-bold text-green-600 shadow hover:bg-green-50 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default RestarantDishes;
