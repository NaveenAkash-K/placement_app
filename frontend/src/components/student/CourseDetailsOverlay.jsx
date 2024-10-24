import styles from "./courseDetailsOverlay.module.css"
import flutter_image from "../../assets/images/flutter_course.png"
import {courseContent} from "../../data/courseContent";
import {useState} from "react";
import registerCourseAPI from "../../apis/registerCourseAPI";
import getCoursesAPI from "../../apis/getCoursesAPI";
import {useDispatch} from "react-redux";
import {updateCourses} from "../../store/CoursesSlice";
import {toast} from "react-toastify";

const CourseDetailsOverlay = (props) => {
    const courseData = courseContent.filter(item => item.courseId === props.courseId)[0];
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    return <div className={styles.backdrop}>
        <div className={styles.courseDetails}>
            <div className={styles.imageAndDetailsContainer}>
                <img src={flutter_image} className={styles.courseImg}/>
                <div className={styles.detailsContainer}>
                    <h1 className={styles.nameText}>{courseData.name}</h1>
                    <h2>{courseData.sections.length} Sections</h2>
                    <p className={styles.aboutText}>Become a Full-Stack Web Developer with just ONE course. HTML, CSS,
                        Javascript, Node, React, PostgreSQL, Web3 and DApps Bestseller</p>
                    <div className={styles.contentsAndRequirementsContainer}>
                        <div className={styles.contentsContainer}>
                            <h3 className={styles.contentsTitleText}>Contents</h3>
                            <li>Introduction</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                        </div>
                        <div className={styles.requirementsContainer}>
                            <h3 className={styles.requirementsTitleText}>Requirements</h3>
                            <li>Basic Coding knowledge</li>
                            <li>OOPS</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.closeAndEnrollButtonContainer}>
                <button className={styles.closeButton} onClick={props.closeModal}>
                    Close
                </button>
                <button className={styles.enrollButton} onClick={isLoading ?
                    () => {
                    } :
                    async (event) => {
                        event.preventDefault();
                        try {
                            setIsLoading(true);
                            await registerCourseAPI(props.courseId);
                            const response = await getCoursesAPI();
                            dispatch(updateCourses(response.data));
                            toast("Course enrolled successfully", {type: "success"});
                            props.closeModal();
                        } catch (e) {
                            toast("Course enrollment failed", {type: "error"})
                        } finally {
                            setIsLoading(false);
                        }
                    }}>
                    {isLoading ? "Loading..." : "Enroll"}
                </button>
            </div>
        </div>
    </div>
}

export default CourseDetailsOverlay