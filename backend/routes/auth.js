import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userAuthSchema.js";
import Seller from "../models/sellerAuthSchema.js";

const router = express.Router();

// 🔐 JWT helper
const setTokenCookie = (res, account, role) => {
  const token = jwt.sign(
    {
      _id: account._id,
      name: account.name,
      email: account.email,
      role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// ==========================
// 👤 USER SIGN UP
// ==========================
router.post("/userSignUp", async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name: userName,
    });

    await newUser.save();

    setTokenCookie(res, newUser, "user");

    res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ==========================
// 👤 USER SIGN IN
// ==========================
router.post("/userSignIn", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    setTokenCookie(res, user, "user");

    res.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ==========================
// 🛍 SELLER SIGN UP
// ==========================
router.post("/sellerSignUp", async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Seller already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      email,
      password: hashedPassword,
      name: userName,
    });

    await newSeller.save();

    setTokenCookie(res, newSeller, "seller");

    res.json({
      success: true,
      message: "Seller registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ==========================
// 🛍 SELLER SIGN IN
// ==========================
router.post("/sellerSignIn", async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    setTokenCookie(res, seller, "seller");

    res.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/me", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({
      success: true,
      user: decoded,
    });
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.json({
    success: true,
    message: "Logged out",
  });
});

export default router;
