import styles from "./stat.module.css"

const Stat = (props) => {
    return <div className={styles.statsContainer}>
        <h2 className={styles.statTitle}>{props.label}</h2>
        <h1 className={styles.statValue}>{props.value}</h1>
    </div>
}

export default Stat