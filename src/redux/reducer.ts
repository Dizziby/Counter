const initialState = {
    startValue: 0,
    maxValue: 5,
    count: 0,
    error: false,
    scoreboardInput: false
}

type InitialStateType = {
    startValue: number
    maxValue: number
    count: number | string
    error: boolean
    scoreboardInput?: boolean
}

type ActionType =
    ReturnType<typeof setStartValueAC>
    | ReturnType<typeof setMaxValueAC>
    | ReturnType<typeof setCounterAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setScoreboardInputAC>

export const reducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_START_VALUE": {
            return {
                ...state,
                startValue: action.value
            }
        }
        case "SET_MAX_VALUE": {
            return {
                ...state,
                maxValue: action.value
            }
        }
        case "SET_COUNTER": {
            return {
                ...state,
                count: action.value
            }
        }
        case "SET_ERROR": {
            return {
                ...state,
                error: action.value
            }
        }
        case "SET_SCOREBOARD_INPUT": {
            return {
                ...state,
                scoreboardInput: action.value
            }
        }
        default:
            return state
    }
}

export const setStartValueAC = (value: number) => ({
    type: "SET_START_VALUE",
    value
}) as const

export const setMaxValueAC = (value: number) => ({
    type: "SET_MAX_VALUE",
    value
}) as const

export const setCounterAC = (value: number | string) => ({
    type: "SET_COUNTER",
    value
}) as const

export const setErrorAC = (value: boolean) => ({
    type: "SET_ERROR",
    value
}) as const

export const setScoreboardInputAC = (value: boolean) => ({
    type: "SET_SCOREBOARD_INPUT",
    value
}) as const
