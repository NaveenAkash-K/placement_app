import axios from "axios";

const registerCourseAPI = async (courseId) => {
    try {
        return await axios.post("http://localhost:3000" + "/course/register", {
            courseId
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
            }
        })
    } catch (e) {
        console.log("ERROR: Register course API")
        throw e;
    }
}

export default registerCourseAPI;