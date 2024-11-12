import axios from "axios";

const closeSessionAPI = async (isFinal, timeTaken) => {
    try {
        return await axios.post(process.env.REACT_APP_BACKEND_URI + "/quiz/close-session", {
                sessionId: localStorage.getItem("sessionId"),
                userId: localStorage.getItem("userId"),
                timeTaken,
                isFinal
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            })
    } catch (e) {
        console.log("ERROR: Close session API")
        throw e;
    }
}

export default closeSessionAPI;