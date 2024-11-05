import styles from "./adminPage.module.css"
import Stat from "../../components/admin/Stat";
import EditCourseCard from "../../components/admin/EditCourseCard";
// import {PieChart} from "@mui/x-charts/PieChart"
import {useEffect, useLayoutEffect} from "react";
import {useNavigate} from "react-router-dom";


const AdminPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("role") === "student") {
            navigate("/student/home")
            return;
        }
    }, []);

    return <div className={styles.adminPage}>
        <h1 className={styles.statsText}>Stats</h1>
        <div className={styles.statsContainer}>
            <div className={styles.textStatsContainer}>
                <h3 className={styles.textStatTitle}>Total Students</h3>
                <h2 className={styles.textStatValue}>2640</h2>
                <br/>
                <h3 className={styles.textStatTitle}>Total Courses</h3>
                <h2 className={styles.textStatValue}>10</h2>
                <br/>
                <h3 className={styles.textStatTitle}>Certificates Obtained</h3>
                <h2 className={styles.textStatValue}>2640</h2>
            </div>
            <div className={styles.chartsContainer}>
                <div className={styles.chartContainer}>
                    <h3 className={styles.chartTitle}>Certificated obtained by department</h3>
                    {/*<PieChart*/}
                    {/*    onItemClick={(click) => {*/}
                    {/*        console.log(click)*/}
                    {/*    }}*/}
                    {/*    series={[*/}
                    {/*        {*/}
                    {/*            data: [*/}
                    {/*                {id: 0, value: 10, label: 'EEE'},*/}
                    {/*                {id: 1, value: 15, label: 'AIDS'},*/}
                    {/*                {id: 2, value: 20, label: 'INT'},*/}
                    {/*                {id: 3, value: 10, label: 'ECE'},*/}
                    {/*                {id: 4, value: 15, label: 'CSE'},*/}
                    {/*                {id: 5, value: 20, label: 'MECH'},*/}
                    {/*            ],*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*    width={400}*/}
                    {/*    height={200}*/}
                    {/*/>*/}
                </div>
                <div className={styles.chartContainer}>
                    <h3 className={styles.chartTitle}>Popular courses</h3>
                    {/*<PieChart*/}
                    {/*    series={[*/}
                    {/*        {*/}
                    {/*            data: [*/}
                    {/*                {id: 0, value: 10, label: 'C Programming'},*/}
                    {/*                {id: 1, value: 15, label: 'Java Programming'},*/}
                    {/*                {id: 2, value: 20, label: 'Data Structures & Algorithms'},*/}
                    {/*            ],*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*    width={700}*/}
                    {/*    height={200}*/}
                    {/*/>*/}
                </div>
            </div>
        </div>
        <div className={styles.CoursesTextAndAddCourseButtonContainer}>
            <h1 className={styles.coursesText}>Courses</h1>
        </div>
        <div className={styles.editCourseCardGrid}>
            <EditCourseCard/>
            <EditCourseCard/>
            <EditCourseCard/>
            <EditCourseCard/>
            <EditCourseCard/>
        </div>
    </div>
}

export default AdminPage