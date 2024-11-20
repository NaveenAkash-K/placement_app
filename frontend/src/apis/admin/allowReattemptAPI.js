import axios from "axios";

const allowReattemptsAPI = async (courseId) => {
    try {
        return await axios.post(process.env.REACT_APP_BACKEND_URI + "/admin/allow-reattempt", {
                userId: localStorage.getItem("userId"),
                courseId
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            }
        )
    } catch (e) {
        console.log("ERROR: Allow reattempts API")
        throw e;
    }
}

export default allowReattemptsAPI;