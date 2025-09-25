import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String, // URL or path
  },
});
const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, // Example: "Starter", "Tiffin"
  dishes: [dishSchema], // array of dishes under that category
});
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  ownerName: { type: String, required: true, trim: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  phoneNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  location: {
    city: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, match: /^[0-9]{6}$/ },
  },
  restaurantType: {
    type: String,
    required: true,
  },
  openingHours: { type: String, required: true },
  closingHours: { type: String, required: true },
  media: {
    logo: { type: String, required: true },
    coverPhoto: { type: String, required: true },
  },
  categories: [categorySchema], // <-- empty array by default
  createdAt: { type: Date, default: Date.now },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
