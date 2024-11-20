import axios from "axios";

const getEnrolledStudentsAPI = async (courseId) => {
    try {
        return await axios.get(process.env.REACT_APP_BACKEND_URI + "/admin/enrolledStudents/" + courseId,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            })
    } catch (e) {
        console.log("ERROR: Get enrolled students API")
        throw e;
    }
}

export default getEnrolledStudentsAPI;