import express from "express";
import Cart from "../models/cartSchema.js";
const router = express.Router();

// POST: Add or update cart
router.post("/add", async (req, res) => {
  try {
    const { userId, restaurants } = req.body;

    // 1️⃣ Check if user has a cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        restaurants,
      });
    } else {
      // Update existing cart: replace restaurants array
      cart.restaurants = restaurants;
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET: Get cart for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
