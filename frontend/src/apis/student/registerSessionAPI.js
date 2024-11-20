import axios from "axios";

const registerSessionAPI = async (courseId, sectionNo, isFinal) => {
    try {
        return await axios.post(process.env.REACT_APP_BACKEND_URI + "/quiz/new-questions", {
            courseId,
            sectionNo: parseInt(sectionNo) + 1,
            userId: localStorage.getItem("userId"),
            isFinal
        },
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
            }
        })
    } catch (e) {
        console.log("ERROR: Register session API")
        throw e;
    }
}

export default registerSessionAPI;