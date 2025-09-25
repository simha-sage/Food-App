import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwiggy } from "../context/SwiggyContext";
import { Eye, EyeOff, Menu } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

// 🔑 Password Input with toggle
const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        required
        value={value}
        onChange={onChange}
        minLength="6"
        className="border border-gray-300 rounded-lg p-2 my-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

// 🔐 Sign In
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useSwiggy();

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/userSignIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.message === "Login successful") {
        setUser(data.data);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        window.alert("Login Unsuccessful");
      }
    } catch (err) {
      console.error("err", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-72 md:w-96 flex flex-col items-center">
      <p className="font-extrabold text-2xl text-orange-600 mb-4">SIGN IN</p>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 my-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Login"
          className="bg-orange-500 hover:bg-orange-600 transition text-white p-2 mt-4 rounded-lg font-bold w-full cursor-pointer"
        />
      </form>
    </div>
  );
};

// 🆕 Sign Up
const SignUp = ({ setIsSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/api/auth/userSignUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userName }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSignIn(true);
        setEmail("");
        setPassword("");
        setUserName("");
      } else {
        setError(data.message || "Sign up failed. Try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-72 md:w-96 flex flex-col items-center">
      <p className="font-extrabold text-2xl text-orange-600 mb-4">SIGN UP</p>

      {error && (
        <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
      )}

      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSignUp}
      >
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          required
          maxLength={30}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 my-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Enter username"
          value={userName}
          required
          maxLength={30}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 my-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="submit"
          value={loading ? "Signing Up..." : "Sign Up"}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 transition text-white p-2 mt-4 rounded-lg font-bold w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
};

// 🔄 Switch Buttons
const SignUpButton = ({ onClick }) => (
  <div className="text-center mt-4">
    <p className="text-gray-600 mb-2">New here?</p>
    <button
      onClick={onClick}
      className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 mt-4 rounded-lg font-bold"
    >
      Register
    </button>
  </div>
);

const SignInButton = ({ onClick }) => (
  <div className="text-center mt-4">
    <p className="text-gray-600 mb-2">New here?</p>
    <button
      onClick={onClick}
      className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 mt-4 rounded-lg font-bold"
    >
      Login
    </button>
  </div>
);

// 🎯 Main Toggle Page
const UserAuthToggle = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col  justify-center items-center gap-6 h-screen bg-gradient-to-br from-orange-100 to-orange-200">
      {isSignIn ? (
        <>
          <SignIn />
          <SignUpButton onClick={() => setIsSignIn(false)} />
        </>
      ) : (
        <>
          <SignInButton onClick={() => setIsSignIn(true)} />
          <SignUp setIsSignIn={setIsSignIn} />
        </>
      )}

      {/* Seller Auth Button */}
      <div
        onClick={() => {
          //navigate("/sellerAuthToggle")
          setShowMenu(!showMenu);
        }}
        className="absolute top-3 right-3  px-4 py-2 bg-white text-orange font-bold rounded-lg shadow-md hover:bg-orange-700 transition"
      >
        <Menu size={20} />
        {showMenu && (
          <div className="absolute top-10 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-30">
            <button
              onClick={() => navigate("/sellerAuthToggle")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition rounded-lg font-semibold"
            >
              i`m a Seller
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAuthToggle;
