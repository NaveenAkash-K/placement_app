import styles from "./courseContentPage.module.css"
import {useLocation, useParams} from "react-router-dom";
import {courseContent} from "../../data/courseContent";
import courseCard from "../../components/student/CourseCard";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import completeSectionAPI from "../../apis/completeSectionAPI";

const CourseContentPage = () => {
    const params = useParams();
    const {sectionNumber} = params;
    const courseId = params.courseId.toUpperCase();
    const courseData = courseContent.filter(item => item.courseId === courseId)[0];
    const bottomReachedRef = useRef(false);
    const completedSections = useSelector(state => state.courses.registeredCourses).filter(item => item.course.courseId === courseId)[0].completedSections;

    useEffect(() => {
        if (localStorage.getItem("role") === "student") {
            const handleScroll = async () => {
                const bottom =
                    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
                if (bottom && !completedSections[sectionNumber] && !bottomReachedRef.current) {
                    bottomReachedRef.current = true;
                    await completeSectionAPI(courseId, sectionNumber)
                }
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return <div className={styles.courseContentPage}>
        <div className={styles.header}>
            <h2 className={styles.sectionTitleText}>{courseData.sections[sectionNumber].name}</h2>
        </div>
        <div className={styles.contentContainer}>
            {courseData.content[sectionNumber].map((item, index) => {
                for (let key in item) {
                    if (key === "heading1")
                        return <p key={index} className={styles.heading1}>{item[key]}</p>
                    else if (key === "heading2")
                        return <p key={index} className={styles.heading2}>{item[key]}</p>
                    else if (key === "paragraph")
                        return <p key={index} className={styles.paragraph}>{item[key]}</p>
                    else if (key === "bullet")
                        return <li key={index} className={styles.bullet}>{item[key]}</li>
                }
            })}
        </div>
    </div>
}

export default CourseContentPage;