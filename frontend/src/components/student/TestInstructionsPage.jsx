import styles from "./testInstructionsPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import registerSessionAPI from "../../apis/registerSessionAPI";
import {initializeQuestions, updateSelectedQuestion} from "../../store/quizSlice";
import formatTimer from "../../utils/formatTimer";
import goFullScreen from "../../utils/goFullscreen";

const TestInstructionsPage = () => {
    const watermarkText = "2021IT0668"; // You can make this dynamic if needed
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(5);
    const [canStartTest, setCanStartTest] = useState(false);
    const intervalId = useRef(null);

    useEffect(() => {
        if (timer === 0) {
            clearInterval(intervalId.current)
            setCanStartTest(true);
        }
    }, [timer])

    useEffect(() => {
        intervalId.current = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000)
    }, [])

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

        // Cleanup style tag on component unmount
        return () => {
            document.head.removeChild(style);
        };
    }, [watermarkText]);

    const navigate = useNavigate();

    const startTest = async () => {
        goFullScreen();
        const response = await registerSessionAPI("CS101", 1);
        localStorage.setItem("sessionId", response.data.session.sessionId)
        dispatch(initializeQuestions(response.data.questions))
        dispatch(updateSelectedQuestion(0))
        navigate("/student/quiz")
    }

    return <div className={styles.testInstructionsPage}>
        <div className={styles.waterMark}/>
        <section className={styles.instructionGroup}>
            <h2 className={styles.heading1}>Test Instructions & Guidelines</h2>
            <p>Hi {localStorage.getItem("username")}. Please read the following instructions carefully before beginning
                your
                quiz.</p>
        </section>
        <section className={styles.instructionGroup}>
            <h3 className={styles.heading2}>General Guidelines</h3>
            <li className={styles.listItem}>
                <strong style={{fontWeight: 600}}>Ensure Stable Internet:</strong> You are
                required to have a stable
                internet connection throughout the test. Any
                disruption in connectivity could lead to disqualification or incomplete submission.
            </li>
            <li className={styles.listItem}><strong style={{fontWeight: 600}}>Single Device Usage:</strong> The test
                must be taken on the same device used to start
                the quiz. Accessing the
                quiz
                from a different device is strictly prohibited and will result in the session being invalidated.
            </li>
            <li className={styles.listItem}><strong style={{fontWeight: 600}}>Browser Integrity:</strong> The test
                should be taken in a single browser window. Do
                not attempt to open new tabs
                or
                switch between windows while the test is in progress. Frequent tab switching or trying to open the test
                in
                multiple windows may result in automatic termination of your session.
            </li>
            <li className={styles.listItem}><strong style={{fontWeight: 600}}>Session-Based Monitoring:</strong> A
                unique session is created when you begin your
                test. This session is tied to
                your
                device and activity logs. Attempts to manipulate or share session tokens with others will be flagged and
                could lead to disqualification.
            </li>
            <li className={styles.listItem}><strong style={{fontWeight: 600}}>Time Limit:</strong> Each quiz is timed.
                You must complete the test within the
                allotted time. Exceeding the time
                limit will result in automatic submission of your answers.
            </li>
            <li className={styles.listItem}><strong style={{fontWeight: 600}}>Answer Submissions:</strong> Ensure that
                all answers are submitted before the timer
                ends. Partial answers may not
                be
                saved after the time limit has expired.
            </li>
            <h3 className={styles.heading2}>Prohibited Activities</h3>
            <li className={styles.listItem}><strong style={{fontWeight: 600}}>Collaboration & Cheating:</strong> Any
                form of collaboration or external help during
                the test is prohibited. The
                test
                is designed for individual performance, and sharing answers or receiving assistance from others will
                result
                in disqualification.
            </li>
            <li className={styles.listItem}><strong style={{fontWeight: 600}}>External Resources:</strong> You are not
                allowed to refer to textbooks, notes, or use
                any form of online help
                (such
                as search engines, or forums) while the test is in progress.
            </li>
            <li className={styles.listItem}><strong style={{fontWeight: 600}}>Impersonation:</strong> Taking the test
                for another individual or allowing someone
                else to take the test on your
                behalf is considered a serious violation and will lead to severe penalties.
            </li>
            <h3 className={styles.heading2}>Monitoring & Recording</h3>
            <li className={styles.listItem}><strong style={{fontWeight: 600}}>Activity Monitoring:</strong> Your actions
                during the test are being monitored. This
                includes tracking
                interactions
                like mouse clicks, key presses, tab switches, and page reloads. Any suspicious activity may be flagged
                for
                review.
            </li>
            <li className={styles.listItem}><strong style={{fontWeight: 600}}>Screen Activity Logging:</strong> Your
                screen activity may be recorded for the
                duration of the test to detect
                unauthorized behavior such as copying content, accessing restricted resources, or using multiple
                applications.
            </li>
        </section>
        <section className={styles.instructionGroup}>
            <h2 className={styles.heading1}>Disciplinary Actions</h2>
            <p>Any violation of the above guidelines, including attempts to engage in malpractice or suspicious
                activity,
                will result in immediate action, which may include:</p>
            <li className={styles.listItem}>Disqualification from the test</li>
            <li className={styles.listItem}>Invalidating test results</li>
            <li className={styles.listItem}>Reporting to university authorities for further action</li>
        </section>
        <section className={styles.instructionGroup}>
            <h3 className={styles.heading2}>Prepare Your Device</h3>
            <p>Before starting the test, please follow these steps to avoid interruptions:</p>
            <li className={styles.listItem}>
                <strong style={{fontWeight: 600}}>Close Unnecessary Applications:</strong> Close any background
                applications (like messaging apps, video players, or social media platforms) to prevent distractions and
                improve device performance.
            </li>
            <li className={styles.listItem}>
                <strong style={{fontWeight: 600}}>Disable VPN or Proxy Services:</strong> Ensure that any VPN, proxy, or
                similar network service is turned off, as it may cause connectivity issues and could trigger security
                flags during the test.
            </li>
            <li className={styles.listItem}>
                <strong style={{fontWeight: 600}}>Block Notifications:</strong> Enable "Do Not Disturb" mode or turn off
                notifications on your device to avoid pop-ups that may cause distractions or cover important test
                content.
            </li>
            <li className={styles.listItem}>
                <strong style={{fontWeight: 600}}>Maintain Full Battery:</strong> Ensure your device is fully charged or
                plugged into a power source, as losing power during the test could result in incomplete submissions.
            </li>
            <li className={styles.listItem}>
                <strong style={{fontWeight: 600}}>Set to Full-Screen Mode:</strong> The test will run in full-screen
                mode to improve focus. Any attempt to exit this mode may impact your ability to complete the test.
            </li>
        </section>
        <section className={styles.instructionGroup}>
            <h2 className={styles.heading1}>By proceeding with the test, you agree to adhere to the above rules and
                conduct the test with honesty
                and
                integrity.</h2>
            <p>Good luck, and do your best!</p>
        </section>
        <div className={styles.remainingTimeContainer}>
            You can start test in: <strong className={styles.remainingTimeText}>{formatTimer(timer)}</strong>
        </div>
        <button onClick={canStartTest ? startTest : null}
                style={canStartTest ? {} : {cursor:"default"}}
                className={`${styles.startTestButton} ${!canStartTest ? styles.disabled : ""}`}>Start Test
        </button>
    </div>
}

export default TestInstructionsPage;