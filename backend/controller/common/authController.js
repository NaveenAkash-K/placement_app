const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/userModel"); // Assuming your user model is in models/User.js
const router = express.Router();
require("dotenv").config();

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();
    console.log(email);

    const users = await User.find({});
    console.log(users);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const jwtToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        department: user.department,
      },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      jwtToken,
      userId: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      department: user.department,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
