import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { list } from "postcss";
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors({ origin: "http://localhost:1234" }));
try {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("connected DB");
  app.listen(5000, () => {
    console.log("listensing at 5000");
  });
} catch (e) {
  console.error(e);
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 100, minlength: 6 },
  cart: { type: Array },
  name: { type: String },
});
const User = mongoose.model("users", userSchema);

app.post("/userSignUp", async (req, res) => {
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

app.post("/userSignIn", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.send({ message: "Unsucessful" });
  }
  const data = await fetchData();
  res.json({ message: "Login successful", Data: data, userName: user.name });
});

const sellerSchema = new mongoose.Schema({
  email: { type: String, required: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 100, minlength: 6 },
});
const Seller = mongoose.model("sellers", sellerSchema);

app.post("/sellerSignUp", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newSeller = new Seller({ email, password });
    await newSeller.save();
    res.send({ message: "Seller added sucessfully" });
  } catch (error) {
    res.status(400).send({ message: "invalid input" });
  }
});

app.post("/sellerSignIn", async (req, res) => {
  const { email, password } = req.body;
  const seller = await Seller.findOne({ email });
  if (!seller || seller.password !== password) {
    return res.send({ message: "Unsucessful" });
  }
  res.json({ message: "Login successful" });
});

//getting swiggy data
const fetchData = async () => {
  const data = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.544893&lng=81.521241&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    }
  );
  const json = await data.json();
  return json;
};

//getting reatuarent data
app.post("/gettingRestaurantData", async (req, res) => {
  const { id } = req.body;
  const data = await restaurantsData(id);
  try {
    if (data) {
      res.send(data);
    }
  } catch (e) {
    console.error(e);
  }
});

const restaurantsData = async (id) => {
  const data = await fetch(
    `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=16.544893&lng=81.521241&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    }
  );
  const json = await data.json();
  return json;
};
