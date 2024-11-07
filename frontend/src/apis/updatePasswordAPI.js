import axios from "axios";

const updatePasswordAPI = async (password, token) => {
    try {
        return await axios.post(process.env.REACT_APP_BACKEND_URI + "/auth/update-password",{
            password,
            token
        })
    } catch (e) {
        console.log("Error: Update Password Token API")
        throw e;
    }
}


export default updatePasswordAPI;