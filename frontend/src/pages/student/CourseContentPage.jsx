import styles from "./courseContentPage.module.css"
import {useParams} from "react-router-dom";
import {courseContent} from "../../data/courseContent";
import courseCard from "../../components/student/CourseCard";

const CourseContentPage = () => {
    const params = useParams();
    const courseData = courseContent.filter(item => item.courseId === params.courseId)[0];
    const sectionNumber = params.sectionNumber;
    console.log(courseData)
    return <div className={styles.courseContentPage}>
        <div className={styles.header}>
            <h2 className={styles.sectionTitleText}>{courseData.sections[sectionNumber].name}</h2>
        </div>
        <div className={styles.contentContainer}>
            {courseData.content[sectionNumber].map(item => {
                for (let key in item) {
                    if (key === "heading1")
                        return <p className={styles.heading1}>{item[key]}</p>
                    else if (key === "heading2")
                        return <p className={styles.heading2}>{item[key]}</p>
                    else if (key === "paragraph")
                        return <p className={styles.paragraph}>{item[key]}</p>
                    else if (key === "bullet")
                        return <li className={styles.bullet}>{item[key]}</li>
                }
            })}
        </div>
    </div>
}

export default CourseContentPage;