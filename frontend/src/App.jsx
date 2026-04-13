import Home from "./components/home";
import AdminDashboard from "./components/AdminDashboard";
import Auth from "./components/Auth";
import { useSwiggy } from "./context/SwiggyContext";

const App = () => {
  const { user, seller } = useSwiggy();

  // 🔐 Authentication gate
  if (!user?._id && !seller?._id) {
    return <Auth />;
  }

  // 🛍 Seller flow
  if (seller?._id) {
    return <AdminDashboard />;
  }

  return <Home />;
};

export default App;
