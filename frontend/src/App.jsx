import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import UserAuthToggle from "./components/userAuthToggle";
import { SwiggyProvider } from "./context/SwiggyContext";
import SellerAuthToggle from "./components/sellerAuthToggle";
import Cart from "./components/cart";
import AdminDashboard from "./components/adminDashboard";
import About from "./components/about";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
function App() {
  return (
    <Provider store={appStore}>
      <SwiggyProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userAuthToggle" element={<UserAuthToggle />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/sellerAuthToggle" element={<SellerAuthToggle />} />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </SwiggyProvider>
    </Provider>
  );
}

export default App;
