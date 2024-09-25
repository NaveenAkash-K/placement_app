import styles from "./nav.module.css";
import svce_logo from "../../assets/logos/svce.png"
import {NavLink, useLocation} from "react-router-dom";

const Nav = () => {
    const location = useLocation();
    console.log(location.pathname);
    return <div className={styles.nav}>
        <img src={svce_logo} width={100}/>
        <div className={styles.navLinksAndProfileContainer}>

            {location.pathname.startsWith("/student")?<div className={styles.studentNav}>
                <NavLink to="/student/home" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>My Learning</NavLink>
                {/* <NavLink to="/auth/login" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>Login</NavLink> */}
                <NavLink to="/student/quiz" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>Quiz</NavLink>
            </div>:null}
            {location.pathname.startsWith("/admin")?<div className={styles.adminNav}>
                <NavLink to="/admin/home" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>Home</NavLink>
            </div>:null}
            {location.pathname.startsWith("/student")?<div className={styles.profileAndNameContainer}>
                <div className={styles.profile}>N</div>
                <p className={styles.nameText}>Naveen Akash K</p>
            </div>:null}
            {location.pathname.startsWith("/admin")?<div className={styles.profileAndNameContainer}>
                <div className={styles.profile}>A</div>
                <p className={styles.nameText}>Admin</p>
            </div>:null}
        </div>
    </div>
}

export default Nav