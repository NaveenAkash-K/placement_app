import axios from "axios";

const checkAuthAPI = async () => {
    try {
        return await axios.post("http://localhost:3000" + "/checkAuth", {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        });
    } catch (e) {
        console.log("Error: Check auth error")
        console.log(`Bearer ${localStorage.getItem("jwtToken")}`)
        throw e;
    }
}

export default checkAuthAPI;