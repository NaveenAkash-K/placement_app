import styles from "./testInstructionsPage.module.css"
import {useSelector} from "react-redux";
import {useEffect} from "react";

const TestInstructionsPage = () => {
    const watermarkText = "2021IT0668"; // You can make this dynamic if needed

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

    const goFullScreen = () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };

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

            // Disable F12 (used to open Developer Tools)
            if (e.key === 'F12') {
                e.preventDefault();
            }
        };

        // Attach event listeners
        window.addEventListener("blur", handleWindowBlur);
        window.addEventListener("focus", handleWindowFocus);
        window.addEventListener("contextmenu", disableRightClick); // Disable right-click
        document.addEventListener("keydown", disableKeyShortcuts); // Disable Ctrl+C, Ctrl+U, Ctrl+S, and Ctrl+I (common shortcuts)

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("blur", handleWindowBlur);
            window.removeEventListener("focus", handleWindowFocus);
            window.removeEventListener("contextmenu", disableRightClick);
            document.removeEventListener("keydown", disableKeyShortcuts);
        };
    }, []);

    return <div className={styles.testInstructionsPage}>
        <div className={styles.waterMark} style={{}}/>
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
            <h2 className={styles.heading1}>By proceeding with the test, you agree to adhere to the above rules and
                conduct the test with honesty
                and
                integrity.</h2>
            <p>Good luck, and do your best!</p>
        </section>
        <div className={styles.remainingTimeContainer}>
            You can start test in: <strong className={styles.remainingTimeText}>00:45</strong>
        </div>
        <button onClick={goFullScreen} className={styles.startTestButton}>Start Test</button>
    </div>
}

export default TestInstructionsPage;