// routes/user.routes.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

// GET /users to fetch all users
router.get("/users", (req, res, next) => {
  User.find()
    .populate({
      path: "closets",
      populate: {
        path: "items", // Make sure this path matches the property name in the closetSchema
        model: "Item",
      },
    })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.json(err));
});

// GET /users to fetch all users
router.get("/users/:userId", (req, res, next) => {
  const userId = req.params.userId;
  console.log("user in back", userId);
  User.findById(userId)
    .populate({
      path: "closets",
      populate: {
        path: "items", // Make sure this path matches the property name in the closetSchema
        model: "Item",
      },
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
