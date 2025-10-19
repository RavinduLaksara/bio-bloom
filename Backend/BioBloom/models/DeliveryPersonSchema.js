import mongoose from "mongoose";

const deliveryPersonSchema = new mongoose.Schema({
  personId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "delivery",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const deliveryPerson = mongoose.model(delivery_person, deliveryPersonSchema);
export default deliveryPerson;
