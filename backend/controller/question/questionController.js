const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Question = require("../../model/questionModel");
const Session = require("../../model/sessionModel");


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


router.get("/new-questions", async (req, res) => {
  const { courseId, sectionNo, userId, n } = req.body;

  try {

    // TODO: check if the student has enrolled for this course (might be needed)
    // change n to env
    // get userId from jwt
    const activeSession = await Session.findOne({
      userId: userId,
      courseId: courseId,
      sectionNo: sectionNo,
      isExpired: false,
    });

    // Anyways hasAttempted and isExpired will also be set to true on completion of the quiz, so no extra check has been added
    if (activeSession) {
      return res.json(activeSession);
    }

    const sessions = await Session.find({
      user_id: userId,
      course_id: courseId,
      section_no: sectionNo,
    });

    const previouslyAskedQuestions = sessions.flatMap((session) =>
      session.questions.map((q) => q.questionId)
    );

    let newQuestions = await Question.find({
      courseId,
      sectionNo,
      questionId: { $nin: previouslyAskedQuestions },
    });

    if (newQuestions.length < n) {
      const additionalQuestionsNeeded = n - newQuestions.length;

      const allAdditionalQuestions = await Question.find({
        courseId,
        sectionNo,
        questionId: { $in: previouslyAskedQuestions },
      });
      const shuffledAdditionalQuestions = shuffleArray(allAdditionalQuestions).slice(0,additionalQuestionsNeeded)

      newQuestions = [...newQuestions, ...shuffledAdditionalQuestions];
    }

    if (newQuestions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions available for this section." });
    }

    const selectedQuestions = shuffleArray(newQuestions).slice(0, n);
    const randomizedQuestions = selectedQuestions.map((q) => {
      const shuffledOptions = shuffleArray([...q.options]);
      return {
        ...q._doc,
        options: shuffledOptions,
      };
    });
    for(const q of randomizedQuestions){
      console.log(q.questionId);
    }
    const session = await Session.create({
      sessionId: uuidv4(),
      userId: userId,
      courseId: courseId,
      sectionNo: sectionNo,
      questions: selectedQuestions.map((q) => ({
        questionId: q.questionId,
        isCorrect: false,
      })),
      startTime: new Date(),
      expiryTime: new Date(Date.now() + 60 * 60 * 1000),
      isExpired: false,
    });

    // TODO : decide if questions is needed here?
    res.json({questions: randomizedQuestions,session: session});
  } catch (error) {
    console.error("Error fetching new questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const validateAnswer = (arr1, arr2) => {
   if (arr1.length !== arr2.length) return false;

   const sortedArr1 = arr1.slice().sort();
   const sortedArr2 = arr2.slice().sort();

   return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

router.post("/update-answer", async (req, res) => {
   const { sessionId, questionId, userAnswer } = req.body;

   try {
      const question = await Question.findOne({ questionId });
      if (!question) {
         return res.status(404).json({ message: "Question not found." });
      }

      const isCorrect = validateAnswer(userAnswer, question.answer);
      console.log(userAnswer+" : "+question.answer)

      // TODO : do we need a check for validate the session(check if isExpired is false)
      const session = await Session.findOneAndUpdate(
         { sessionId: sessionId, "questions.questionId": questionId },
         { $set: { "questions.$.isCorrect": isCorrect } },
         { new: true }
      );

      if (!session) {
         return res.status(404).json({ message: "Session or question not found." });
      }

      res.json({ message: "Answer updated successfully",isCorrect: isCorrect });
   } catch (error) {
      console.error("Error updating answer correctness:", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
});


module.exports = router;
