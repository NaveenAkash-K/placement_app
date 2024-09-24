import styles from "./courseDetailsOverlay.module.css"
import flutter_image from "../../assets/images/flutter_course.png"

const CourseDetailsOverlay = () => {
    return <div className={styles.backdrop}>
        <div className={styles.courseDetails}>
            <div className={styles.imageAndDetailsContainer}>
                <img src={flutter_image} className={styles.courseImg}/>
                <div className={styles.detailsContainer}>
                    <h1 className={styles.nameText}>Flutter</h1>
                    <h2>8 Sections</h2>
                    <p className={styles.aboutText}>Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps Bestseller</p>
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
                        <button className={styles.closeButton}>Close</button>
                        <button className={styles.enrollButton}>Enroll</button>
                    </div>
        </div>
    </div>
}

export default CourseDetailsOverlay