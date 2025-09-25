import mongoose from "mongoose";
const sellerSchema = new mongoose.Schema({
  email: { type: String, required: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 100, minlength: 6 },
  name: { type: String },
});
const Seller = mongoose.model("sellers", sellerSchema);
export default Seller;
