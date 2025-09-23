import express from "express";
import User from "../models/authenticatonSchema.js";
const router = express.Router();
router.post("/userSignUp", async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const newUser = new User({ email, password, name: userName });
    await newUser.save();
    res.send({ message: "User added sucessfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res.status(400).send({ message: "invalid input" });
    } else {
      res.status(500).send({ messaage: "internal server error" });
    }
  }
});

router.post("/userSignIn", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.send({ message: "Unsucessful" });
  }
  res.json({ message: "Login successful", data: user });
});

export default router;
