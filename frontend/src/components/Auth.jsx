import React, { useState } from "react";
import { Eye, EyeOff, User, Store } from "lucide-react";
import { useSwiggy } from "../context/SwiggyContext";

const apiUrl = import.meta.env.VITE_API_URL;

const PasswordInput = ({ value, onChange, isSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        autoComplete={isSignIn ? "current-password" : "new-password"}
        required
        minLength={6}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-400 p-3 pr-12 outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default function UnifiedAuthPage() {
  const [role, setRole] = useState("user");
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { restoreAuth } = useSwiggy();

  const isSeller = role === "seller";

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const endpoint = isSeller
        ? isSignIn
          ? "/api/auth/sellerSignIn"
          : "/api/auth/sellerSignUp"
        : isSignIn
          ? "/api/auth/userSignIn"
          : "/api/auth/userSignUp";

      const payload = isSignIn
        ? { email, password }
        : isSeller
          ? { name, email, password }
          : { userName: name, email, password };

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Authentication failed");
        return;
      }

      await restoreAuth();

      if (!isSignIn) {
        alert(`${isSeller ? "Seller" : "User"} account created successfully`);
        setIsSignIn(true);
      }

      resetFields();
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-zinc-900 to-black px-4">
      <div className="w-full max-w-md rounded-3xl bg-zinc-900/80 backdrop-blur-xl shadow-2xl border border-zinc-700 p-8">
        {/* Role Tabs */}
        <div className="flex rounded-2xl bg-zinc-800 p-1 mb-6">
          <button
            onClick={() => {
              setRole("user");
              resetFields();
            }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition ${
              role === "user"
                ? "bg-orange-500 text-white shadow-lg"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            <User size={18} /> User
          </button>

          <button
            onClick={() => {
              setRole("seller");
              resetFields();
            }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition ${
              role === "seller"
                ? "bg-orange-500 text-white shadow-lg"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            <Store size={18} /> Seller
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          {isSeller ? "Seller" : "User"} {isSignIn ? "Login" : "Register"}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <input
              type="text"
              placeholder={isSeller ? "Enter seller name" : "Enter username"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-400 p-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}

          <input
            type="email"
            placeholder="Enter email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-400 p-3 outline-none focus:ring-2 focus:ring-orange-500"
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isSignIn={isSignIn}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-3 font-bold text-white shadow-lg transition hover:bg-orange-600 hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Please wait..." : isSignIn ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Bottom Toggle */}
        <p className="mt-6 text-center text-zinc-300">
          {isSignIn ? "Don’t have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsSignIn(!isSignIn);
              resetFields();
            }}
            className="ml-2 font-bold text-orange-400 hover:text-orange-300 underline"
          >
            {isSignIn ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
