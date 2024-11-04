const express = require("express");
const userModel = require("../models/Users");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("username", username);
  const user = await userModel.findOne({ username });
  console.log("user=====>", user);
  res.json(user);
});

module.exports = router;
