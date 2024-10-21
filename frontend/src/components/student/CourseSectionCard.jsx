import styles from "./courseSectionCard.module.css"
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {FaLock} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const CourseSectionCard = (props) => {
    const navigate = useNavigate();
    return <div className={styles.courseSectionCard} onClick={props.onClick}>
        <div className={styles.statusContainer} style={props.completed ? {borderColor: "green"} : {}}>
            {props.completed ?
                <IoMdCheckmarkCircleOutline size={24} color={"green"}/> :
                props.allowed ?
                    <h3 className={styles.statusText}>{props.statusText}</h3> :
                    <FaLock color={"#214f9c"}/>
            }
        </div>
        <div className={styles.nameAndAboutContainer}>
            <h3 className={styles.nameText}>{props.title}</h3>
            <h5 className={styles.aboutText}>{props.desc}</h5>
        </div>
    </div>
}

export default CourseSectionCard