import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "customer",
  },
  phone_no: {
    type: String,
  },
  address: {
    type: String,
  },
  otp: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  avator: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/3607/3607444.png",
  },
});

const User = mongoose.model("users", userSchema);
export default User;
