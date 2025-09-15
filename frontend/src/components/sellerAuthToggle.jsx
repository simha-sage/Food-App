import React, { useState } from "react";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    const response = await fetch("http://localhost:5000/sellerSignIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data.message);
    if (data.message == "Login successful") {
      setEmail("");
      setPassword("");
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
      <p>Seller Login Form</p>
      <input
        type="email"
        placeholder="enter email"
        value={email}
        required
        maxLength={100}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        required
        minLength={6}
        maxLength={100}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async (e) => {
    const response = await fetch("http://localhost:5000/sellerSignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
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
      <p>Seller Regiteration Form</p>
      <input
        type="email"
        placeholder="enter email"
        value={email}
        required
        maxLength={100}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        required
        maxLength={100}
        minLength={6}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

const SignUpButton = ({ onClick }) => (
  <div className="boxButton">
    <p>Register now...</p>
    <input type="button" value="Register" onClick={onClick} />
  </div>
);
const SignInButton = ({ onClick }) => (
  <div className="boxButton">
    <p>Good to see you!</p>
    <input type="button" value="Login" onClick={onClick} />
  </div>
);
const SellerAuthToggle = () => {
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
            <SignUp />
          </>
        )}
      </div>
    </>
  );
};
export default SellerAuthToggle;
