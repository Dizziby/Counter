import React from 'react';
import styles from "./Button.module.css"

type ButtonType = {
    name: string
    disabled?: boolean
    callback: () => void
}

const Button: React.FC<ButtonType> = ({name, disabled, callback}) => {
    return (
        <>
            <button className={styles.btn} onClick={callback} disabled={disabled}>{name}</button>
        </>
    );
};

export default Button;