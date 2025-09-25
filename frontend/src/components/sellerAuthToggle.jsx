import React, { useState } from "react";
import { Eye, EyeOff, Menu } from "lucide-react"; // ✅ password toggle icons
import { useNavigate } from "react-router-dom";
import { useSwiggy } from "../context/SwiggyContext";

// 🔑 Reusable Password Input
const PasswordInput = ({ value, onChange, placeholder = "Enter password" }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full mb-3">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        minLength="6"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

// ✅ Sign In
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setSeller } = useSwiggy();

  const handleSignIn = async () => {
    const response = await fetch(
      "http://localhost:5000/api/auth/sellerSignIn",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (data.message === "Login successful") {
      setEmail("");
      setPassword("");
      window.alert("Login successful");
      setSeller(data.data);
      navigate("/adminDashboard");
    } else {
      window.alert("Login Unsuccessful");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignIn();
      }}
      className="bg-white shadow-md rounded-xl p-6 w-96 mx-auto"
    >
      <p className="text-xl font-bold text-gray-800 mb-4 text-center">
        Seller Login
      </p>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        required
        maxLength={100}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="submit"
        value="Login"
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 cursor-pointer transition"
      />
    </form>
  );
};

// ✅ Sign Up
const SignUp = ({ setIsSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    const response = await fetch(
      "http://localhost:5000/api/auth/sellerSignUp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // include name
      }
    );
    const data = await response.json();
    setName("");
    setEmail("");
    setPassword("");
    setIsSignIn(true);
    window.alert(data.message);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}
      className="bg-white shadow-md rounded-xl p-6 w-96 mx-auto"
    >
      <p className="text-xl font-bold text-gray-800 mb-4 text-center">
        Seller Registration
      </p>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        required
        maxLength={100}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        required
        maxLength={100}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {/* 🔑 Using PasswordInput instead of plain <input /> */}
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="submit"
        value="Register"
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 cursor-pointer transition"
      />
    </form>
  );
};

// Toggle Buttons
const SignUpButton = ({ onClick }) => (
  <div className="text-center mt-4">
    <p className="text-gray-600 mb-2">New here?</p>
    <button
      onClick={onClick}
      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
    >
      Register
    </button>
  </div>
);

const SignInButton = ({ onClick }) => (
  <div className="text-center mt-4">
    <p className="text-gray-600 mb-2">Already have an account?</p>
    <button
      onClick={onClick}
      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
    >
      Login
    </button>
  </div>
);

// ✅ Main Toggle
const SellerAuthToggle = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isSignIn ? (
        <div>
          <SignIn />
          <SignUpButton onClick={() => setIsSignIn(false)} />
        </div>
      ) : (
        <div>
          <SignUp setIsSignIn={setIsSignIn} />
          <SignInButton onClick={() => setIsSignIn(true)} />
        </div>
      )}
      <div
        onClick={() => {
          //navigate("/sellerAuthToggle")
          setShowMenu(!showMenu);
        }}
        className="absolute top-3 right-3  px-4 py-2 bg-white text-orange font-bold rounded-lg shadow-md hover:bg-green-700 transition"
      >
        <Menu size={20} />
        {showMenu && (
          <div className="absolute top-10 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-40">
            <button
              onClick={() => navigate("/userAuthToggle")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition rounded-lg font-semibold"
            >
              Login as User
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerAuthToggle;
