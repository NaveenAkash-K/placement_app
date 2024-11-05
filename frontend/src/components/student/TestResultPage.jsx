import styles from "./testResultPage.module.css";
import {IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline} from "react-icons/io";
import {useEffect, useLayoutEffect, useState} from "react";
import calculateResult from "../../apis/calculateResult";
import {useParams} from "react-router-dom";
import completeSectionAPI from "../../apis/completeSectionAPI";
import {courseContent} from "../../data/courseContent";

const TestResultPage = () => {
    const params = useParams();
    const {courseId, sectionNumber} = params;
    const [resultResponse, setResultResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const courseData = courseContent.filter(item => item.courseId === courseId)[0];
    const quizIsFinal = courseData.sections[sectionNumber - 1].isFinal;


    useEffect(() => {
        const callAPI = async () => {
            // const response = await calculateResult(courseId, sectionNumber)
            setIsLoading(true)
            const response = await calculateResult("CS101", 1)
            setResultResponse(response.data);
            setIsLoading(false);
            if (response.data.sessionResults[response.data.sessionResults.length - 1].hasPassed) {
                await completeSectionAPI(courseId, sectionNumber)
            }
        }
        callAPI();
    }, []);

    return (

        isLoading ? <div
                style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "90vh"}}>
                ...Loading
            </div> :
            <div
                className={`${styles.testResultPage} ${resultResponse.sessionResults[resultResponse.sessionResults.length - 1].hasPassed ? styles.passBackground : styles.failBackground}`}>
                <div className={styles.content}>
                    {resultResponse.sessionResults[resultResponse.sessionResults.length - 1].hasPassed ? (
                        <IoMdCheckmarkCircleOutline className={styles.passIcon} size={120}/>
                    ) : (
                        <IoMdCloseCircleOutline className={styles.failIcon} size={120}/>
                    )}
                    <div className={styles.textDiv}>
                        <p className={styles.courseTitleText}>{courseData.courseName}</p>
                        <p className={styles.congratsText}>
                            {resultResponse.sessionResults[resultResponse.sessionResults.length - 1].hasPassed ? `🎉 Congratulations, ${localStorage.getItem("username")}! 🎉` : `😞 Sorry, ${localStorage.getItem("username")}.`}
                        </p>
                        <p className={styles.successText}>
                            {resultResponse.sessionResults[resultResponse.sessionResults.length - 1].hasPassed ? "You have successfully passed the test." : "You did not pass the test this time."}
                        </p>
                    </div>
                    <br/>
                    <h2 className={`${styles.scoreText} ${resultResponse.sessionResults[resultResponse.sessionResults.length - 1].hasPassed ? styles.passScore : styles.failScore}`}>
                        {resultResponse.sessionResults[resultResponse.sessionResults.length - 1].hasPassed ? `Your Score: ${resultResponse.sessionResults[resultResponse.sessionResults.length - 1].correctAnswers}/${resultResponse.sessionResults[resultResponse.sessionResults.length - 1].totalQuestions}` : `Your Score: ${resultResponse.sessionResults[resultResponse.sessionResults.length - 1].correctAnswers}/${resultResponse.sessionResults[resultResponse.sessionResults.length - 1].totalQuestions}`}
                    </h2>
                    <p className={styles.encouragementText}>
                        {resultResponse.sessionResults[resultResponse.sessionResults.length - 1].hasPassed
                            ? "Keep up the great work and aim even higher in future tests!"
                            : "Don't worry! Study a bit more and give it another try.\n Please contact the admin for retest. You need atleast " + resultResponse.cutOff + " % to pass the test"}
                    </p>
                    {(resultResponse.sessionResults[resultResponse.sessionResults.length - 1].hasPassed && quizIsFinal) &&
                        <p className={styles.encouragementText}>Your certificate will be sent to your email
                            shortly.</p>}
                    <br/>
                    <div className={styles.attemptsContainer}>
                        <h2 className={styles.attemptsText}>Attempts</h2>
                        <table className={styles.table}>
                            <thead className={styles.tableHead}>
                            <tr className={styles.tableRow}>
                                <th className={styles.tableHead}>Status</th>
                                <th className={styles.tableHead}>Total</th>
                                <th className={styles.tableHead}>Correct</th>
                                <th className={styles.tableHead}>Wrong</th>
                                <th className={styles.tableHead}>Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultResponse.sessionResults.reverse().map(attempts => <tr className={styles.tableRow}>
                                <td className={styles.tableData}>{attempts.hasPassed ?
                                    <IoMdCheckmarkCircleOutline className={styles.passIcon} size={20}/> :
                                    <IoMdCloseCircleOutline className={styles.failIcon} size={20}/>}</td>
                                <td className={styles.tableData}>{attempts.totalQuestions}</td>
                                <td className={styles.tableData}>{attempts.correctAnswers}</td>
                                <td className={styles.tableData}>{attempts.totalQuestions - attempts.correctAnswers}</td>
                                <td className={styles.tableData}>{attempts.scorePercentage} %</td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

    );
};

export default TestResultPage;
