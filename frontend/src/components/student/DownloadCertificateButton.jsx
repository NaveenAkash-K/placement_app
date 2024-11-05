import styles from "./downloadCertificateButton.module.css";
import {FiDownloadCloud} from "react-icons/fi";

const DownloadCertificateButton= (props)=> {
    return <div className={styles.certificateButton} onClick={props.onClick}>
        <FiDownloadCloud size={24} color={"#214f9c"}/>
        <p className={styles.certificateButtonText}>Download Certificate</p>
    </div>
}

export default DownloadCertificateButton;