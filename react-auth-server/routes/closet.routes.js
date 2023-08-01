const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Closet = require("../models/Closet.model");

// POST /api/closets - Creates a new closet
router.post("/closets", (req, res, next) => {
  Closet.create(req.body)
    .then((newCloset) => {
      return User.findByIdAndUpdate(req.payload._id, {
        $push: { closets: newCloset._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// GET /api/closets - Retrieves all of the closets
router.get("/closets", (req, res, next) => {
  User.findById(req.payload._id)
    .populate("closets")
    .then((userCloset) => {
      console.log(userCloset);
      res.json(userCloset);
    })
    .catch((err) => res.json(err));
});

// GET /api/closets/:closetId - Retrieves a specific closet by id
router.get("/closet/:closetId", (req, res, next) => {
  const { closetId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(closetId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Closet.findById(closetId)
    .populate("items")
    .then((closet) => res.status(200).json(closet))
    .catch((error) => res.json(error));
});

// PUT /api/closets/:closetId - Updates a specific closet by id
router.put("/closets/:closetId", (req, res, next) => {
  const { closetId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(closetId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Closet.findByIdAndUpdate(closetId, req.body, { new: true })
    .then((updatedCloset) => res.json(updatedCloset))
    .catch((error) => res.json(error));
});

// DELETE /api/closets/:closetId - Deletes a specific closet by id
router.delete("/closets/:closetId", (req, res, next) => {
  const { closetId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(closetId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Closet.findByIdAndRemove(closetId)
    .then(() =>
      res.json({ message: `Closet with ${closetId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
