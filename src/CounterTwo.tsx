import React, {useEffect, useState} from 'react';
import './CounterOne.css';
import Scoreboard from "./components/Scoreboard/Scoreboard";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

function CounterTwo() {

    const useLocalStorageList = (key: string, defaultValue: number | boolean) => {
        const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key) || String(defaultValue)))
        useEffect(() => {
            localStorage.setItem(key, JSON.stringify(state))
        }, [state])
        return [state, setState]
    }

    const [startValue, setStartValue] = useLocalStorageList('startValue', 0)
    const [maxValue, setMaxValue] = useLocalStorageList('maxValue', 5)
    const [count, setCounter] = useLocalStorageList('count', 0)
    const [error, setError] = useLocalStorageList('error', false)
    const [scoreboardInput, setScoreboardInput] = useLocalStorageList('error', false)

    const incrementValueCount = () => {
        setCounter(count + 1)
    }

    const resetValueCount = () => {
        setCounter(startValue)
    }

    const setValueCount = () => {
        if (!error) {
            setCounter(startValue)
        }
        setScoreboardInput(!scoreboardInput)
    }

    const setStart = (value: number) => {
        setStartValue(value)
        if (value < 0 || maxValue <= 0 || maxValue <= value) {
            setError(true)
        } else {
            setError(false)
        }
    }

    const setMax = (value: number) => {
        setMaxValue(value)
        if (startValue < 0 || value <= 0 || value <= startValue) {
            setError(true)
        } else {
            setError(false)
        }
    }

    return (
        <div className="App">
            {scoreboardInput
                ? <div className={"item"}>
                    <div className={"scoreboardInput"}>
                        <div>
                            <span>maxValue:</span> <Input value={maxValue} callback={setMax}
                                                          error={maxValue <= 0 || maxValue <= startValue}/>
                            <span>startValue:</span> <Input value={startValue} callback={setStart}
                                                            error={startValue < 0 || maxValue <= startValue}/>
                        </div>
                    </div>
                    <div className={"border-button"}>
                        <Button name={"set"}
                                callback={setValueCount}
                                disabled={error}/>
                    </div>
                </div>
                : <div className={"item"}>
                    <Scoreboard count={count} maxValue={maxValue} error={error}/>
                    <div className={"border-button"}>
                        <Button name={"inc"} callback={incrementValueCount}
                                disabled={count === maxValue || error}/>
                        <Button name={"reset"} callback={resetValueCount}
                                disabled={count === startValue || error}/>
                        <Button name={"set"}
                                callback={setValueCount}
                                disabled={error}/>
                    </div>
                </div>}
        </div>

    )
}

export default CounterTwo;
