import React, {useEffect, useState} from 'react';
import './CounterOne.css';
import Scoreboard from "./components/Scoreboard/Scoreboard";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

function CounterOne() {

    const useLocalStorageList = (key: string, defaultValue: number | boolean) => {
        const [ state, setState ] = useState(()=>JSON.parse(localStorage.getItem(key) || String(defaultValue)))
        useEffect(()=>{
                localStorage.setItem(key, JSON.stringify(state))
        },[state])
        return [ state, setState ]
    }

    const [startValue, setStartValue] = useLocalStorageList('startValue',0)
    const [maxValue, setMaxValue] = useLocalStorageList('maxValue',5)
    const [count, setCounter] = useLocalStorageList('count',0)
    const [error, setError] = useLocalStorageList('false',false)

    const incrementValueCount = () => {
        if (typeof count === "number") {
            setCounter(count + 1)
        }
    }

    const resetValueCount = () => {
        setCounter(startValue)
    }

    const setValueCount = () => {
        if (!error && startValue !== count) {
            setCounter(startValue)
        }
    }

    const setStart = (value: number) => {
        setStartValue(value)
        if (value < 0 || maxValue <= 0 || maxValue <= value) {
            setError(true)
        } else {
            setError(false)
        }
        setCounter("enter values and press 'set'")
    }

    const setMax = (value: number) => {
        setMaxValue(value)
        if (startValue < 0 || value <= 0 || value <= startValue) {
            setError(true)
        } else {
            setError(false)
        }
        setCounter("enter values and press 'set'")

    }

    return (
        <div className="App">
            <div className={"item"}>
                <div className={"scoreboardInput"}>
                    <div>
                        <span>maxValue:</span> <Input value={maxValue} callback={setMax}
                                                      error={error}/>
                        <span>startValue:</span> <Input value={startValue} callback={setStart}
                                                        error={error}/>
                    </div>
                </div>
                <div className={"border-button"}>
                    <Button name={"set"}
                            callback={setValueCount}
                            disabled={count === startValue || error}/>
                </div>
            </div>
            <div className={"item"}>
                <Scoreboard count={count} maxValue={maxValue} error={error}/>
                <div className={"border-button"}>
                    <Button name={"inc"} callback={incrementValueCount}
                            disabled={count === maxValue || error || typeof count === "string"}/>
                    <Button name={"reset"} callback={resetValueCount}
                            disabled={count === startValue || error || typeof count === "string"}/>
                </div>
            </div>


        </div>
    );
}

export default CounterOne;
