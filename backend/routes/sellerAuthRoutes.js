import express from "express";
import Seller from "../models/sellerAuthSchema.js";
const router = express.Router();
router.post("/sellerSignUp", async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const newSeller = new Seller({ email, password, name: userName });
    await newSeller.save();
    res.send({ message: "Seller added sucessfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res.status(400).send({ message: "invalid input" });
    } else {
      res.status(500).send({ messaage: "internal server error" });
    }
  }
});

router.post("/sellerSignIn", async (req, res) => {
  const { email, password } = req.body;
  const seller = await Seller.findOne({ email });
  if (!seller || seller.password !== password) {
    return res.send({ message: "Unsucessful" });
  }
  res.send({ message: "Login successful", data: seller });
});

export default router;
