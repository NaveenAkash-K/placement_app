const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  intermediaryQuizMarks: {
    type: [Number],
    default: [],
  },
  finalQuizMarks: {
    type: Number,
    default: 0,
  },
  completedSections: {
    type: [String],
    default: [],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
