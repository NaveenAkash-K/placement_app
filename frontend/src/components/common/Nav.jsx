import styles from "./nav.module.css";
import svce_logo from "../../assets/logos/svce.png"
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IoMdLogOut} from "react-icons/io";
import {useState} from "react";
import {clearAuthDetails} from "../../store/authSlice";


const Nav = () => {
    const location = useLocation();
    const params = useParams();
    const authState = useSelector(state => state.auth);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearAuthDetails());
        localStorage.clear();
        navigate("/auth/login");
    }

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
                {/*<NavLink to="/student/quiz" className={({isActive}) =>*/}
                {/*    isActive ? styles.navLinkText_active : styles.navLinkText*/}
                {/*}>Quiz</NavLink>*/}
            </div> : null}
            {location.pathname.startsWith("/admin") ? <div className={styles.adminNav}>
                <NavLink to="/admin/home" className={({isActive}) =>
                    isActive ? styles.navLinkText_active : styles.navLinkText
                }>Home</NavLink>
            </div> : null}
            {location.pathname.startsWith("/student") ?
                <div className={styles.profileAndNameContainer}
                     onClick={() => setIsDropdownVisible(prev => !prev)}>
                    {isDropdownVisible && <div className={styles.dropdownContainer}>
                        <div className={styles.logoutButton} onClick={logout}>
                            <IoMdLogOut size={20}/>
                            <p>Logout</p>
                        </div>
                    </div>}
                    <div className={styles.profile}>{localStorage.getItem("username")[0]}</div>
                    <p className={styles.nameText}> {localStorage.getItem("username")}</p>
                </div> : null}
            {location.pathname.startsWith("/admin") ? <div className={styles.profileAndNameContainer} onClick={() => setIsDropdownVisible(prev => !prev)}>
                {isDropdownVisible && <div className={styles.dropdownContainer}>
                    <div className={styles.logoutButton} onClick={logout}>
                        <IoMdLogOut size={20}/>
                        <p>Logout</p>
                    </div>
                </div>}
                <div className={styles.profile}>{localStorage.getItem("username")[0]}</div>
                <p className={styles.nameText}>{localStorage.getItem("username")}</p>
            </div> : null}
        </div>
    </div>
}

export default Nav