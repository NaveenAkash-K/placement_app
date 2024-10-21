import styles from "./nav.module.css";
import svce_logo from "../../assets/logos/svce.png"
import {NavLink, useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const Nav = () => {
    const location = useLocation();
    const params = useParams();
    const authState = useSelector(state => state.auth);

    return <div className={styles.nav}>
        <img src={svce_logo} width={80}/>
        <div className={styles.navLinksAndProfileContainer}>
            {location.pathname.startsWith("/student") ? <div className={styles.studentNav}>
                <NavLink to="/student/home" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>My Learning</NavLink>
                {/* <NavLink to="/auth/login" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>Login</NavLink> */}
                <NavLink to="/student/quiz" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>Quiz</NavLink>
            </div> : null}
            {location.pathname.startsWith("/admin") ? <div className={styles.adminNav}>
                <NavLink to="/admin/home" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>Home</NavLink>
            </div> : null}
            {location.pathname.startsWith("/student") ? <div className={styles.profileAndNameContainer}>
                <div className={styles.profile}>{localStorage.getItem("username")[0]}</div>
                <p className={styles.nameText}> {localStorage.getItem("username")}</p>
            </div> : null}
            {location.pathname.startsWith("/admin") ? <div className={styles.profileAndNameContainer}>
                <div className={styles.profile}>{localStorage.getItem("username")[0]}</div>
                <p className={styles.nameText}>{localStorage.getItem("username")}</p>
            </div> : null}
        </div>
    </div>
}

export default Nav