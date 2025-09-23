import { useSwiggy } from "../context/SwiggyContext.jsx";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { cartItems, user } = useSwiggy();
  return (
    <div className="flex bg-white shadow-md border-b border-gray-200 h-16 items-center justify-between px-10">
      <div className="flex items-center w-3/12">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition"
        >
          FoodieHub
        </Link>
      </div>

      <div className="flex items-center justify-end w-9/12 space-x-8">
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-60 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <Link
            to="/cart"
            className="text-gray-700 font-medium hover:text-orange-500 transition"
          >
            Cart ({cartItems.reduce((total, i) => total + i.dishes.length, 0)})
          </Link>
        </div>

        <div>
          <Link
            to="/about"
            className="text-gray-700 font-medium hover:text-orange-500 transition"
          >
            About
          </Link>
        </div>

        <div>
          <Link
            to="/userAuthToggle"
            className="text-gray-700 font-medium hover:text-orange-500 transition"
          >
            {user.name || "Sign In"}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
