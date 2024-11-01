import styles from "./coursePage.module.css"
import {useState} from "react";
import CourseStats from "../../components/admin/CourseStats";
import CourseContent from "../../components/admin/CourseContent";

const CoursePage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return <div className={styles.coursePage}>
        <div className={styles.headerAndTabContainer}>
            <h1 className={styles.headerCourseName}>Introduction to C Programming</h1>
            <div className={styles.tabContainer}>
                <div className={styles.tab} onClick={() => {
                    setSelectedTab(0)
                }}>
                    Stats
                </div>
                <div className={styles.verticalDivider}/>
                <div className={styles.tab} onClick={() => {
                    setSelectedTab(1)
                }}>
                    Content
                </div>
                <div style={selectedTab === 0 ? {left: 0} : {left: "50%"}}
                     className={styles.tabIndicatorContainer}>
                    <div className={styles.tabIndicator}/>
                </div>
            </div>
            {/*<hr/>*/}
            {selectedTab === 0 && <CourseStats/>}
            {selectedTab === 1 && <CourseContent/>}
        </div>
    </div>
}

export default CoursePage;