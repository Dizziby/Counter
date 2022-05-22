import {reducer} from "./reducer";
import {loadState, saveState} from "./localStorage";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import throttle from 'lodash/throttle';

const rootReducer = combineReducers({
    reducer: reducer
})

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState()
})

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));


//export type RootState = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector