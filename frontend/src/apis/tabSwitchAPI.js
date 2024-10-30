import axios from "axios";

const tabSwitchAPI = async () => {
    try {
        return await axios.patch("http://localhost:3000" + "/quiz/tab-switch", {
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