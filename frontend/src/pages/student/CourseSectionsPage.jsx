import styles from "./courseSectionsPage.module.css"
import flutter_image from "../../assets/images/flutter_course.png";
import CourseSectionCard from "../../components/student/CourseSectionCard";
import {courseContent} from "../../data/courseContent";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useEffect, useLayoutEffect, useState} from "react";
import {FiDownloadCloud} from "react-icons/fi";
import DownloadCertificateButton from "../../components/student/DownloadCertificateButton";

const CourseSectionsPage = (props) => {
    const params = useParams();
    const {courseId} = params;
    const courseData = courseContent.filter(item => item.courseId === courseId)[0];
    const registeredCourses = useSelector(state => state.courses.registeredCourses)
    const completedSections = registeredCourses.filter(item => item.course.courseId === params.courseId)[0].section.filter(item => item.isCompleted)
    const allowedSection = completedSections.length + 1;
    const navigate = useNavigate();

    return <div className={styles.courseSections}>
        <div className={styles.imageAndDetailsContainer}>
            <div className={styles.imageAndDetailsStickyContainer}>
                <img src={flutter_image} className={styles.courseImg}/>
                <div className={styles.detailsContainer}>
                    <h1 className={styles.nameText}>{courseData.courseName}</h1>
                    <div className={styles.sectionNumberAndCertificateContainer}>
                        <h2>{courseData.sections.length} Sections</h2>
                        { completedSections.filter(item => item).length === courseData.sections.length && <DownloadCertificateButton onClick={() => {
                        }}/>}
                    </div>
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
                        return <CourseSectionCard completed={completedSections[index]}
                                                  allowed={allowedSection > index}
                                                  statusText={"Q"}
                                                  title={section.name}
                                                  desc={section.desc}
                                                  sectionNumber={index}
                                                  key={index}
                                                  onClick={() => {
                                                      if(completedSections[index]) {
                                                          navigate("/student/course/" + courseId + "/" + (index) + "/quiz/result");
                                                          return;
                                                      }
                                                      if (!(allowedSection > index)) {
                                                          toast("Please complete the previous sections first", {type: "warning"})
                                                          return;
                                                      }
                                                      navigate("/student/course/" + courseId + "/" + (index) + "/quiz/instructions");
                                                  }}
                        />
                    else
                        return <CourseSectionCard completed={completedSections[index]}
                                                  allowed={allowedSection > index}
                                                  statusText={index + 1}
                                                  title={section.name}
                                                  desc={section.desc}
                                                  sectionNumber={index}
                                                  onClick={() => {
                                                      if (!(allowedSection > index)) {
                                                          toast("Please complete the previous sections first", {type: "warning"})
                                                          return;
                                                      }
                                                      navigate("./" + index);
                                                  }}

                        />
                })
            }
        </div>
    </div>
}

export default CourseSectionsPage