import axios from "axios";

const tabSwitchAPI = async () => {
    try {
        return await axios.patch(process.env.REACT_APP_BACKEND_URI + "/quiz/tab-switch", {
                sessionId: localStorage.getItem("sessionId"),
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            })
    } catch (e) {
        console.log("ERROR: Tab switch API")
        throw e;
    }
}

export default tabSwitchAPI;