import axios from "axios";

const downloadCertificateAPI = async () => {
    try {
        return await axios.post("http://localhost:3000/course/", {
            userId: localStorage.getItem("userId"),
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