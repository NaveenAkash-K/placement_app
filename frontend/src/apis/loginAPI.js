import axios from "axios";

const loginAPI = async (email, password) => {
    try {
        return await axios.post("http://localhost:3000" + "/auth/login", {
            email,
            password
        })
    } catch (e) {
        console.log("Error: login API")
        throw e;
    }
}


export default loginAPI;