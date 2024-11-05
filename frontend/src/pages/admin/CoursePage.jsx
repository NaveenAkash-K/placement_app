import styles from "./coursePage.module.css"
import {useState} from "react";
import CourseContent from "../../components/admin/CourseContent";
import ListOfStudents from "../../components/admin/ListOfStudents";

const CoursePage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return <div className={styles.coursePage}>
        <div className={styles.headerAndTabContainer}>
            <h1 className={styles.headerCourseName}>Introduction to C Programming</h1>
            <div className={styles.tabContainer}>
                <div className={styles.tab} onClick={() => {
                    setSelectedTab(0)
                }}>
                    Enrolled Students
                </div>
                <div className={styles.verticalDivider}/>
                <div className={styles.tab} onClick={() => {
                    setSelectedTab(1)
                }}>
                    Certificates Obtained
                </div>
                <div className={styles.verticalDivider}/>
                <div className={styles.tab} onClick={() => {
                    setSelectedTab(2)
                }}>
                    Attempt Requests
                </div>
                <div className={styles.verticalDivider}/>
                <div className={styles.tab} onClick={() => {
                    setSelectedTab(3)
                }}>
                    Content
                </div>
                <div style={{left: (selectedTab*25) + "%"}}
                     className={styles.tabIndicatorContainer}>
                    <div className={styles.tabIndicator}/>
                </div>
            </div>
            {/*<hr/>*/}
            {selectedTab === 0 && <ListOfStudents/>}
            {selectedTab === 1 && <ListOfStudents certificate={true}/>}
            {selectedTab === 2 && <ListOfStudents attempts={true}/>}
            {selectedTab === 3 && <CourseContent/>}
        </div>
    </div>
}

export default CoursePage;