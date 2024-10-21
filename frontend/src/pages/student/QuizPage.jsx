import styles from "./quizPage.module.css";
import {useState} from "react";
import {FaRegClock} from "react-icons/fa6";

const QuizPage = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (<div className={styles.quizPage}>
            <div className={styles.questionSelectorContainer}>
                <div className={styles.questionSelector}>01</div>
                <div className={styles.questionSelector}>02</div>
                <div className={styles.questionSelector}>03</div>
                <div className={styles.questionSelector}>04</div>
                <div className={styles.questionSelector}>05</div>
                <div className={styles.questionSelector}>06</div>
                <div className={styles.questionSelector}>07</div>
                <div className={styles.questionSelector}>08</div>
                <div className={styles.questionSelector}>09</div>
                <div className={styles.questionSelector}>10</div>
                <div className={styles.questionSelector}>11</div>
                <div className={styles.questionSelector}>12</div>
                <div className={styles.questionSelector}>13</div>
                <div className={styles.questionSelector}>14</div>
            </div>
            <div className={styles.pageContent}>
                <div className={styles.questionNoContainer}>
                    <p className={styles.currentQuestion}>01</p>
                    <p className={styles.totalQuestions}>/15</p>
                    <div className={styles.timer}>
                        <FaRegClock/>
                        <p className={styles.time}>01:30</p>
                    </div>
                </div>
                <h3 className={styles.question}>Question</h3>
                <br></br>
                <p className={styles.choose}>Choose the best answer</p>
                <div className={styles.options}>
                    <div className={`${styles.option} ${selectedOption === 1 ? styles.option_active : null}`}
                         onClick={() => setSelectedOption(1)}>
                        <input type="radio" value="Male" name="gender" checked={selectedOption === 1}/>
                        <p className={styles.optionText}>option 1</p>
                    </div>
                    <div className={`${styles.option} ${selectedOption === 2 ? styles.option_active : null}`}
                         onClick={() => setSelectedOption(2)}>
                        <input type="radio" value="Female" name="gender" checked={selectedOption === 2}/>
                        <p className={styles.optionText}>option 2</p>
                    </div>
                    <div className={`${styles.option} ${selectedOption === 3 ? styles.option_active : null}`}
                         onClick={() => setSelectedOption(3)}>
                        <input type="radio" value="Other" name="gender" checked={selectedOption === 3}/>
                        <p className={styles.optionText}>option 3</p>
                    </div>
                    <div className={`${styles.option} ${selectedOption === 4 ? styles.option_active : null}`}
                         onClick={() => setSelectedOption(4)}>
                        <input type="radio" value="Other" name="gender" checked={selectedOption === 4}/>
                        <p className={styles.optionText}>option 4</p>
                    </div>
                </div>
                <button className={styles.nextButton}>Save & Next</button>
            </div>
        </div>
    );
}

export default QuizPage;