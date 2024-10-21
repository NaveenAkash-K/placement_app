import axios from "axios";

const getCoursesAPI = async () => {
    try {
        return await axios.get("http://localhost:3000/course/" + localStorage.getItem("email"), {
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