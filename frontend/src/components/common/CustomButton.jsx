import styles from "./customButton.module.css"

const CustomButton = (props) => {
    return <button className={styles.button}>{props.label}</button>
}

export  default  CustomButton