import styles from "./loginPage.module.css";
import Nav from "../../components/common/Nav";
import CustomTextInput from "../../components/common/CustomTextInput";
import CustomButton from "../../components/common/CustomButton";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import loginAPI from "../../apis/loginAPI";
import {updateUserDetails} from "../../store/authSlice";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import nav from "../../components/common/Nav";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("jwtToken")){
            if(localStorage.getItem("role") === "student") navigate("/student/home")
            if(localStorage.getItem("role") === "admin") navigate("/admin/home")
        }
    }, []);
    return (
        <div className={styles.loginPage}>
            <div className={styles.content}>
                <div className={styles.formContainer}>
                    <h1 className={styles.loginText}>Login</h1>
                    <CustomTextInput
                        placeholder="Username"
                        value={username}
                        onChange={setUsername}
                    />
                    <CustomTextInput
                        placeholder="Password"
                        value={password}
                        onChange={setPassword}
                    />
                    <CustomButton
                        onClick={async () => {
                            try {
                                const response = await loginAPI(username, password);
                                dispatch(updateUserDetails(response.data));
                                toast("Authentication Successful", {type: "success"})
                                localStorage.setItem("jwtToken", response.data.jwtToken)
                                localStorage.setItem("role", response.data.role)
                                localStorage.setItem("userId", response.data.userId)
                                localStorage.setItem("username", response.data.name)
                                localStorage.setItem("email", response.data.email)
                                navigate("/student/home")
                            } catch (e) {
                                toast("Authorization Error", {type: "error"})
                            }
                        }}
                        label="Submit"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
