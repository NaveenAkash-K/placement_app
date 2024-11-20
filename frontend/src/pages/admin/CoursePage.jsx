import styles from "./coursePage.module.css"
import {useEffect, useState} from "react";
import CourseContent from "../../components/admin/CourseContent";
import ListOfStudents from "../../components/admin/ListOfStudents";
import {useParams} from "react-router-dom";
import getEnrolledStudentsAPI from "../../apis/admin/getEnrolledStudentsAPI";
import getCertificatesObtained from "../../apis/admin/getCertificatesObtained";
import getAttemptRequestsAPI from "../../apis/admin/getAttemptRequestsAPI";

const CoursePage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const {courseId} = params;
    const [enrolledStudentsData, setEnrolledStudentsData] = useState([])
    const [certificatesObtained, setCertificatesObtained] = useState([])
    const [attemptRequests, setAttemptRequests] = useState([])
    useEffect(() => {
        const callAPI = async () => {
            try {
                setIsLoading(true)
                let response;
                response = await getEnrolledStudentsAPI(courseId.toUpperCase())
                setEnrolledStudentsData(response.data.enrolledStudents);
                response = await getCertificatesObtained(courseId.toUpperCase())
                setCertificatesObtained(response.data);
                response = await getAttemptRequestsAPI(courseId.toUpperCase());
                setAttemptRequests(response.data)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }
        callAPI();
    }, []);

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
                <div style={{left: (selectedTab * 25) + "%"}}
                     className={styles.tabIndicatorContainer}>
                    <div className={styles.tabIndicator}/>
                </div>
            </div>
            {/*<hr/>*/}
            {selectedTab === 0 && <ListOfStudents data={enrolledStudentsData}/>}
            {selectedTab === 1 && <ListOfStudents data={certificatesObtained} certificate={true}/>}
            {selectedTab === 2 && <ListOfStudents removeItem={(itemId) => {
                setAttemptRequests(prev => prev.filter(item => item.id !== itemId))
            }} data={attemptRequests} attempts={true}/>}
            {selectedTab === 3 && <CourseContent/>}
        </div>
    </div>
}

export default CoursePage;