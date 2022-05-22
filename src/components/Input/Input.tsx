import React, {ChangeEvent} from 'react';
import styles from "./Input.module.css"

type InputType = {
    error: boolean
    value: number
    callback: (value: number) => void
}

const Input: React.FC<InputType> = ({callback, error, value, ...props}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(+e.currentTarget.value)
    }

    const InputClassName = error ? `${styles.input} ${styles.error}` : `${styles.input}`

    return (
            <input className={InputClassName} value={value} onChange={onChangeHandler} type="number"/>
    );
};

export default Input;