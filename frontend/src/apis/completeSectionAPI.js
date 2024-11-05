import axios from "axios";

const completeSectionAPI = async (courseId, sectionId) => {
    try {
        return await axios.patch("http://localhost:3000/course/enrollments", {
            courseId,
            sectionId,
            userId: localStorage.getItem("userId"),
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        });
    } catch (e) {
        console.log("Error: Complete section API")
        throw e;
    }
}

export default completeSectionAPI;