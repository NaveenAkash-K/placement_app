import axios from "axios";

const getCertificatesObtained = async (courseId) => {
    try {
        return await axios.get(process.env.REACT_APP_BACKEND_URI + "/admin/certificates-obtained/" + courseId,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Send JWT as Bearer token
                }
            })
    } catch (e) {
        console.log("ERROR: Get certificates obtained API")
        throw e;
    }
}

export default getCertificatesObtained;