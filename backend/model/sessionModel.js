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
    type: String,
    required: true,
  },
  questions: [
    {
        questionId: {
            type: String,
            required: true,
        },
        isCorrect: Boolean,
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
  hasAttempted: {
    type: Boolean,
    default: false,
  },
  ip: {
    type: String,
  },
  noOfTabSwitches: {
    type: Number,
    default: 0,
    min: 0,
  },
});

// Indexing the expiry for efficient access
sessionSchema.index({ expiry_time: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Session", sessionSchema);
