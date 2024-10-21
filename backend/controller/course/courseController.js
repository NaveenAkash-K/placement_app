const express = require("express");
const router = express.Router();
const Course = require("../../model/courseModel");
const Enrollment = require("../../model/enrollmentModel");
const User = require("../../model/userModel");

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user._id);

    const enrollments = await Enrollment.find({ userEmail: user._id }).populate("courseId");

    console.log(enrollments);
    // Return the populated courses
    res.json(enrollments);
  } catch (error) {
    console.error("Error fetching registered courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
