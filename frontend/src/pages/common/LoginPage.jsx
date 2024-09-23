import styles from "./loginPage.module.css";
import Nav from "../../components/common/Nav";
import CustomTextInput from "../../components/common/CustomTextInput";
import CustomButton from "../../components/common/CustomButton";
import {useState} from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return <div className={styles.loginPage}>
        <div className={styles.content}>
            <div className={styles.formContainer}>
                <h1 className={styles.loginText}>Login</h1>
                <CustomTextInput placeholder="Username"
                                 value={username}
                                 onChange={setUsername}/>
                <CustomTextInput placeholder="Password"
                                 value={password}
                                 onChange={setPassword}/>
                <CustomButton label="Submit"/>
            </div>
        </div>
    </div>
}

export default LoginPage