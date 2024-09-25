import styles from "./customButton.module.css"

const CustomButton = (props) => {
    return <button onClick={props.onClick} className={styles.button}>{props.label}</button>
}

export  default  CustomButton