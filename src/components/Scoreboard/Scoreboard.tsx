import React from 'react';
import styles from "./Scoreboard.module.css"

type ScoreboardType = {
    count: number | string
    maxValue: number
    error: boolean
}

const Scoreboard: React.FC<ScoreboardType> = ({count, maxValue, error}) => {

    const countRed = count === maxValue ? `${styles.red}` : ""
    const errorRed = error ? `${styles.red}` : ""

    return (
        <div className={styles.scoreboard}>
            {error ? <p className={errorRed}>"Incorrect values"</p>: <p className={countRed}>{count}</p>}
        </div>
    );
};

export default Scoreboard;