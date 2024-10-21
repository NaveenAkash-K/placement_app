import styles from "./courseContentPage.module.css"
import {flutterCourse} from "../../data/flutter"
import {useParams} from "react-router-dom";


const CourseContentPage = () => {
    const params = useParams();
    const courseData = flutterCourse[params.sectionNumber-1];
    console.log(courseData)
    return <div className={styles.courseContentPage}>
        <div className={styles.header}>
            <h2 className={styles.sectionTitleText}>Section Title Text</h2>
        </div>
        <div className={styles.contentContainer}>
            {courseData.map(item => {
                for (let key in item) {
                    if (key === "heading1")
                        return <p className={styles.heading1}>{item[key]}</p>
                    if (key === "heading2")
                        return <p className={styles.heading2}>{item[key]}</p>
                    if (key === "paragraph")
                        return <p className={styles.paragraph}>{item[key]}</p>
                    if (key === "bullet")
                        return <li className={styles.bullet}>{item[key]}</li>
                }
            })}
        </div>
    </div>
}

export default CourseContentPage;