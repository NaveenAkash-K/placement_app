import React, {useEffect, useState} from "react";
import styles from "./sessionAnswersPage.module.css";
import {useParams} from "react-router-dom";
import getSessionAnswersAPI from "../../apis/admin/getSessionAnswersAPI";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";

const SessionAnswersPage = () => {
    const [sessionData, setSessionData] = useState(null);
    const params = useParams();
    const {sessionId} = params;

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSessionAnswersAPI(sessionId);
            setSessionData(response.data); // Assuming the API provides data in `response.data`
        };
        fetchData();
    }, [sessionId]);

    if (!sessionData) {
        return <div className={styles.loading}>Loading session details...</div>;
    }

    return (
        <div className={styles.sessionAnswersPage}>
            <h2 className={styles.title}>Session Details</h2>

            {/* Legend */}
            <div className={styles.legend}>
    <span className={`${styles.correctAndSelected} ${styles.legendItem}`}>
        <FaCheckCircle/> Correct & Selected
    </span>
                <span className={`${styles.correctNotSelected} ${styles.legendItem}`}>
        <FaCheckCircle/> Correct but Not Selected
    </span>
                <span className={`${styles.incorrectSelected} ${styles.legendItem}`}>
        <FaTimesCircle/> Incorrect & Selected
    </span>
                <span className={`${styles.unselectedOption} ${styles.legendItem}`}>Unselected Option</span>
            </div>


            {/* Session Summary */}
            <div className={styles.summaryContainer}>
                <h3 className={styles.sectionTitle}>Session Summary</h3>
                <div className={styles.summaryDetails}>
                    <div>
                        <p>Total Questions</p>
                        <span>{sessionData.result.totalQuestions}</span>
                    </div>
                    <div>
                        <p>Correct Answers</p>
                        <span>{sessionData.result.correctAnswers}</span>
                    </div>
                    <div>
                        <p>Score</p>
                        <span>{sessionData.result.scorePercentage}%</span>
                    </div>
                    <div>
                        <p>Status</p>
                        <span
                            className={
                                sessionData.result.hasPassed
                                    ? styles.statusPassed
                                    : styles.statusFailed
                            }
                        >
                            {sessionData.result.hasPassed ? "Passed" : "Failed"}
                        </span>
                    </div>
                    {/*<div>*/}
                    {/*    <p>Time Taken</p>*/}
                    {/*    <span>{Math.abs(sessionData.result.timeTaken)} seconds</span>*/}
                    {/*</div>*/}
                </div>
            </div>

            {/* Questions List */}
            <div className={styles.questionsContainer}>
                <h3 className={styles.sectionTitle}>Questions Overview</h3>
                {sessionData.questions.map((item, index) => (
                    <div key={item._id} className={styles.questionCard}>
                        <div className={styles.questionHeader}>
                            <h4>Q{index + 1}:</h4>
                            <p>{item.question.question}</p>
                        </div>
                        <div className={styles.optionsContainer}>
                            {item.question.options.map((option, i) => {
                                const isCorrect = item.question.answer.includes(option); // Correct option
                                const isSelected = item.userAnswer.includes(option); // User selected this option

                                return (
                                    <div
                                        key={i}
                                        className={`${styles.option} 
                    ${isCorrect && isSelected ? styles.correctAndSelected : ""}
                    ${isCorrect && !isSelected ? styles.correctNotSelected : ""}
                    ${!isCorrect && isSelected ? styles.incorrectSelected : ""}
                    ${!isCorrect && !isSelected ? styles.unselectedOption : ""}
                `}
                                    >
                                        {option}
                                        {isCorrect && <FaCheckCircle className={styles.correctIcon}/>}
                                        {isSelected && !isCorrect && <FaTimesCircle className={styles.incorrectIcon}/>}
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.answersContainer}>
                            <p>
                                <strong>Correct Answer:</strong>{" "}
                                <span>{item.question.answer.join(", ")}</span>
                            </p>
                            <p>
                                <strong>Your Answer:</strong>{" "}
                                <span
                                    className={
                                        item.isCorrect
                                            ? styles.correctText
                                            : styles.incorrectText
                                    }
                                >
                                    {item.userAnswer.join(", ") || "No Answer"}
                                </span>
                            </p>
                            <p>
                                <strong>Time Taken:</strong> {item.timeTaken} seconds
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionAnswersPage;
