import axios from "axios";

const getAttemptRequestsAPI = async (courseId) => {
    try {
        return await axios.get(process.env.REACT_APP_BACKEND_URI + "/admin/attempt-requests/" + courseId,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            })
    } catch (e) {
        console.log("ERROR: Get Attempt requests API")
        throw e;
    }
}

export default getAttemptRequestsAPI;