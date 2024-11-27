import styles from "./editCourseCard.module.css"
import flutter_image from "../../assets/images/flutter_course.png";
import {useNavigate} from "react-router-dom";

const EditCourseCard = (props) => {
    const navigate = useNavigate()
    return <div className={styles.courseCard} onClick={() => {
        navigate("/admin/course/"+props.course.courseId)
    }}>
        <img src={flutter_image} width="100%" className={styles.courseImg}/>
        <div className={styles.courseDetailsContainer}>
            <h3 className={styles.courseTitleText}>{props.course.courseName}</h3>
            <h4>{props.course.sections.length} Sections</h4>
        </div>
    </div>
}

export default EditCourseCard