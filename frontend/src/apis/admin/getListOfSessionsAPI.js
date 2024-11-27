import axios from "axios";

const getListOfSessionsAPI = async (courseId) => {
    try {
        return await axios.get(process.env.REACT_APP_BACKEND_URI + "/admin/sessions/" + courseId,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            })
    } catch (e) {
        console.log("ERROR: Get List of sessions API")
        throw e;
    }
}

export default getListOfSessionsAPI;