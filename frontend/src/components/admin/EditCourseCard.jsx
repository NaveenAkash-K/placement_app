import styles from "./editCourseCard.module.css"
import flutter_image from "../../assets/images/flutter_course.png";

const EditCourseCard = (props) => {
    return <div className={styles.courseCard}>
        <img src={flutter_image} width="100%" className={styles.courseImg}/>
        <div className={styles.courseDetailsContainer}>
            <h2 className={styles.courseTitleText}>Flutter</h2>
            <h4>8 Modules</h4>
        </div>
    </div>
}

export default EditCourseCard