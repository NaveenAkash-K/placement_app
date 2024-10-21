const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionId: {
    type:String,
    required:true,
  },
  courseId: {
    type: String,
    required: true,
  },
  sectionNo: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: [String],
    required: true,
  },
  isCheckBox: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model("question", questionSchema);

