import axios from "axios";

const closeSessionAPI = async () => {
    try {
        return await axios.post("http://localhost:3000" + "/quiz/close-session", {
                sessionId: localStorage.getItem("sessionId"),
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