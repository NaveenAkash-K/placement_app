import styles from "./editCourseCard.module.css"
import flutter_image from "../../assets/images/flutter_course.png";
import {useNavigate} from "react-router-dom";

const EditCourseCard = (props) => {
    const navigate = useNavigate()
    return <div className={styles.courseCard} onClick={() => {
        navigate("/admin/course/"+"CS101")
    }}>
        <img src={flutter_image} width="100%" className={styles.courseImg}/>
        <div className={styles.courseDetailsContainer}>
            <h2 className={styles.courseTitleText}>Flutter</h2>
            <h4>8 Modules</h4>
        </div>
    </div>
}

export default EditCourseCard