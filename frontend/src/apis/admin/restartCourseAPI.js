import axios from "axios";

const restartCourseAPI = async (courseId) => {
    try {
        return await axios.post(process.env.REACT_APP_BACKEND_URI + "/admin/restart-course", {
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
        console.log("ERROR: Restart course API")
        throw e;
    }
}

export default restartCourseAPI;