import styles from "./nav.module.css";
import svce_logo from "../../assets/logos/svce.png"
import {NavLink} from "react-router-dom";

const Nav = () => {
    return <div className={styles.nav}>
        <img src={svce_logo} width={100}/>
        <div className={styles.navLinksAndProfileContainer}>
            <div className={styles.studentNav}>
                <NavLink to="/admin/home" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>Admin</NavLink>
                <NavLink to="/student/home" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>My Learning</NavLink>
                <NavLink to="/auth/login" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>Login</NavLink>
                <NavLink to="/student/quiz" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>Quiz</NavLink>
            </div>
            <div className={styles.profileAndNameContainer}>
                <div className={styles.profile}>N</div>
                <p className={styles.nameText}>Naveen Akash K</p>
            </div>
        </div>
    </div>
}

export default Nav