import {useState} from "react";
import OTPInput from "react-otp-input";
import styles from "./forgetPasswordPage.module.css";
import CustomTextInput from "../../components/common/CustomTextInput";
import {toast} from "react-toastify";

const ForgetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleResetPassword = () => {
        if (newPassword === confirmPassword) {
            toast("Password successfully reset!", {type: "success"})
        } else {
            toast("Passwords do not match. Please try again.", {type: "error"})
        }
    };

    return (
        <div className={styles.forgetPasswordPage}>
            <h2 className={styles.title}>Reset Your Password</h2>
            <div className={styles.formContainer}>
                <h1 className={styles.loginText}>Forget Password</h1>
                <CustomTextInput
                    placeholder="New Password"
                    value={newPassword}
                    onChange={setNewPassword}
                />
                <CustomTextInput
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />
                <div className={styles.loginButton}
                     onClick={handleResetPassword}
                >{isLoading ? "Loading..." : "Change Password"}</div>
            </div>

        </div>
    );
};

export default ForgetPasswordPage;
