import styles from "./testResultPage.module.css";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

const TestResultPage = ({ studentName = "Student", courseTitle = "Introduction to C Programming", score = "7/10", passed = false }) => {
    return (
        <div className={`${styles.testResultPage} ${passed ? styles.passBackground : styles.failBackground}`}>
            <div className={`${styles.resultHeader} ${passed ? styles.passHeader : styles.failHeader}`}>
                {passed ? (
                    <IoMdCheckmarkCircleOutline className={styles.icon} size={120} />
                ) : (
                    <IoMdCloseCircleOutline className={styles.icon} size={120} />
                )}
                <div className={styles.textDiv}>
                    <p className={styles.courseTitleText}>{courseTitle}</p>
                    <p className={styles.congratsText}>
                        {passed ? `🎉 Congratulations, ${studentName}! 🎉` : `😞 Sorry, ${studentName}.`}
                    </p>
                    <p className={styles.successText}>
                        {passed ? "You have successfully passed the test." : "You did not pass the test this time."}
                    </p>
                </div>
            </div>
            <div className={styles.content}>
                <h2 className={`${styles.scoreText} ${passed ? styles.passScore : styles.failScore}`}>
                    {passed ? `Your Score: ${score}` : `Your Score: ${score}`}
                </h2>
                <p className={styles.encouragementText}>
                    {passed
                        ? "Keep up the great work and aim even higher in future tests!"
                        : "Don't worry! Study a bit more and give it another try.\n Please contact the admin for retest"}
                </p>
                {passed && <p className={styles.encouragementText}>Your certificate will be sent to your email shortly.</p>}
            </div>
        </div>
    );
};

export default TestResultPage;
