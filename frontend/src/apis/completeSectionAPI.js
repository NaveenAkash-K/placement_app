import axios from "axios";

const completeSectionAPI = async (courseId, sectionNo) => {
    try {
        return await axios.patch("http://localhost:3000/course/enrollments", {
            courseId: courseId,
            sectionNo: parseInt(sectionNo) + 1,
            userId: "671598ea1aa659de63af9c64",
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