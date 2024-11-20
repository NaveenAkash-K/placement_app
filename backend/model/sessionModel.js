const mongoose = require("mongoose");
const Schema = mongoose.Schema

const sessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  sectionNo: {
    type: Number,
    required: true,
  },
  isFinal: Boolean,
  questions: [
    {
      question: {
        type: Schema.Types.ObjectId,
        ref: "question",
        required: true,
      },
      userAnswer: [String],
      isCorrect: Boolean,
      isFetched: {
        type: Boolean,
        default: false,
      },
      timeTaken: Number,
    },
  ],
  startTime: {
    type: Date,
    required: true,
  },
  expiryTime: {
    type: Date, 
    required: true,
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
  ip: {
    type: String,
    required: true,
  },
  tabSwitchCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  result: {
    correctAnswers: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    cutOff: {
      type: Number,
    },
    scorePercentage: {
      type: Number,
      default: 0,
    },
    hasPassed: {
      type: Boolean,
      default: false,
    },
    timeTaken:Number,
    message: {
      type: String,
      default: "",
    },
  },
});

// Indexing the expiry for efficient access
sessionSchema.index({ expiry_time: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Session", sessionSchema);
