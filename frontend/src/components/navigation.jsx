import { useSwiggy } from "../context/SwiggyContext.jsx";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { cartItems, user } = useSwiggy();
  return (
    <div className="flex bg-[#8196a4] h-7">
      <div className="flex justify-around w-6/12">
        <Link to="/">
          <h4>Logo</h4>
        </Link>
        <h4>Food</h4>
        <h4>More</h4>
      </div>
      <div className="flex justify-around w-6/12">
        <div>
          <input type="text" placeholder="Search" />
        </div>

        <div>
          <Link to="/cart">
            <h4>cart({cartItems.length})</h4>
          </Link>
        </div>

        <div>
          <Link to="/about">
            <h4>about</h4>
          </Link>
        </div>
        <div>
          <Link to="/signin">
            <h4>{user}</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
