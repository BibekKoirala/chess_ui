import { Remove_Settings, Set_Settings } from "../Action/SettingsAction"

const initialState = {
    against: 1,
    time: 10,
    difficulty: 1,
    playas: 1,
}

export const userReducer = (state= initialState, action) => {
    switch (action.type) {
        case Set_Settings: {
            return {
                ...state,
                against: action.payload.against,
                time: action.payload.time,
                difficulty: action.payload.difficulty,
                playas: action.payload.playas,
            }
        }
        case Remove_Settings: {
            return {
                ...initialState
            }
        }
        default: {
            return state
        }
    }
}