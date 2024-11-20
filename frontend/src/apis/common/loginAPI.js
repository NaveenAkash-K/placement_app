import axios from "axios";

const loginAPI = async (email, password) => {
    try {
        return await axios.post(process.env.REACT_APP_BACKEND_URI + "/auth/login", {
            email,
            password
        })
    } catch (e) {
        console.log("Error: login API")
        throw e;
    }
}


export default loginAPI;