import axios from "axios";

const getSessionAnswersAPI = async (sessionId) => {
    try {
        return await axios.get(process.env.REACT_APP_BACKEND_URI + "/admin/session/" + sessionId,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            })
    } catch (e) {
        console.log("ERROR: Get session answers API")
        throw e;
    }
}

export default getSessionAnswersAPI;