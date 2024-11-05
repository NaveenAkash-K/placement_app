import axios from "axios";

const calculateResultAPI = async (courseId, sectionNo) => {
    try {
        return await axios.post("http://localhost:3000" + "/quiz/calculate-result", {
                courseId,
                sectionNo,
                userId: localStorage.getItem("userId"),
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            })
    } catch (e) {
        console.log("ERROR: Calculate result API")
        throw e;
    }
}

export default calculateResultAPI;