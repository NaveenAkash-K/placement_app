import axios from "axios";

const forgetPasswordAPI = async (email) => {
    try {
        return await axios.post(process.env.REACT_APP_BACKEND_URI + "/auth/forgot-password", {
            email,
        })
    } catch (e) {
        console.log("Error: Forget password API")
        throw e;
    }
}


export default forgetPasswordAPI;