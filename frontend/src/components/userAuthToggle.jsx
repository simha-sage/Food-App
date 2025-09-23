import React, { useContext, useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import { useSwiggy } from "../context/SwiggyContext";
import { Eye, EyeOff } from "lucide-react"; // ✅ install lucide-react for icons

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
        className="border-2  rounded p-1 px-1 my-1 text-black"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-2 flex items-center text-black"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useSwiggy();
  const handleSignIn = async (e) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/userSignIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.message == "Login successful") {
        setEmail("");
        setPassword("");
        setUser(data.data);
        navigate("/");
      } else {
        window.alert("Login Unsucessful");
      }
    } catch (err) {
      console.error("err", err);
    }
  };

  return (
    <div className="bg-[#446834] h-4/12 w-60 md:w-4/12 flex justify-center items-center">
      <form
        className="flex flex-col items-center"
        id="signIn"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <p className="font-extrabold">SIGN IN</p>
        <input
          type="email"
          placeholder="enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border-2  rounded p-1 px-1 my-1 text-black"
        />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="bg-[#61944a] p-1 m-1 rounded-md font-bold text-black"
          type="submit"
        />
      </form>
    </div>
  );
};

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
    <div className="bg-[#446834] h-auto w-60 md:w-4/12 flex justify-center items-center p-4 rounded-lg shadow-lg">
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSignUp}
      >
        <p className="font-extrabold text-lg mb-3">SIGN UP</p>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          required
          maxLength={30}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-500 rounded p-2 my-1 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <input
          type="text"
          placeholder="Enter username"
          value={userName}
          required
          maxLength={30}
          onChange={(e) => setUserName(e.target.value)}
          className="border-2 border-gray-500 rounded p-2 my-1 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          minLength={6}
          className="border-2 border-gray-500 rounded p-2 my-1 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="submit"
          value={loading ? "Signing Up..." : "Sign Up"}
          disabled={loading}
          className="bg-[#61944a] p-2 mt-3 rounded-md text-black font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
        />
      </form>
    </div>
  );
};

const SignUpButton = ({ onClick }) => (
  <div className="bg-[#61944a] h-30 md:h-4/12 w-60 md:w-2/12 flex flex-col justify-center items-center">
    <p className="text-black">New here..</p>
    <p className="text-black">Create an account?</p>
    <input
      type="button"
      className="bg-[#446834] p-1 m-1 rounded-md font-bold text-black"
      value="Register"
      onClick={onClick}
    />
  </div>
);
const SignInButton = ({ onClick }) => (
  <div className="bg-[#61944a] h-30 md:h-4/12 w-60 md:w-2/12 flex flex-col justify-center items-center">
    <p className="text-black">Welcome back!</p>
    <input
      type="button"
      className="bg-[#446834] p-1 m-1 rounded-md font-bold text-black"
      value="Login"
      onClick={onClick}
    />
  </div>
);
const UserAuthToggle = ({ onLogin }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center h-screen  bg-[#81b56b]">
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
      </div>
    </>
  );
};
export default UserAuthToggle;
