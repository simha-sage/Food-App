import { useSwiggy } from "../context/SwiggyContext.jsx";

const Navigation = () => {
  const { cartItems, user, setCurrentPage } = useSwiggy();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.dishes.length,
    0,
  );

  return (
    <div className="flex bg-white shadow-md border-b border-gray-200 h-16 items-center justify-between px-10">
      <div className="flex items-center w-3/12">
        <button
          onClick={() => setCurrentPage("home")}
          className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition"
        >
          FoodieHub
        </button>
      </div>

      <div className="flex items-center justify-end w-9/12 space-x-8">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-60 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={() => setCurrentPage("cart")}
          className="text-gray-700 font-medium hover:text-orange-500 transition"
        >
          Cart ({cartCount})
        </button>

        <button
          onClick={() => setCurrentPage("about")}
          className="text-gray-700 font-medium hover:text-orange-500 transition"
        >
          About
        </button>

        <h1 className="text-gray-700 font-medium">{user?.name || "Sign In"}</h1>
      </div>
    </div>
  );
};

export default Navigation;
