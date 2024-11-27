import React, {useEffect, useState} from "react";
import styles from "./listOfSessionsPage.module.css";
import getListOfSessionsAPI from "../../apis/admin/getListOfSessionsAPI";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";

const ListOfSessionsPage = () => {
    const [sessions, setSessions] = useState([]);
    const params = useParams();
    const {courseId, studentId} = params;
    const navigate = useNavigate();
    useEffect(() => {
        const apiCalls = async () => {
            const response = await getListOfSessionsAPI(courseId);
            setSessions(response.data.map(data => {
                return {
                    ...data,
                    date: moment(data.startsAt).format("DD MMM YYYY"),
                    startTime: moment(data.startsAt).format("hh:mm A"),
                }
            }));
        }
        apiCalls();
    }, []);
    return (
        <div className={styles.listOfSessionsPage}>
            <h2 className={styles.title}>Session Overview</h2>
            <div className={styles.sessionsGrid}>
                {sessions.map((session) => (
                    <div key={session.sessionId}
                         className={styles.sessionCard}
                         onClick={() => {
                             navigate("/admin/course/" + courseId + "/" + studentId + "/session/" + session.sessionId + "/answers");
                         }}>
                        <div className={styles.cardHeader}>
                            <h3>Session ID</h3>
                            <p>{session.sessionId}</p>
                        </div>
                        <div className={styles.cardBody}>
                            <div className={styles.infoRow}>
                                <span>Section:</span>
                                <span>{session.sectionNo}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Tab Switches:</span>
                                <span className={styles.tabSwitchCount}>
                                    {session.tabSwitchCount}
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Total Questions:</span>
                                <span>{session.totalQuestion}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Correct Answers:</span>
                                <span>{session.correctAnswers}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Date:</span>
                                <span>{session.date}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Start Time:</span>
                                <span>{session.startTime}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Score:</span>
                                <span>{session.score}%</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span>Status:</span>
                                <span
                                    className={
                                        session.hasPassed
                                            ? styles.statusPassed
                                            : styles.statusFailed
                                    }
                                >
                                    {session.hasPassed ? "Passed" : "Failed"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListOfSessionsPage;
