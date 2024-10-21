const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",  
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "course",
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
    type: [Boolean],
    default: [],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});


module.exports = mongoose.model("enrollment",enrollmentSchema)
