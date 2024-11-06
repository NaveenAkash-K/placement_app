import axios from "axios";

const answerQuestionAPI = async (questionId, userAnswer, timeTaken) => {
    try {
        return await axios.post("http://localhost:3000" + "/quiz/update-answer", {
                sessionId: localStorage.getItem("sessionId"),
                questionId,
                userAnswer,
                timeTaken
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            })
    } catch (e) {
        console.log("ERROR: Answer question API")
        throw e;
    }
}

export default answerQuestionAPI;