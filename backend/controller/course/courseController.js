const express = require("express");
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types
const router = express.Router();
const Course = require("../../model/courseModel");
const Enrollment = require("../../model/enrollmentModel");
const User = require("../../model/userModel");

router.get("/get-courses/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not foundn" });
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

router.post("/register", async (req, res) => {
  const { courseId } = req.body;

  try {
    // TODO: check for already existing enrollment
    console.log(req.body.USER_email);
    // const user = await User.findOne({ email: req.body.USER_email });
    // TODO: check for user with uid
    const user = await User.findOne({ email: "student@example.com" });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    console.log(user);
    console.log(course);

    const sectionArray = Array.from({ length: course.noOfSections }, (_, i) => {
      const sectionNo = i + 1;
      const quizSection = course.quiz.find((q) => q.sectionNo === sectionNo);

      return {
        sectionNo,
        isCompleted: false,
        noOfAttempts: quizSection ? 0 : undefined,
        reattemptIn: quizSection ? null : undefined,
        timeTaken: quizSection ? null : undefined,
        isFinal: quizSection && sectionNo === course.noOfSections,
      };
    });


    const enrollment = new Enrollment({
      user: user._id,
      course: course._id,
      section: sectionArray
    });

    await enrollment.save();

    res
      .status(201)
      .json({ message: "Enrollment created successfully", enrollment });
  } catch (error) {
    console.error("Error registering course: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


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
  const { courseId, sectionNo, userId } = req.body;

  try {
    const course = await Course.findOne({ courseId });
    console.log(course);


    const enrollment = await Enrollment.findOneAndUpdate(
        {
          course: new ObjectId(course._id),
          user: new ObjectId(userId),
          "section.sectionNo": sectionNo,
        },
        {
          $set: {
            "section.$.isCompleted": true,
          },
        },
        { new: true }
    );

    // if (enrollment.completedSections.length <= sectionId) {
    //   const fillArray = Array(
    //     sectionId - enrollment.completedSections.length + 1
    //   ).fill(false);
    //   enrollment.completedSections.push(...fillArray);
    // }

    // await enrollment.save();

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

router.get("/attempt-requests", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      section: { $elemMatch: { isFinal: true } },
    })
      .populate("user", "-password")
      .populate("course", "courseName");

    const response = enrollments.flatMap((enrollment) => {
      return enrollment.section
        .filter(
          (section) =>
            section.isFinal &&
            section.noOfAttempts >= enrollment.finalQuizAllowReattemptCount * 2
        )
        .map((section) => ({
          noOfAttempts: section.noOfAttempts,
          user: enrollment.user,
          courseName: enrollment.course.courseName,
        }));
    });

    return res.json(response);
  } catch (error) {
    console.error("Error fetching attempt requests:", error);
    res.status(500).json({ message: "Server error fetching attempt requests" });
  }
});

router.post("/allow-reattempt", async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const course = await Course.findOne({ courseId });      
    const enrollment = await Enrollment.findOne({ user: userId, course: course._id });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.finalQuizAllowReattemptCount += 1

    await enrollment.save();

    return res.json({ message: "Reattempt allowed successfully", enrollment });
  } catch (error) {
    console.error("Error allowing reattempt:", error);
    res.status(500).json({ message: "Server error allowing reattempt" });
  }
});

router.post("/restart-course", async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const enrollment = await Enrollment.findOne({
      user: userId,
      course: course._id,
    });
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.section = enrollment.section.map((section) => {
      const quizDefaults = course.quiz.find(
        (quiz) => quiz.sectionNo === section.sectionNo
      );

      return {
        sectionNo: section.sectionNo,
        isCompleted: false,
        noOfAttempts: quizDefaults ? 0 : undefined,
        reattemptIn: quizDefaults ? null : undefined,
        timeTaken: quizDefaults ? null : undefined,
        isFinal: section.isFinal || false,
      };
    });

    enrollment.finalQuizAllowReattemptCount = 1;

    await enrollment.save();

    return res.json({
      message: "Course restarted successfully",
      enrollment,
    });
  } catch (error) {
    console.error("Error restarting course:", error);
    return res.status(500).json({ message: "Server error restarting course" });
  }
});



module.exports = router;