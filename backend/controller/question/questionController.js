const express = require("express");
const router = express.Router();
const Question = require("../../model/questionModel");

// Utility function to shuffle array (Fisher-Yates Shuffle Algorithm)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

router.get("/", async (req, res) => {
  const { courseId, sectionNo } = req.body;

  try {
    const questions = await Question.find({ courseId, sectionNo });

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found for this section." });
    }

    const selectedQuestions = shuffleArray(questions).slice(0, 5);

    const randomizedQuestions = selectedQuestions.map((q) => {
      const shuffledOptions = shuffleArray([...q.options]);
      return {
        ...q._doc,
        options: shuffledOptions,
      };
    });

    res.json(randomizedQuestions);
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
