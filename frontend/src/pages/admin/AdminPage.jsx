import styles from "./adminPage.module.css"
import Stat from "../../components/admin/Stat";
import EditCourseCard from "../../components/admin/EditCourseCard";
import CustomButton from "../../components/common/CustomButton";

const AdminPage = () => {
    return <div className={styles.adminPage}>
        <h1 className={styles.statsText}>Stats</h1>
        <div className={styles.statsContainer}>
            <Stat label={"Certificates Obtained"} value={230}/>
            <Stat label={"Total students"} value={5443}/>
            <Stat label={"Certificates Obtained"} value={230}/>
            <Stat label={"Total students"} value={5443}/>
            <Stat label={"Certificates Obtained"} value={230}/>
            <Stat label={"Total students"} value={5443}/>
            <Stat label={"Certificates Obtained"} value={230}/>
            <Stat label={"Total students"} value={5443}/>
        </div>
        <div className={styles.CoursesTextAndAddCourseButtonContainer}>
            <h1 className={styles.coursesText}>Courses</h1>
            <button className={styles.addCourseButton}>+ Add course</button>
        </div>
        <div className={styles.editCourseCardGrid}>
            <EditCourseCard/>
            <EditCourseCard/>
            <EditCourseCard/>
            <EditCourseCard/>
            <EditCourseCard/>
        </div>
    </div>
}

export default AdminPage