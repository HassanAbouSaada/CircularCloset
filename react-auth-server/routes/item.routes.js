//routes/item.routes.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Item = require("../models/Item.model");
const Closet = require("../models/Closet.model");
const { uploader, cloudinary } = require("../config/cloudinary.config");

//  POST /ULPOAD THE IMAGE
router.post("/upload", uploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

router.post("/items", (req, res, next) => {
  console.log(req.body, "the requested");

  Item.create(req.body)
    .then((newItem) => {
      return Closet.findByIdAndUpdate(req.body.closetId, {
        $push: { items: newItem._id },
      });
    })
    .then((response) => {
      console.log("success", response);
      res.json(response);
    })
    .catch((err) => res.json(err));
});

router.put("/items/:itemID", (req, res, next) => {
  const { itemID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemID)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Item.findByIdAndUpdate(itemID, req.body, { new: true })
    .then((updatedItem) => res.json(updatedItem))
    .catch((error) => res.json(error));
});

module.exports = router;
