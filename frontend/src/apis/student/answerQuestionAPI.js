import axios from "axios";

const answerQuestionAPI = async (questionId, userAnswer, timeTaken) => {
    try {
        return await axios.post(process.env.REACT_APP_BACKEND_URI + "/quiz/update-answer", {
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