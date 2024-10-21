const express = require("express");
const router = express.Router();
const Course = require("../../model/courseModel");
const Enrollment = require("../../model/enrollmentModel");
const User = require("../../model/userModel");

router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const enrollments = await Enrollment.find({ user: user._id }).populate(
      "course"
    );

    const registeredCourseIds = enrollments.map(
      (enrollment) => enrollment.course._id
    );

    const allCourses = await Course.find();

    const unregisteredCourses = allCourses.filter(
      (course) => !registeredCourseIds.includes(course._id.toString())
    );

    res.json({
      registeredCourses: enrollments,
      unregisteredCourses: unregisteredCourses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
