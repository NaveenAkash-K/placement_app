import styles from "./studentPage.module.css"
import CourseCard from "../../components/student/CourseCard";
import Nav from "../../components/common/Nav";
import CourseDetailsOverlay from "../../components/student/CourseDetailsOverlay";
import {useEffect, useLayoutEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateCourses} from "../../store/coursesSlice";
import getCoursesAPI from "../../apis/getCoursesAPI";
import {courseContent} from "../../data/courseContent";

const StudentPage = () => {
    const navigate = useNavigate()
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const registeredCourses = useSelector(state => state.courses.registeredCourses)
    const unregisteredCourses = useSelector(state => state.courses.unregisteredCourses)

    useEffect(() => {
        if (localStorage.getItem("role") === "admin"){
            navigate("/admin/home")
            return;
        }
    }, []);

    useEffect(() => {

        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const response = await getCoursesAPI();
                dispatch(updateCourses(response.data));
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [navigate, dispatch]);

    return isLoading ? <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        overflow: "none"
    }}>
        <p>Loading...</p>
    </div> : <div className={styles.studentPage}>
        {/*<CourseDetailsOverlay/>*/}
        <h2 className={styles.coursesText}>Continue learning</h2>
        <div className={styles.courseGrid}>
            {registeredCourses.map(course => {
                const courseData = courseContent.filter(item => item.courseId === course.course.courseId)[0];
                return <CourseCard courseName={course.course.courseName}
                                   key={course.course.courseId}
                                   courseId={course.course.courseId}
                                   completePercent={(course.completedSections.length / courseData.sections.length) * 100}
                                   sections={courseData.sections.length}/>
            })}
        </div>
        <h2 className={styles.coursesText}>Courses</h2>
        <div className={styles.courseGrid}>
            {unregisteredCourses.map(course => {
                const courseData = courseContent.filter(item => item.courseId === course.courseId)[0];
                return <CourseCard courseName={course.courseName}
                                   key={course.courseId}
                                   courseId={course.courseId}
                                   sections={courseData.sections.length}
                                   newCourse={true}/>
            })}
        </div>
    </div>
}

export default StudentPage