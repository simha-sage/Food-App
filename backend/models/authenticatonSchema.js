import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 100, minlength: 6 },
  name: { type: String },
});
const User = mongoose.model("users", userSchema);
export default User;
