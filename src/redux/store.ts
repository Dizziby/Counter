import {combineReducers, createStore} from "redux";
import {reducer} from "./reducer";
import {loadState, saveState} from "./localStorage";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers(reducer)

export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
    saveState(store.getState())
})


export type RootState = ReturnType<typeof rootReducer>
// export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector