import styles from "./quizPage.module.css";
import {useEffect, useState} from "react";
import {FaRegClock} from "react-icons/fa6";

const QuizPage = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [timer, setTimer] = useState(5);
    const [questionNumber, setQuestionNumber] = useState(1);
    const watermarkText = "2021IT0668";

    useEffect(() => {
        // Inject the dynamic watermark content into a style tag
        const style = document.createElement("style");
        style.innerHTML = `
      .${styles.waterMark}:before {
        content: "${Array(500).fill(watermarkText).join(' ')}";
        position: absolute;
        top:-40rem;
        left:-40rem;
        font-size: 75px;
        color: rgba(0, 0, 0, 0.05); /* Light opacity */        
        transform: rotate(-20deg); /* Tilted text */
        display: block;
        width: 150%;
        height: 100%;
        text-align: center;
        z-index: -1;
      }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, [watermarkText]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
        if (timer === 0) {
            clearInterval(intervalId);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [timer]);

    useEffect(() => {
        const handleWindowFocus = () => {
            console.log("Focus regained");
        };

        const handleWindowBlur = () => {
            alert("Warning: Do not switch tabs or windows during the test!");
            console.log("Tab/Window switched");
        };

        const disableRightClick = (e) => e.preventDefault();
        const disableKeyShortcuts = (e) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'I' || e.key === 'S' || e.key === 'U')) {
                e.preventDefault();
            }

            if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'i')) {
                e.preventDefault();
            }

            if (e.key === 'F12') {
                e.preventDefault();
            }
        };

        window.addEventListener("blur", handleWindowBlur);
        window.addEventListener("focus", handleWindowFocus);
        window.addEventListener("contextmenu", disableRightClick);
        document.addEventListener("keydown", disableKeyShortcuts);

        return () => {
            window.removeEventListener("blur", handleWindowBlur);
            window.removeEventListener("focus", handleWindowFocus);
            window.removeEventListener("contextmenu", disableRightClick);
            document.removeEventListener("keydown", disableKeyShortcuts);
        };
    }, []);


    const formatTime = (timer) => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (<div className={styles.quizPage}>
            <div className={styles.waterMark}/>
            <div className={styles.questionSelectorContainer}>
                <p className={styles.questionSelectorTitle}>Questions</p>
                <div className={styles.questionsGrid}>
                    <div className={`${styles.questionSelector} ${styles.completed}`}>01</div>
                    <div className={`${styles.questionSelector} ${styles.completed}`}>02</div>
                    <div className={styles.questionSelector}>03</div>
                    <div className={styles.questionSelector}>04</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                    <div className={styles.questionSelector}>05</div>
                </div>
            </div>
            <div className={styles.pageContent}>
                <div className={styles.loadQuestionContainer}>
                    <p>Before you begin, take a moment to ensure you're focused and prepared.</p>
                    <br/>
                    <p> How It Works: Once you click "Load question" your first question will appear, and the timer will
                        begin automatically. Each question must be completed before you proceed to the next one. Stay
                        attentive, as each answer you provide is final for that question. Once you fixed your answer
                        click "Save & Next".</p>
                    <br/>
                    <p> Click "Load question" when you’re ready to begin—good luck!</p>
                    <button className={styles.loadQuestionButton}>Load Question</button>
                </div>
                <div className={styles.questionNoContainer}>
                    <p className={styles.currentQuestion}>{questionNumber}</p>
                    <p className={styles.totalQuestions}>/15</p>
                    <div className={styles.timer}>
                        <FaRegClock/>
                        <p className={styles.time}>{formatTime(timer)}</p>
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
    )
        ;
}

export default QuizPage;