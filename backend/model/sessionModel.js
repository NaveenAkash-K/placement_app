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
  questions: [
    {
        question: {
            type: Schema.Types.ObjectId,
            ref:"question",
            required: true,
        },
        userAnswer: [String],
        isCorrect: Boolean
    }
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
});

// Indexing the expiry for efficient access
sessionSchema.index({ expiry_time: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Session", sessionSchema);
