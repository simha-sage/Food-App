import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useSwiggy } from "../context/SwiggyContext.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const Navigation = () => {
  const { cartItems, user, setUser, setCurrentPage, restoreAuth } = useSwiggy();

  const [showMenu, setShowMenu] = useState(false);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.dishes.length,
    0,
  );

  const handleLogout = async () => {
    try {
      await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      setCurrentPage("home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

        {/* 👤 User dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 text-gray-700 font-medium hover:text-orange-500 transition"
          >
            {user?.name}
            <ChevronDown size={18} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-gray-100 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
