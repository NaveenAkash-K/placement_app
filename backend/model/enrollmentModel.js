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
    // isCompleted: {
    //   type: Boolean,
    //   default: false,
    // },
    section: [
      {
        sectionNo: {
          type: Number,
          required: true,
        },
        noOfAttempts: {
          type: Number,
        },
        reattemptIn: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
        isFinal: {
          type: Boolean,
        },
        timeTaken: {
          type: Date,
        },
      },
    ],
    finalQuizAllowReattemptCount: {
      type: Number,
      default: 1,
    },
  });


  module.exports = mongoose.model("enrollment",enrollmentSchema)
