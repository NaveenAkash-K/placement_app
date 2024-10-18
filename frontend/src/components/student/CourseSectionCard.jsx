import styles from "./courseSectionCard.module.css"

const CourseSectionCard = (props) => {
    return <div className={styles.courseSectionCard}>
        <div className={styles.statusContainer}>
            <h3 className={styles.statusText}>{props.statusText}</h3>
        </div>
        <div className={styles.nameAndAboutContainer}>
            <h3 className={styles.nameText}>{props.title}</h3>
            <h5 className={styles.aboutText}>About section About section About section About section</h5>
        </div>
    </div>
}

export default CourseSectionCard