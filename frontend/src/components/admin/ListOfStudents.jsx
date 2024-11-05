import styles from "./listOfStudents.module.css"
import {IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline} from "react-icons/io";
import {FiDownloadCloud} from "react-icons/fi";

const ListOfStudents = (props) => {
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
        <tr className={styles.tableRow}>
            <td className={styles.tableData}>4</td>
            <td className={styles.tableData}>{"Naveen Akash"}</td>
            <td className={styles.tableData}>{"INT"}</td>
            <td className={styles.tableData}>{2127210801066}</td>
            <td className={styles.tableData}>{"89"} %</td>
            {props.attempts && <td className={styles.tableData}>
                2
            </td>}
            {props.attempts && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.revokeButton}>
                    Allow Quiz Retake
                </button>
                <div className={styles.verticalDivider}/>

                <button className={styles.revokeButton}>
                    Revoke Course
                </button>
            </td>}
            {props.certificate && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.certificateButton}>
                    <FiDownloadCloud size={20}/>
                    <h3 style={{fontWeight:"bold"}}>Download</h3>
                </button>
            </td>}
        </tr>
        <tr className={styles.tableRow}>
            <td className={styles.tableData}>4</td>
            <td className={styles.tableData}>{"Naveen Akash"}</td>
            <td className={styles.tableData}>{"INT"}</td>
            <td className={styles.tableData}>{2127210801066}</td>
            <td className={styles.tableData}>{"89"} %</td>
            {props.attempts && <td className={styles.tableData}>
                2
            </td>}
            {props.attempts && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.revokeButton}>
                    Allow Quiz Retake
                </button>
                <div className={styles.verticalDivider}/>

                <button className={styles.revokeButton}>
                    Revoke Course
                </button>
            </td>}
            {props.certificate && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.certificateButton}>
                    <FiDownloadCloud size={20}/>
                    <h3 style={{fontWeight:"bold"}}>Download</h3>
                </button>
            </td>}
        </tr>
        <tr className={styles.tableRow}>
            <td className={styles.tableData}>4</td>
            <td className={styles.tableData}>{"Naveen Akash"}</td>
            <td className={styles.tableData}>{"INT"}</td>
            <td className={styles.tableData}>{2127210801066}</td>
            <td className={styles.tableData}>{"89"} %</td>
            {props.attempts && <td className={styles.tableData}>
                2
            </td>}
            {props.attempts && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.revokeButton}>
                    Allow Quiz Retake
                </button>
                <div className={styles.verticalDivider}/>

                <button className={styles.revokeButton}>
                    Revoke Course
                </button>
            </td>}
            {props.certificate && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.certificateButton}>
                    <FiDownloadCloud size={20}/>
                    <h3 style={{fontWeight:"bold"}}>Download</h3>
                </button>
            </td>}
        </tr>
        <tr className={styles.tableRow}>
            <td className={styles.tableData}>4</td>
            <td className={styles.tableData}>{"Naveen Akash"}</td>
            <td className={styles.tableData}>{"INT"}</td>
            <td className={styles.tableData}>{2127210801066}</td>
            <td className={styles.tableData}>{"89"} %</td>
            {props.attempts && <td className={styles.tableData}>
                2
            </td>}
            {props.attempts && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.revokeButton}>
                    Allow Quiz Retake
                </button>
                <div className={styles.verticalDivider}/>

                <button className={styles.revokeButton}>
                    Revoke Course
                </button>
            </td>}
            {props.certificate && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.certificateButton}>
                    <FiDownloadCloud size={20}/>
                    <h3 style={{fontWeight:"bold"}}>Download</h3>
                </button>
            </td>}
        </tr>
        <tr className={styles.tableRow}>
            <td className={styles.tableData}>4</td>
            <td className={styles.tableData}>{"Naveen Akash"}</td>
            <td className={styles.tableData}>{"INT"}</td>
            <td className={styles.tableData}>{2127210801066}</td>
            <td className={styles.tableData}>{"89"} %</td>
            {props.attempts && <td className={styles.tableData}>
                2
            </td>}
            {props.attempts && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.revokeButton}>
                    Allow Quiz Retake
                </button>
                <div className={styles.verticalDivider}/>

                <button className={styles.revokeButton}>
                    Revoke Course
                </button>
            </td>}
            {props.certificate && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.certificateButton}>
                    <FiDownloadCloud size={20}/>
                    <h3 style={{fontWeight:"bold"}}>Download</h3>
                </button>
            </td>}
        </tr>
        <tr className={styles.tableRow}>
            <td className={styles.tableData}>4</td>
            <td className={styles.tableData}>{"Naveen Akash"}</td>
            <td className={styles.tableData}>{"INT"}</td>
            <td className={styles.tableData}>{2127210801066}</td>
            <td className={styles.tableData}>{"89"} %</td>
            {props.attempts && <td className={styles.tableData}>
                2
            </td>}
            {props.attempts && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.revokeButton}>
                    Allow Quiz Retake
                </button>
                <div className={styles.verticalDivider}/>

                <button className={styles.revokeButton}>
                    Revoke Course
                </button>
            </td>}
            {props.certificate && <td className={`${styles.tableData} ${styles.revokeButtonContainer}`}>
                <div className={styles.verticalDivider}/>
                <button className={styles.certificateButton}>
                    <FiDownloadCloud size={20}/>
                    <h3 style={{fontWeight:"bold"}}>Download</h3>
                </button>
            </td>}
        </tr>
        </tbody>
    </table>
}

export default ListOfStudents;