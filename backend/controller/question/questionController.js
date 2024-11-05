const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto");
const { ObjectId } = mongoose.Types;
const { v4: uuidv4 } = require("uuid");
const Question = require("../../model/questionModel");
const Session = require("../../model/sessionModel");
const Course = require("../../model/courseModel");
const { validate } = require("../../model/courseModel");
const { log } = require("console");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const validateAnswer = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

function generateFingerprint(req) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  console.log(ip + ": ");

  const fingerprintString = `${ip}-${userAgent}`;
  return crypto.createHash("sha256").update(fingerprintString).digest("hex");
}

router.post("/new-questions", async (req, res) => {
  const { courseId, sectionNo, userId } = req.body;

  try {
    const course = await Course.findOne({ courseId });
    const quiz = course.quiz.find((q) => q.sectionNo === sectionNo);
    const n = quiz.noOfQuestions;
    const activeSession = await Session.findOne({
      userId: userId,
      courseId: courseId,
      sectionNo: sectionNo,
      isExpired: false,
    }).populate({
      path: "questions.question",
      select: "question options time isCheckBox"
    }).lean();

    if (activeSession) {
      const questions = activeSession.questions.map((q) => ({
        question:q.question._id,
        text: q.question.question,
        options: q.question.options,
        userAnswer: q.userAnswer,
        isFetched: q.isFetched,
        isCheckBox: q.question.isCheckBox,
        time: q.question.time,
      }));
      return res.json({
        questions,
        session: {
          sessionId: activeSession.sessionId,
        },
      });
    }

    const previousSessions = await Session.find({
      userId: userId,
      courseId: courseId,
      sectionNo: sectionNo,
    }).populate("questions.question");
    console.log(previousSessions.length);
    // TODO: Decide whether to keep the no of attempts in env
    if (previousSessions.length >= 2) {
      return res.status(400).json({ message: "Maximum no of attempts reached" });
    }

    const previouslyAskedQuestions = previousSessions.flatMap((session) =>
      session.questions.map((q) => q.question.questionId)
    );
    console.log(previouslyAskedQuestions);

    let newQuestions = await Question.find({
      courseId,
      sectionNo,
      questionId: { $nin: previouslyAskedQuestions },
    });

    if (newQuestions.length < n) {
      const additionalQuestionsNeeded = n - newQuestions.length;

      const additionalQuestions = await Question.find({
        courseId,
        sectionNo,
        questionId: { $in: previouslyAskedQuestions },
      });

      const shuffledAdditionalQuestions = shuffleArray(
        additionalQuestions
      ).slice(0, additionalQuestionsNeeded);
      newQuestions = [...newQuestions, ...shuffledAdditionalQuestions];
    }

    if (newQuestions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions available for this section." });
    }

    const selectedQuestions = shuffleArray(newQuestions).slice(0, n);
    const randomizedQuestions = selectedQuestions.map((q) => {
      return {
        question: q._id,
        time: q.time
      };
    });

    const session = await Session.create({
      sessionId: uuidv4(),
      userId: userId,
      courseId: courseId,
      sectionNo: sectionNo,
      questions: selectedQuestions.map((q) => ({
        question: q._id,
      })),
      ip: req.ip,
      startTime: new Date(),
      expiryTime: new Date(Date.now() + 60 * 60 * 1000),
      isExpired: false,
    });

    // const sessionToSend = {
    //   ...session._doc,
    //   questions: session.questions.map(({ isCorrect, ...rest }) => rest),
    // }

    res.json({ questions: randomizedQuestions, session: session });
  } catch (error) {
    console.error("Error fetching new questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/fetch-question", async (req, res) => {
  const { sessionId, questionId } = req.body;

  try {
    const session = await Session.findOne({ sessionId, isExpired: false });
    if (!session) {
      return res.status(404).json({ message: "Session not found or expired." });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const shuffledOptions = shuffleArray([...question.options]);

    await Session.findOneAndUpdate(
        {
          sessionId: sessionId,
          "questions.question": question._id,
        },
        {
          $set: {
            "questions.$.isFetched": true
          },
        },
        { new: true }
    );

    res.json({
      question: {
        questionId: question._id,
        question: question.question,
        isCheckBox: question.isCheckBox,
        options: shuffledOptions,
        time: question.time,
      },
      message: "Question fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/update-answer", async (req, res) => {
  const { sessionId, questionId, userAnswer } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const isCorrect = validateAnswer(userAnswer, question.answer);
    console.log(question+" : "+ isCorrect);
    console.log(question._id);
    const session = await Session.findOneAndUpdate(
      {
        sessionId: sessionId,
        "questions.question": question._id,
      },
      {
        $set: {
          "questions.$.userAnswer": userAnswer,
          "questions.$.isCorrect": isCorrect,
          "questions.$.isCompleted": true
        },
      },
      { new: true }
    );
    console.log(session);
    if (!session) {
      return res
        .status(404)
        .json({ message: "Session or question not found." });
    }

    res.json({ message: "Answer updated successfully" });
  } catch (error) {
    console.error("Error updating answer correctness:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/tab-switch", async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await Session.findOneAndUpdate(
      { sessionId: sessionId },
      { $inc: { tabSwitchCount: 1 } },
      { new: true }
    );
    console.log(session);

    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }

    res.json({
      message: "Tab switch count incremented successfully",
      tabSwitchCount: session.tabSwitchCount,
    });
  } catch (error) {
    console.error("Error incrementing tab switch count:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/calculate-result", async (req, res) => {
  const { userId, courseId, sectionNo } = req.body;

  try {
    const sessions = await Session.find({
      userId,
      courseId,
      sectionNo,
    });

    if (sessions.length === 0) {
      return res
        .status(404)
        .json({ message: "No session found for this course and section." });
    }

    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const sectionQuiz = course.quiz.find((q) => q.sectionNo === sectionNo);
    if (!sectionQuiz) {
      return res
        .status(404)
        .json({ message: "Quiz section not found in course." });
    }

    const { cutOff, noOfQuestions } = sectionQuiz;

    const sessionResults = sessions.map((session) => {
      let correctAnswers = 0;

      session.questions.forEach((q) => {
        if (q.isCorrect) correctAnswers += 1;
      });

      const scorePercentage = (correctAnswers / noOfQuestions) * 100;
      const hasPassed = scorePercentage >= cutOff;

      return {
        sessionId: session.sessionId,
        correctAnswers,
        totalQuestions: noOfQuestions,
        scorePercentage,
        hasPassed,
        message: hasPassed
          ? "User has passed this session quiz!"
          : "User did not meet the passing criteria for this session.",
      };
    });

    res.json({
      courseId,
      sectionNo,
      cutOff,
      sessionResults,
    });
  } catch (error) {
    console.error("Error calculating results:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/close-session", async (req, res) => {
  const { sessionId } = req.body;
  try {
    const session = await Session.findOneAndUpdate(
      { sessionId },
      { $set: { isExpired: true } },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }

    res.json({ message: "Session closed successfully." });
  } catch (error) {
    console.error("Error closing session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
