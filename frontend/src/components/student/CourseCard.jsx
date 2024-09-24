import styles from "./courseCard.module.css";
import flutter_image from "../../assets/images/flutter_course.png"

const CourseCard = (props) => {
    return <div className={styles.courseCard}>
        <img src={flutter_image} width="100%" className={styles.courseImg}/>
        <div className={styles.courseDetailsContainer}>
            <h2 className={styles.courseTitleText}>Flutter</h2>
            <h4>8 Modules</h4>
            {props.newCourse === true ? null : <div className={styles.progressBarContainer}>
                <h4 className={styles.progressPercentText}>60%</h4>
                <div className={styles.progressBarBackground}>
                    <div className={styles.progressBarFill}/>
                </div>
            </div>}
        </div>
    </div>
}

export default CourseCard;