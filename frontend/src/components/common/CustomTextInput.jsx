import styles from "./customTextInput.module.css"

const CustomTextInput = (props) => {
    return <input className={`${styles.input} ${props.className}`}
                  placeholder={props.placeholder}
                  value={props.value}
                  onChange={(text) => props.onChange(text.nativeEvent.target.value)}/>
}

export default CustomTextInput;
