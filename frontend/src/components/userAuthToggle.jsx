import React, { useContext, useState, useEffect } from "react";
import { useSwiggy } from "../context/SwiggyContext";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setSwiggyData, setUser } = useSwiggy();
  const handleSignIn = async (e) => {
    const response = await fetch("http://localhost:5000/userSignIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data.Data);
    if (data.message == "Login successful") {
      setSwiggyData(data.Data);
      setUser(data.userName);
      setEmail("");
      setPassword("");
      navigate("/");
      window.alert("Login successful");
    } else {
      window.alert("Login Unsucessful");
    }
  };

  return (
    <form
      id="signIn"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignIn();
      }}
    >
      <p>User Login Form</p>
      <input
        type="email"
        placeholder="enter email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        required
        minLength="6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

const SignUp = ({ setIsSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const handleSignUp = async (e) => {
    const response = await fetch("http://localhost:5000/userSignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, userName }),
    });
    const data = await response.json();
    if (data.message === "User added sucessfully") {
      setIsSignIn(true);
    }
    console.log(data.message);

    setEmail("");
    setPassword("");

    window.alert(data.message);
  };
  return (
    <form
      id="signUp"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}
    >
      <p>User Registeration Form</p>
      <input
        type="email"
        placeholder="enter email"
        value={email}
        required
        maxLength={30}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter username"
        value={userName}
        required
        maxLength={30}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        required
        minLength={6}
        maxLength={30}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

const SignUpButton = ({ onClick }) => (
  <div className="boxButton">
    <p>New here..Create an account?</p>
    <input type="button" value="Register" onClick={onClick} />
  </div>
);
const SignInButton = ({ onClick }) => (
  <div className="boxButton">
    <p>Welcome back!</p>
    <input type="button" value="Login" onClick={onClick} />
  </div>
);
const UserAuthToggle = ({ onLogin }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <>
      <div id="login_toggle">
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
