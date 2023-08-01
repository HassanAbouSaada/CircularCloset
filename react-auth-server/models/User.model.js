// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  profilePicture: { type: String },
  height: { type: Number },
  weight: { type: Number },
  address: { type: String },
  closets: [{ type: Schema.Types.ObjectId, ref: "Closet" }],
});

module.exports = model("User", userSchema);
