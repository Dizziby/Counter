import React from 'react';
import './CounterOne.css';
import Scoreboard from "./components/Scoreboard/Scoreboard";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import {useAppDispatch, useAppSelector} from "./redux/store";
import {setCounterAC, setErrorAC, setMaxValueAC, setScoreboardInputAC, setStartValueAC} from "./redux/reducer";

function CounterTwo() {

    const dispatch = useAppDispatch()

    const startValue = useAppSelector(state => state.reducer.startValue)
    const maxValue = useAppSelector(state => state.reducer.maxValue)
    const count = useAppSelector(state => state.reducer.count)
    const error = useAppSelector(state => state.reducer.error)
    const scoreboardInput = useAppSelector(state => state.reducer.scoreboardInput)


    const incrementValueCount = () => {
        if (typeof count === "number") {
            dispatch(setCounterAC(count + 1))
        }
    }

    const resetValueCount = () => {
        dispatch(setCounterAC(startValue))
    }

    const setValueCount = () => {
        if (!error) {
            dispatch(setCounterAC(startValue))
        }
        dispatch(setScoreboardInputAC(!scoreboardInput))
    }

    const setStart = (value: number) => {
        dispatch(setStartValueAC(value))
        if (value < 0 || maxValue <= 0 || maxValue <= value) {
            dispatch(setErrorAC(true))
        } else {
            dispatch(setErrorAC(false))
        }
    }

    const setMax = (value: number) => {
        dispatch(setMaxValueAC(value))
        if (startValue < 0 || value <= 0 || value <= startValue) {
            dispatch(setErrorAC(true))
        } else {
            dispatch(setErrorAC(false))
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
