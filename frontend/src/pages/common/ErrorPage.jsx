import styles from "./errorPage.module.css";
import {useLocation, useNavigate} from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoHome = () => {
        if (location.pathname.startsWith("/student")) {
            navigate("/student/home")
        } else if (location.pathname.startsWith("/admin")) {
            navigate("/admin/home")
        }
    };

    return (
        <div className={styles.errorPage}>
            <div className={styles.errorContainer}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.errorMessage}>Something went wrong</h2>
                <p className={styles.errorDescription}>
                    We’re sorry, but the page you requested could not be found. Please check the URL or return to the
                    home page.
                </p>
                <button className={styles.homeButton} onClick={handleGoHome}>Go to Home</button>
            </div>
        </div>
    );
};

export default ErrorPage;
