import styles from "./studentPage.module.css"
import CourseCard from "../../components/student/CourseCard";
import Nav from "../../components/common/Nav";
import CourseDetailsOverlay from "../../components/student/CourseDetailsOverlay";

const StudentPage = () => {
    return <div className={styles.studentPage}>
         {/*<CourseDetailsOverlay/>*/}
        <h2 className={styles.coursesText}>Continue learning</h2>
        <div className={styles.courseGrid}>
            <CourseCard/>
            <CourseCard/>
        </div>
        <h2 className={styles.coursesText}>Courses</h2>
        <div className={styles.courseGrid}>
            <CourseCard newCourse={true}/>
            <CourseCard newCourse={true}/>
            <CourseCard newCourse={true}/>
            <CourseCard newCourse={true}/>
        </div>
    </div>
}

export default StudentPage