const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto");
const { ObjectId } = mongoose.Types;
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const Question = require("../../model/questionModel");
const User = require("../../model/userModel");
const Session = require("../../model/sessionModel");
const Course = require("../../model/courseModel");
const Enrollment = require("../../model/enrollmentModel");
const { validate } = require("../../model/courseModel");
const { log } = require("console");
const { userInfo } = require("os");
require('dotenv').config()
const path = require('path')

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
  const { courseId, sectionNo, isFinal } = req.body;
  // isFinal may not be needed here as we are gonna set the reattempt in only if it is not the final quiz, but just in case
    const userId = "671598ea1aa659de63af9c64";
  try {
    const course = await Course.findOne({ courseId });
    const enrollment = await Enrollment.findOne({
      course: new ObjectId(course._id),
      user: new ObjectId(userId),
    });
    const quiz = course.quiz.find((q) => q.sectionNo === sectionNo);
    const n = quiz.noOfQuestions;
    const activeSession = await Session.findOne({
      userId: userId,
      courseId: courseId,
      sectionNo: sectionNo,
      isExpired: false,
    })
      .populate({
        path: "questions.question",
        select: "question options time isCheckBox",
      })
      .lean();

    if (activeSession) {
      const questions = activeSession.questions.map((q) => ({
        question: q.question._id,
        text: q.question.question,
        options: q.question.options,
        userAnswer: q.userAnswer,
        isFetched: q.isFetched,
        isCheckBox: q.question.isCheckBox,
        time: q.question.time,
      }));
      return res.json({
        questions,
        startTime: activeSession.startTime,
        session: {
          sessionId: activeSession.sessionId,
        },
      });
    }

    const requestedSection = enrollment.section.find(
      (section) => section.sectionNo === sectionNo
    );
    console.log("Enrollment: " + requestedSection);

    // TODO: Decide whether to keep the no of attempts in env
    console.log(
      requestedSection.noOfAttempts < 2 ||
      (requestedSection.reattemptIn < Date.now() && !isFinal)
    );
    console.log(requestedSection.reattemptIn != null);
    if (
      requestedSection.noOfAttempts < 2 ||
      (requestedSection.reattemptIn < Date.now() && !isFinal) ||
      (isFinal &&
        enrollment.finalQuizAllowReattemptCount * 2 > quiz.noOfAttempts)
    ) {
      const previousSessions = await Session.find({
        userId: userId,
        courseId: courseId,
        sectionNo: sectionNo,
      }).populate("questions.question");
      console.log(previousSessions.length);

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
          time: q.time,
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

      res.json({
        questions: randomizedQuestions,
        startTime: session.startTime,
        session: session,
      });
    } else if (requestedSection.reattemptIn > Date.now() && !isFinal) {
      return res.status(400).json({
        message:
          "You are allowed to reattend the quiz on " +
          requestedSection.reattemptIn,
      });
      // } else if (
      //   isFinal &&
      //   enrollment.finalQuizAllowReattemptCount * 2 >= quiz.noOfAttempts
      // ) {
      //   return res.json({ message: ""})
    } else {
      return res
        .status(403)
        .json({ message: "Maximum no of attempts reached for the final quiz" });
    }
  } catch (error) {
    console.error("Error fetching new questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/validate-session", async (req, res) => {
  const { sessionId } = req.body;
  const session = await Session.findOne({ sessionId });
  console.log(session);
  if (!session.isExpired) {
    console.log(session.isExpired);
    return res.status(200).json({ message: "Session valid" });
  }
  return res.status(404).json({ message: "Session invalid" });
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
          "questions.$.isFetched": true,
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
  const { sessionId, questionId, timeTaken, userAnswer } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const isCorrect = validateAnswer(userAnswer, question.answer);
    console.log(question + " : " + isCorrect);
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
          "questions.$.timeTaken": timeTaken,
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
  const { courseId, sectionNo, isFinal } = req.body;
    const userId = "671598ea1aa659de63af9c64";

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

    const sessionResults = sessions.map((session) => ({
      sessionId: session.sessionId,
      ...session.result,
    }));

  
    if (isFinal) {
      const course = await Course.findOne({ courseId })
      const enrollment = await Enrollment.findOne({ user: userId, course: course._id });
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found for this user and course." });
      }
      const hasPassedFinal = enrollment.section.some(section => section.isFinal && section.isCompleted);
      console.log(enrollment);

      if(hasPassedFinal) {
        let finalQuizScore = 0;
        let otherQuizScores = 0;

        enrollment.section.forEach((section) => {
          if (section.isCompleted && section.score != 0) {
            if (section.isFinal) {
              finalQuizScore = score;
            } else {
              otherQuizScores += score;
            }
          }
        });

        const quizScore = (finalQuizScore * 0.6) + ((otherQuizScores / (enrollment.section.length - 1)) * 0.4);
        enrollment.finalQuizScore = quizScore
        await enrollment.save()
      }
    }

    res.json({
      courseId,
      sectionNo,
      sessionResults,
    });
  } catch (error) {
    console.error("Error retrieving results:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/close-session", async (req, res) => {
  const { sessionId, timeTaken, isFinal } = req.body;
    const userId = "671598ea1aa659de63af9c64";
  try {
    const session = await Session.findOneAndUpdate(
      { sessionId },
      { $set: { isExpired: true } },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }

    const course = await Course.findOne({ courseId: session.courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const sectionQuiz = course.quiz.find(
      (q) => q.sectionNo === session.sectionNo
    );
    if (!sectionQuiz) {
      return res
        .status(404)
        .json({ message: "Quiz section not found in course." });
    }

    const { cutOff, noOfQuestions } = sectionQuiz;

    let correctAnswers = 0;
    session.questions.forEach((q) => {
      if (q.isCorrect) correctAnswers += 1;
    });

    const scorePercentage = (correctAnswers / noOfQuestions) * 100;
    const hasPassed = scorePercentage >= cutOff;
    if(isFinal){
      await sendCertificate(userId, course.courseName)
    }
    session.result = {
      correctAnswers,
      totalQuestions: noOfQuestions,
      cutOff,
      scorePercentage,
      hasPassed,
      timeTaken,
      message: hasPassed
        ? "User has passed this session quiz!"
        : "User did not meet the passing criteria for this session.",
    };

    await session.save();
    console.log(session.courseId);
    console.log(session.userId);
    const enrollment = await Enrollment.findOne({
      course: new ObjectId(course._id),
      user: new ObjectId(userId),
    });

    const attendedSection = enrollment.section.find((section) => section.sectionNo === session.sectionNo)
    attendedSection.noOfAttempts++;
    if (!hasPassed && attendedSection.noOfAttempts >= 2 && !isFinal) {
      attendedSection.reattemptIn = new Date(Date.now() + 24 * 60 * 60 * 1000);
    } else if (hasPassed) {
      attendedSection.isCompleted = true
      attendedSection.score = scorePercentage 
    }

    await enrollment.save();

    res.json({
      message: "Session closed and result calculated successfully.",
      result: session.result,
    });
  } catch (error) {
    console.error("Error closing session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

async function sendCertificate(userId, courseName) {
  try {
    const user = await User.findById(userId);
    if (!user || !user.email) {
      console.error("User email not found.");
      return;
    }

    const certificatePath = path.join(
      __dirname,
      "../../assets",
      "cert.pdf"
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Your Course Completion Certificate",
      text: `Dear ${user.name},\n\nCongratulations on completing the ${courseName} course! Please find your certificate attached.\n\nBest regards,\nYour Team`,
      attachments: [
        {
          filename: "certificate.pdf",
          path: certificatePath,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Certificate sent successfully to:", user.email);
  } catch (error) {
    console.error("Error sending certificate:", error);
  }
}

module.exports = router;
