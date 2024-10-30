import axios from "axios";

const registerSessionAPI = async (courseId, sectionNo) => {
    try {
        return await axios.post("http://localhost:3000" + "/quiz/new-questions", {
            courseId,
            sectionNo,
            // userId: localStorage.getItem("userId")
            userId: "dfjdflddqdl213487833"
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