import React from 'react';
import './CounterOne.css';
import Scoreboard from "./components/Scoreboard/Scoreboard";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import {useAppDispatch, useAppSelector} from "./redux/store";
import {setCounterAC, setErrorAC, setMaxValueAC, setStartValueAC} from "./redux/reducer";

function CounterOne() {

    const dispatch = useAppDispatch()

    const startValue = useAppSelector(state => state.reducer.startValue)
    const maxValue = useAppSelector(state => state.reducer.maxValue)
    const count = useAppSelector(state => state.reducer.count)
    const error = useAppSelector(state => state.reducer.error)

    const incrementValueCount = () => {
        if (typeof count === "number") {
            dispatch(setCounterAC(count + 1))
        }
    }

    const resetValueCount = () => {
        dispatch(setCounterAC(startValue))
    }

    const setValueCount = () => {
        if (!error && startValue !== count) {
            dispatch(setCounterAC(startValue))
        }
    }

    const setStart = (value: number) => {
        dispatch(setStartValueAC(value))
        if (value < 0 || maxValue <= 0 || maxValue <= value) {
            dispatch(setErrorAC(true))
        } else {
            dispatch(setErrorAC(false))
        }
        dispatch(setCounterAC("enter values and press 'set'"))
    }

    const setMax = (value: number) => {
        dispatch(setMaxValueAC(value))
        if (startValue < 0 || value <= 0 || value <= startValue) {
            dispatch(setErrorAC(true))
        } else {
            dispatch(setErrorAC(false))
        }
        dispatch(setCounterAC("enter values and press 'set'"))
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
