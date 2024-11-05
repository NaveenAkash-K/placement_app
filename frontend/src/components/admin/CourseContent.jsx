import styles from "./courseContent.module.css"
import flutter_image from "../../assets/images/flutter_course.png";
import CourseSectionCard from "../student/CourseSectionCard";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {courseContent} from "../../data/courseContent";
import {useSelector} from "react-redux";

const CourseContent = () => {
    const params = useParams();
    // const {courseId} = params;
    const courseId = "CS101";
    const courseData = courseContent.filter(item => item.courseId === courseId)[0];
    const navigate = useNavigate();

    return <div className={styles.courseContent}>
        <div className={styles.imageAndDetailsContainer}>
            <div className={styles.imageAndDetailsStickyContainer}>
                <img src={flutter_image} className={styles.courseImg}/>
                <div className={styles.detailsContainer}>
                    <h1 className={styles.nameText}>{courseData.courseName}</h1>
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
        </div>
        <div className={styles.courseSectionsContainer}>
            <h2 className={styles.courseSectionContainerTitle}>Course Sections</h2>
            {
                courseData.sections.map((section, index) => {
                    if (section.type === "quiz")
                        return <CourseSectionCard completed={false}
                                                  allowed={true}
                                                  statusText={"Q"}
                                                  title={section.name}
                                                  desc={section.desc}
                                                  sectionNumber={index}
                                                  key={index}
                                                  onClick={() => {
                                                      toast("Only students can take quiz", {type: "warning"})
                                                  }}
                        />
                    else
                        return <CourseSectionCard completed={false}
                                                  allowed={true}
                                                  statusText={index + 1}
                                                  title={section.name}
                                                  desc={section.desc}
                                                  sectionNumber={index}
                                                  onClick={() => {
                                                      navigate("./sections/" + index);
                                                  }}

                        />
                })

            }
        </div>
    </div>
}

export default CourseContent;