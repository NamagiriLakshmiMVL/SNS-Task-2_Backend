const express = require("express");
const userModel = require("../model/userModel");
const hashedpassword = require("../helper.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Getting All Users
router.get("/allUsers", async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

//New User Login
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const isUser = await userModel.findOne({ email: email });
  if (isUser) {
    res.send({ message: "User Already Exists" });
    return;
  }
  const hashedPassword = await hashedpassword(password);

  const data = await new userModel({
    email: email,
    name: name,
    password: hashedPassword,
  });
  await data.save();
  const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
  res.send({ message: "User Created Successfully", token: token });
});

//Login a User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      const storedPassword = user.password;
      const isMatch = await bcrypt.compare(password, storedPassword);
      if (!isMatch) {
        res.send({ message: "Invalid Credentials" });
        return;
      }
      const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
      res.send({ message: "Login Success", token: token });
    } else {
      res.send({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.send({ message: "Invalid Credentials" });
  }
});
module.exports = router;
