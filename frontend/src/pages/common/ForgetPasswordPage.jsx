import {useEffect, useState} from "react";
import OTPInput from "react-otp-input";
import styles from "./forgetPasswordPage.module.css";
import CustomTextInput from "../../components/common/CustomTextInput";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import verifyForgetPasswordTokenAPI from "../../apis/common/verifyForgetPasswordTokenAPI";
import updatePasswordAPI from "../../apis/common/updatePasswordAPI";

const ForgetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const {token} = params;

    useEffect(() => {
        setIsLoading(true)
        verifyForgetPasswordTokenAPI(token).catch(e => {
            toast(e.response.data.message, {type: "warning"});
            navigate("/auth/login");
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);

    const handleResetPassword = async () => {
        try {
            if (newPassword === undefined || newPassword === null || newPassword.trim().length < 6) {
                toast("Password must be at least 6 characters", {type: "warning"})
                return;
            }
            if (newPassword !== confirmPassword) {
                toast("Passwords do not match", {type: "warning"})
                return;
            }
            setIsLoading(true);
            const response = await updatePasswordAPI(newPassword, token);
            toast(response.data.message, {type: "success"})
            navigate("/auth/login");
        } catch (e) {
            toast(e.data.message, {type: "warning"})
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.forgetPasswordPage}>
            {/*<h2 className={styles.title}>Reset Your Password</h2>*/}
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
                     onClick={isLoading ? () => {
                     } : handleResetPassword}
                >{isLoading ? "Loading..." : "Change Password"}</div>
            </div>

        </div>
    );
};

export default ForgetPasswordPage;
