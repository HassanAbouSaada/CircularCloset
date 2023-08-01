const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  title: String,
  description: String,
  color: String,
  isPublic: {
    type: Boolean,
    default: false,
  },
  enum: [
    "Jacket",
    "Shirt",
    "Trousers",
    "Accessories",
    "Hats",
    "Bags",
    "Dresses",
    "Skirts",
    "Other",
  ],
  closet: { type: Schema.Types.ObjectId, ref: "Closet" },
  image: String,
});

module.exports = model("Item", itemSchema);
