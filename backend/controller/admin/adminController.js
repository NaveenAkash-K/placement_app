const express = require("express");
const router = express.Router();
const User = require("../../model/userModel");

router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
