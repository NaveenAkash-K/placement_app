import styles from "./listOfStudents.module.css"
import {IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline} from "react-icons/io";
import {FiDownloadCloud} from "react-icons/fi";
import {useEffect, useState} from "react";
import getEnrolledStudentsAPI from "../../apis/admin/getEnrolledStudentsAPI";
import {useParams} from "react-router-dom";
import allowReattemptAPI from "../../apis/admin/allowReattemptAPI";
import restartCourseAPI from "../../apis/admin/restartCourseAPI";
import downloadCertificateAPI from "../../apis/common/downloadCertificateAPI";

const ListOfStudents = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const {courseId} = params;

    const onAllowReattempt = () => {
        try {
            setIsLoading(true)
            const response = allowReattemptAPI(courseId)
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const onResetCourse = () => {
        try {
            setIsLoading(true)
            const response = restartCourseAPI(courseId);

        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const onDownloadCertificate = () => {
        try {
            setIsLoading(true)
            const response = downloadCertificateAPI(courseId);

        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    return <table className={styles.listOfStudentsTable}>
        <thead className={styles.tableHead}>
        <tr className={styles.tableRow}>
            <th className={styles.tableHead}>S.No</th>
            <th className={styles.tableHead}>Name</th>
            <th className={styles.tableHead}>Dept</th>
            <th className={styles.tableHead}>RegNo</th>
            <th className={styles.tableHead}>Progress</th>
            {props.attempts && <th className={styles.tableHead}>Attempts</th>}
            {props.attempts && <th className={styles.tableHead}>Request</th>}
            {props.certificate && <th className={styles.tableHead}>Certificate</th>}
        </tr>
        </thead>
        <tbody>
        {props.data.map((item, index) => <tr className={styles.tableRow}>
            <td className={styles.tableData}>{index + 1}</td>
            <td className={styles.tableData}>{item.name}</td>
            <td className={styles.tableData}>{"INT"}</td>
            <td className={styles.tableData}>{2127210801066}</td>
            <td className={styles.tableData}>{"89"} %</td>
            {props.attempts && <td className={styles.tableData}>
                2
            </td>}
            {props.attempts && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.revokeButton} onClick={onAllowReattempt}>
                    Allow Quiz Retake
                </button>
                <div className={styles.verticalDivider}/>

                <button className={styles.revokeButton} onClick={onResetCourse}>
                    Revoke Course
                </button>
            </td>}
            {props.certificate && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.certificateButton} onClick={onDownloadCertificate}>
                    <FiDownloadCloud size={20}/>
                    <h3 style={{fontWeight: "bold"}}>Download</h3>
                </button>
            </td>}
        </tr>)}
        </tbody>
    </table>
}

export default ListOfStudents;