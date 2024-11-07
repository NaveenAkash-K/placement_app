import axios from "axios";

const verifyForgetPasswordTokenAPI = async (token) => {
    try {
        return await axios.get(process.env.REACT_APP_BACKEND_URI + "/auth/reset-password/" + token)
    } catch (e) {
        console.log("Error: Verify Forget Password Token API")
        throw e;
    }
}


export default verifyForgetPasswordTokenAPI;