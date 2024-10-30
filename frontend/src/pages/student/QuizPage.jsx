import styles from "./quizPage.module.css";
import {useEffect, useRef, useState} from "react";
import {FaRegClock} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {
    answerQuestion,
    clearQuiz,
    completeQuestion,
    updateQuestion,
    updateSelectedQuestion
} from "../../store/quizSlice";
import fetchQuestionAPI from "../../apis/fetchQuestionAPI";
import loginAPI from "../../apis/loginAPI";
import answerQuestionAPI from "../../apis/answerQuestionAPI";
import tabSwitchAPI from "../../apis/tabSwitchAPI";
import closeSessionAPI from "../../apis/closeSessionAPI";
import {useNavigate} from "react-router-dom";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {toast} from "react-toastify";
import formatTimer from "../../utils/formatTimer";
import goFullScreen from "../../utils/goFullscreen";

const QuizPage = () => {
    const watermarkText = "2021IT0668";
    const selectedQuestion = useSelector(state => state.quiz.selectedQuestion);
    const quizQuestions = useSelector(state => state.quiz.questions);
    const questionData = quizQuestions[selectedQuestion];
    const dispatch = useDispatch();
    const [isTabSwitchOverlayVisible, setIsTabSwitchOverlayVisible] = useState(false);
    const [isFullscreenWarningVisible, setIsFullscreenWarningVisible] = useState(false);
    const [isEndTestWarningVisible, setIsEndTestWarningVisible] = useState(false)
    const navigate = useNavigate();
    const intervalId = useRef(null);
    const [timer, setTimer] = useState(questionData.time);
    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false)
    const [isLoadQuestionLoading, setIsLoadQuestionLoading] = useState(false)

    useEffect(() => {
        clearInterval(intervalId.current);
        setTimer(questionData.time);
    }, [selectedQuestion]);

    useEffect(() => {
        if (timer === 10) {
            toast("Last 10 seconds. Please save your answer", {type: "warning"});
        }
        if (timer === 0) {
            setIsSaveButtonLoading(true)
            clearInterval(intervalId.current);
            answerQuestionAPI(questionData.questionId, questionData.selectedAnswers).then(res => {
                dispatch(completeQuestion({questionId: questionData.questionId}));
                setIsSaveButtonLoading(false)
            })
        }
    }, [timer]);

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

    // useEffect(() => {
    //     // Handle window focus and blur events
    //     const handleWindowFocus = () => {
    //         console.log("Focus regained");
    //     };
    //
    //     const handleWindowBlur = async () => {
    //         await tabSwitchAPI();
    //         setIsTabSwitchOverlayVisible(true);
    //         console.log("Tab/Window switched");
    //     };
    //
    //     // Disable right-click context menu
    //     const disableRightClick = (e) => e.preventDefault();
    //
    //     // Disable specific key shortcuts
    //     const disableKeyShortcuts = (e) => {
    //         if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'I' || e.key === 'S' || e.key === 'U')) {
    //             e.preventDefault();
    //         }
    //
    //         if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'i')) {
    //             e.preventDefault();
    //         }
    //
    //         if (e.key === 'F12') {
    //             e.preventDefault();
    //         }
    //     };
    //
    //     // Prevent back button navigation
    //     const handleBackButton = (event) => {
    //         event.preventDefault();
    //         setIsTabSwitchOverlayVisible(true); // Show warning overlay
    //         console.log("Back navigation attempt prevented");
    //     };
    //
    //     // Detect fullscreen exit
    //     const handleFullscreenChange = () => {
    //         if (!document.fullscreenElement) {
    //             setIsFullscreenWarningVisible(true);
    //         }
    //     };
    //
    //     // Adding event listeners
    //     window.addEventListener("blur", handleWindowBlur);
    //     window.addEventListener("focus", handleWindowFocus);
    //     window.addEventListener("contextmenu", disableRightClick);
    //     document.addEventListener("keydown", disableKeyShortcuts);
    //     window.addEventListener("popstate", handleBackButton); // Listen for back button actions
    //     document.addEventListener("fullscreenchange", handleFullscreenChange); // Listen for fullscreen changes
    //
    //
    //     // Cleanup event listeners on component unmount
    //     return () => {
    //         window.removeEventListener("blur", handleWindowBlur);
    //         window.removeEventListener("focus", handleWindowFocus);
    //         window.removeEventListener("contextmenu", disableRightClick);
    //         document.removeEventListener("keydown", disableKeyShortcuts);
    //         window.removeEventListener("popstate", handleBackButton);
    //         document.removeEventListener("fullscreenchange", handleFullscreenChange);
    //         clearInterval(intervalId.current);
    //     };
    // }, []);

    const startTimer = () => {
        clearInterval(intervalId.current);
        intervalId.current = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
    }

    const loadQuestion = async () => {
        setIsLoadQuestionLoading(true)
        const response = await fetchQuestionAPI(questionData.questionId);
        dispatch(updateQuestion(response.data.question))
        startTimer();
        setIsLoadQuestionLoading(false)
    }

    const onSaveButton = async () => {
        clearInterval(intervalId.current);
        if (questionData.isCompleted && selectedQuestion + 1 < quizQuestions.length) {
            dispatch(updateSelectedQuestion(selectedQuestion + 1))
        }
        if (questionData.selectedAnswers.length === 0 && !questionData.isCompleted) {
            toast("Please select any option", {type: "warning"})
            return;
        }
        setIsSaveButtonLoading(true);
        await answerQuestionAPI(questionData.questionId, questionData.selectedAnswers);
        dispatch(completeQuestion({questionId: questionData.questionId}))
        setIsSaveButtonLoading(false);
        if (selectedQuestion + 1 < quizQuestions.length) {
            dispatch(updateSelectedQuestion(selectedQuestion + 1))
        } else {
            setIsEndTestWarningVisible(true);
        }
    }

    return (<div className={styles.quizPage}>
            {isEndTestWarningVisible && (
                <div className={styles.backdrop}>
                    <div className={styles.endTestContent}>
                        <h2 className={styles.endTestTitle}>End Test Confirmation</h2>
                        <p className={styles.endTestMessage}>
                            You are about to end the test. Below is a summary of your answers.
                        </p>

                        <div className={styles.summaryContainer}>
                            <h3 className={styles.summaryTitle}>Summary of Questions</h3>
                            <div className={styles.summaryGrid}>
                                {quizQuestions.map((question, index) => (
                                    <div key={index}
                                         className={`${styles.questionStatus} ${question.isCompleted ? styles.completed : styles.notCompleted}`}>
                                        <p>Question {index + 1}</p>
                                        <span>{question.isCompleted ? "Answered" : "Unanswered"}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className={styles.confirmationMessage}>
                            Are you sure you want to end the test?
                        </p>

                        <div className={styles.buttonContainer}>
                            <button className={styles.cancelButton} onClick={() => setIsEndTestWarningVisible(false)}>
                                Continue Test
                            </button>
                            <button className={styles.endTestButton} onClick={async () => {
                                await closeSessionAPI();
                                localStorage.removeItem("sessionId");
                                navigate("/student/home")
                                setTimeout(() => {
                                    dispatch(clearQuiz())
                                    if (document.fullscreenElement) {
                                        document.exitFullscreen();
                                    }
                                }, 500)
                            }}>
                                End Test
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isFullscreenWarningVisible && <div className={styles.backdrop}>
                <div className={styles.tabSwitchContent}>
                    <h2 className={styles.tabSwitchTitle}>Fullscreen Mode Exited</h2>
                    <p className={styles.tabSwitchMessage}>
                        It appears you've exited fullscreen mode. To continue the test, please re-enter fullscreen. </p>
                    <p className={styles.tabSwitchMessage}>
                        For a secure testing environment, you must remain in fullscreen. Exiting fullscreen repeatedly
                        may result in test termination.
                    </p>
                    <button className={styles.tabSwitchButton} onClick={() => {
                        goFullScreen();
                        setIsFullscreenWarningVisible(false)
                    }}>
                        Re-Enter Fullscreen
                    </button>
                </div>
            </div>}
            {isTabSwitchOverlayVisible && <div className={styles.backdrop}>
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
                        return (
                            <div
                                onClick={() => {
                                    if (!questionData.isCompleted && questionData.isFetched) {
                                        toast("Please save the answer before leaving", {type: "warning"})
                                        return;
                                    }
                                    dispatch(updateSelectedQuestion(index))
                                }}
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
                    {questionData.isCompleted ?
                        <div className={styles.savedContainer}>
                            <IoMdCheckmarkCircleOutline/>
                            <p>Saved</p>
                        </div> :
                        <div className={styles.timer}>
                            <FaRegClock/>
                            <p className={styles.time}>{formatTimer(timer)}</p>
                        </div>}
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
                                onClick={isLoadQuestionLoading ? null : async () => {
                                    await loadQuestion()
                                }}>
                            {isLoadQuestionLoading ? "...Loading" : "Load Question"}
                        </button>
                    </div> :
                    <div>
                        <h3 className={styles.question}>{questionData.questionText}
                        </h3>
                        <br/>
                        <p className={styles.choose}>Choose the best answer</p>
                        <div className={styles.options}>
                            {questionData.options.map((option, index) => <div
                                style={questionData.isCompleted ? {cursor: "default"} : {}}
                                className={`${styles.option} ${questionData.selectedAnswers.includes(option) ? styles.option_active : null}`}
                                onClick={questionData.isCompleted ?
                                    null :
                                    () => {
                                        dispatch(answerQuestion({questionId: questionData.questionId, answer: option}))
                                    }}>
                                <input type="radio" value={option} name="answer"
                                       checked={questionData.selectedAnswers.includes(option)}/>
                                <p className={styles.optionText}>{option}</p>
                            </div>)}
                        </div>
                        <button className={styles.nextButton}
                                onClick={isSaveButtonLoading ? null : onSaveButton}>
                            {isSaveButtonLoading ?
                                "...Loading" :
                                selectedQuestion === quizQuestions.length - 1 ?
                                    "Save & End test" :
                                    questionData.isCompleted ?
                                        "Next" :
                                        "Save & Next"}
                        </button>
                    </div>
                }
            </div>
        </div>
    )
        ;
}

export default QuizPage;