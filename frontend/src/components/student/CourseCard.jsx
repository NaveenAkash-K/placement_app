import styles from "./courseCard.module.css";
import flutter_image from "../../assets/images/flutter_course.png"
import CourseDetailsOverlay from "./CourseDetailsOverlay";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const CourseCard = (props) => {
    const [isCourseDetailModalVisible, setIsCourseDetailModalVisible] = useState(false);
    const navigate = useNavigate();

    return <>
        {isCourseDetailModalVisible && (
            <CourseDetailsOverlay
                courseId={props.courseId}
                closeModal={() => {
                    setIsCourseDetailModalVisible(false);
                }}
            />
        )}
        <div className={styles.courseCard}
             onClick={props.newCourse ?
                 () => setIsCourseDetailModalVisible(true) :
                 () => navigate("/student/course/" + props.courseId + "/sections")}>
            <img src={flutter_image} width="100%" className={styles.courseImg}/>
            <div className={styles.courseDetailsContainer}>
                <h3 className={styles.courseTitleText}>{props.courseName}</h3>
                <h5>{props.sections} Sections</h5>
                {props.newCourse === true ?
                    null :
                    <div className={styles.progressBarContainer}>
                        <h4 className={styles.progressPercentText}>{props.completePercent}%</h4>
                        <div className={styles.progressBarBackground}>
                            <div className={styles.progressBarFill} style={{width: props.completePercent + "%"}}/>
                        </div>
                    </div>}
            </div>
        </div>
    </>

}

export default CourseCard;