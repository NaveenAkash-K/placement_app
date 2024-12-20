const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  noOfSections: {
    type: Number,
    required: true,
  },
  quiz: [
    {
      sectionNo: Number,
      cutOff: Number,
      noOfQuestions: Number,
    },
  ],
});

module.exports = mongoose.model("course", courseSchema);
