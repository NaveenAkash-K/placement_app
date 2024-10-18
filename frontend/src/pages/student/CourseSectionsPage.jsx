import styles from "./courseSectionsPage.module.css"
import flutter_image from "../../assets/images/flutter_course.png";
import CourseSectionCard from "../../components/student/CourseSectionCard";

const CourseSectionsPage = (props) => {
    return <div className={styles.courseSections}>
        <div className={styles.imageAndDetailsContainer}>
            <img src={flutter_image} className={styles.courseImg}/>
            <div className={styles.detailsContainer}>
                <h1 className={styles.nameText}>Flutter</h1>
                <h2>8 Sections</h2>
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
        <h2 className={styles.courseSectionContainerTitle}>Course Sections</h2>
        <div className={styles.courseSectionsContainer}>
            <CourseSectionCard statusText={"1"} title={"Section 1"}/>
            <CourseSectionCard statusText={"2"} title={"Section 2"}/>
            <CourseSectionCard statusText={"3"} title={"Section 3"}/>
            <CourseSectionCard statusText={"Q"} title={"Quiz"}/>
            <CourseSectionCard statusText={"4"} title={"Section 4"}/>
            <CourseSectionCard statusText={"5"} title={"Section 5"}/>
            <CourseSectionCard statusText={"6"} title={"Section 6"}/>
            <CourseSectionCard statusText={"Q"} title={"Quiz"}/>
            <CourseSectionCard statusText={"7"} title={"Section 4"}/>
            <CourseSectionCard statusText={"8"} title={"Section 5"}/>
            <CourseSectionCard statusText={"9"} title={"Section 6"}/>
            <CourseSectionCard statusText={"Q"} title={"Quiz"}/>
            <CourseSectionCard statusText={"10"} title={"Section 4"}/>
            <CourseSectionCard statusText={"11"} title={"Section 5"}/>
            <CourseSectionCard statusText={"12"} title={"Section 6"}/>
            <CourseSectionCard statusText={"Q"} title={"Final Quiz"}/>
        </div>
    </div>
}

export default CourseSectionsPage