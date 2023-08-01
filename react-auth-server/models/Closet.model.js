const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const closetSchema = new Schema({
  title: String,
  description: String,
  width: Number,
  height: Number,
  color: String,
  isPublic: {
    type: Boolean,
    default: false,
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = model("Closet", closetSchema);
