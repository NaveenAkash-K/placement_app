import axios from "axios";

const completeSectionAPI = async (courseId, sectionNumber) => {
    try {
        return await axios.post("http://localhost:3000/course/", {
            courseId,
            sectionNumber
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