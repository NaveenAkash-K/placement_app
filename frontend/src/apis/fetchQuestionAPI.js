import axios from "axios";

const fetchQuestionAPI = async (questionId) => {
    try {
        return await axios.post("http://localhost:3000" + "/quiz/fetch-question", {
                sessionId: localStorage.getItem("sessionId"),
                questionId
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            })
    } catch (e) {
        console.log("ERROR: Fetch question API")
        throw e;
    }
}

export default fetchQuestionAPI;