const express = require("express");
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types
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
      (enrollment) => enrollment.course.id
    );

    console.log(registeredCourseIds);

    const allCourses = await Course.find();

    const unregisteredCourses = allCourses.filter(
      (course) => !registeredCourseIds.includes(course.id)
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

router.post("/register", async(req,res) => {
  const { courseId } = req.body;

  try{
    console.log(req.body.USER_email);
    const user = await User.findOne({ email: req.body.USER_email });
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    console.log(user);
    console.log(course);

     const enrollment = new Enrollment({
      user: user._id,
      course: course._id,
      intermediaryQuizMarks: [],
      finalQuizMarks: 0,
      completedSections: [],
      isCompleted: false,
    });

    await enrollment.save();

    res.status(201).json({ message: "Enrollment created successfully", enrollment });
  }catch(error){
    console.error("Error registering course: ",error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.delete("/enrollments", async (req, res) => {
  try {
    const result = await Enrollment.deleteMany({});
    res.json({
      message: `${result.deletedCount} enrollments deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting enrollments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/enrollments", async (req, res) => {
  const { courseId, sectionId, userId } = req.body;

  try {
    if (!ObjectId.isValid(courseId) || !ObjectId.isValid(userId)) {
      return res.status(404).json("Invalid ObjectId");
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      {
        course: new ObjectId(courseId),
        user: new ObjectId(userId),
      },
      {
        $set: { [`completedSections.${sectionId - 1}`]: true }, 
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    res.json({
      message: "Section marked as completed successfully.",
      enrollment,
    });
  } catch (error) {
    console.error("Error updating completed sections:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;