import styles from "./quizPage.module.css";
import {useEffect, useState} from "react";
import {FaRegClock} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {answerQuestion, completeQuestion, updateQuestion, updateSelectedQuestion} from "../../store/quizSlice";
import fetchQuestionAPI from "../../apis/fetchQuestionAPI";
import loginAPI from "../../apis/loginAPI";
import answerQuestionAPI from "../../apis/answerQuestionAPI";
import tabSwitchAPI from "../../apis/tabSwitchAPI";
import closeSessionAPI from "../../apis/closeSessionAPI";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const watermarkText = "2021IT0668";
    const selectedQuestion = useSelector(state => state.quiz.selectedQuestion);
    const quizQuestions = useSelector(state => state.quiz.questions);
    const questionData = quizQuestions[selectedQuestion];
    const [timer, setTimer] = useState(questionData.time);
    const dispatch = useDispatch();
    const [isTabSwitchOverlayVisible, setIsTabSwitchOverlayVisible] = useState(false);
    const navigate = useNavigate();
    let intervalId;

    useEffect(() => {
        setTimer(questionData.time);
    }, [selectedQuestion]);

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
        clearInterval(intervalId);
        // startTimer();
    }, []);

    useEffect(() => {
        const handleWindowFocus = () => {
            console.log("Focus regained");
        };

        const handleWindowBlur = async () => {
            // alert("Warning: Do not switch tabs or windows during the test!");
            await tabSwitchAPI();
            setIsTabSwitchOverlayVisible(true);
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

        const handleBackButton = (event) => {
            event.preventDefault();
            navigate(".", { replace: true }); // Stay on the current page
            setIsTabSwitchOverlayVisible(true); // Show warning overlay
            console.log("Back navigation attempt prevented");
        };

        window.addEventListener("blur", handleWindowBlur);
        window.addEventListener("focus", handleWindowFocus);
        window.addEventListener("contextmenu", disableRightClick);
        document.addEventListener("keydown", disableKeyShortcuts);
        window.addEventListener("popstate", handleBackButton); // Listen for back button actions

        // Push initial state to the history stack to start tracking back navigation
        navigate(".", { replace: true });

        return () => {
            window.removeEventListener("blur", handleWindowBlur);
            window.removeEventListener("focus", handleWindowFocus);
            window.removeEventListener("contextmenu", disableRightClick);
            document.removeEventListener("keydown", disableKeyShortcuts);
            window.removeEventListener("popstate", handleBackButton);
        };
    }, []);

    const startTimer = () => {
        intervalId = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
        if (timer === 0) {
            clearInterval(intervalId);
        }
    }

    const formatTime = (timer) => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const loadQuestion = async () => {
        const response = await fetchQuestionAPI(questionData.questionId);
        dispatch(updateQuestion(response.data.question))
        startTimer();
    }

    const onSaveButton = async () => {
        clearInterval(intervalId);
        await answerQuestionAPI(questionData.questionId, questionData.selectedAnswers);
        dispatch(completeQuestion({questionId: questionData.questionId}))
        if (selectedQuestion + 1 < quizQuestions.length) {
            dispatch(updateSelectedQuestion(selectedQuestion + 1))
        } else {
            await closeSessionAPI();
        }
    }

    console.log(questionData)

    return (<div className={styles.quizPage}>
            {isTabSwitchOverlayVisible && <div className={styles.tabSwitchBackdrop}>
                <div className={styles.tabSwitchContent}>
                    <h2 className={styles.tabSwitchTitle}>Tab Switch Detected</h2>
                    <p className={styles.tabSwitchMessage}>
                        It looks like you've switched tabs. For a secure test environment, please stay on this tab.
                    </p>
                    <p className={styles.tabSwitchMessage}>
                        This incident has been reported. Repeated tab switches leads to termination of test
                    </p>
                    <button className={styles.tabSwitchButton} onClick={() => setIsTabSwitchOverlayVisible(false)}>
                        Return to Test
                    </button>
                </div>
            </div>}
            <div className={styles.waterMark}/>
            <div className={styles.questionSelectorContainer}>
                <p className={styles.questionSelectorTitle}>Questions</p>
                <div className={styles.questionsGrid}>
                    {quizQuestions.map((question, index) => {
                        console.log(question)
                        return (
                            <div
                                onClick={() => dispatch(updateSelectedQuestion(index))}
                                className={`${styles.questionSelector} 
                                    ${question.isCompleted
                                    ? styles.completed
                                    : question.isAttended
                                        ? styles.attended
                                        : ""} 
                                        ${selectedQuestion === index
                                    ? styles.questionSelector_active : ""}`}>
                                {index + 1}
                            </div>
                        );

                    })}
                </div>
            </div>
            <div className={styles.pageContent}>
                <div className={styles.questionNoContainer}>
                    <p className={styles.currentQuestion}>{selectedQuestion + 1}</p>
                    <p className={styles.totalQuestions}>/{quizQuestions.length}</p>
                    <div className={styles.timer}>
                        <FaRegClock/>
                        <p className={styles.time}>{formatTime(timer)}</p>
                    </div>
                </div>
                {!questionData.isFetched ? <div className={styles.loadQuestionContainer}>
                        <p>Before you begin, take a moment to ensure you're focused and prepared.</p>
                        <br/>
                        <p> How It Works: Once you click "Load question" your first question will appear, and the timer will
                            begin automatically. Each question must be completed before you proceed to the next one. Stay
                            attentive, as each answer you provide is final for that question. Once you fixed your answer
                            click "Save & Next".</p>
                        <br/>
                        <p> Click "Load question" when you’re ready to begin—good luck!</p>
                        <button className={styles.loadQuestionButton}
                                onClick={async () => {
                                    await loadQuestion()
                                }}>
                            Load Question
                        </button>
                    </div> :
                    <div>
                        <h3 className={styles.question}>{questionData.questionText}
                        </h3>
                        <br></br>
                        <p className={styles.choose}>Choose the best answer</p>
                        <div className={styles.options}>
                            {questionData.options.map((option, index) => <div
                                className={`${styles.option} ${selectedOption === index ? styles.option_active : null}`}
                                onClick={() => {
                                    dispatch(answerQuestion({questionId: questionData.questionId, answer: option}))
                                }}>
                                <input type="radio" value={option} name="answer"
                                       checked={questionData.selectedAnswers.includes(option)}/>
                                <p className={styles.optionText}>{option}</p>
                            </div>)}
                        </div>
                        <button className={styles.nextButton}
                                onClick={onSaveButton}>
                            Save & Next
                        </button>
                    </div>
                }
            </div>
        </div>
    )
        ;
}

export default QuizPage;