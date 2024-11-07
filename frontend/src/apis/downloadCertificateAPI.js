import axios from "axios";

const downloadCertificateAPI = async () => {
    try {
        return await axios.post(process.env.REACT_APP_BACKEND_URI + "/course/", {
            userId: "671598ea1aa659de63af9c64",
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        });
    } catch (e) {
        console.log("Error: Download Certificate API")
        throw e;
    }
}

export default downloadCertificateAPI;