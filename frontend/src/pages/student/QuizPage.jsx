import styles from "./quizPage.module.css";
const QuizPage = () => {
    return( <div className={styles.quizPage}>
        <div className={styles.questionNoContainer}>
        <p className={styles.currentQuestion}>01</p>
        <p className={styles.totalQuestions}>/15</p>
        <div className={styles.timer}>
            <p className={styles.time}>01:30</p>
        </div>
        </div>
        <h3 className={styles.question}>Question</h3>
        <br></br>
        <p className={styles.choose}>Choose the best answer</p>
        <div className={styles.options}> 
            <div className={styles.option}><input type="radio" value="Male" name="gender" /> <p className={styles.optionText}>option 1</p> </div>
            <div className={`${styles.option} ${styles.option_active}`}> <input type="radio" value="Female" name="gender"  /> <p className={styles.optionText}>option 2</p></div>
            <div className={styles.option}><input type="radio" value="Other" name="gender" /> <p className={styles.optionText}>option 3</p> </div>
            <div className={styles.option}><input type="radio" value="Other" name="gender" /> <p className={styles.optionText}>option 4</p> </div>
        </div>
        <button className={styles.nextButton}>Next</button>
    </div>
    );
}

export default QuizPage;