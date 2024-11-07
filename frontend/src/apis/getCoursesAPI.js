import axios from "axios";

const getCoursesAPI = async () => {
    try {
        return await axios.get(process.env.REACT_APP_BACKEND_URI + "/course/get-courses/" + localStorage.getItem("email"), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
            }
        });
    } catch (e) {
        console.log("Error: Get enrolled courses API")
        throw e;
    }
}

export default getCoursesAPI;