import axios from "axios";

const completeSectionAPI = async (courseId, sectionNo) => {
    try {
        return await axios.patch(process.env.REACT_APP_BACKEND_URI + "/course/enrollments", {
            courseId: courseId,
            sectionNo: parseInt(sectionNo) + 1,
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