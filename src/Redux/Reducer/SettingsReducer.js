import { Remove_Settings, Set_Multiplayer, Set_Settings } from "../Action/SettingsAction"

const initialState = {
    against: 0,
    time: 0,
    difficulty: 0,
    playas: 'w',
}

export const settingReducer = (state= initialState, action) => {
    switch (action.type) {
        case Set_Settings: {
            console.log(state)
            return {
                ...state,
                ...action.payload
            }
        }
        case Remove_Settings: {
            return {
                ...initialState
            }
        }
        case Set_Multiplayer: {
            return {
                ...state,
                multiplayertoken: action.payload.multiplayertoken,
                multiplayer_playas: action.payload.multiplayer_playas,
            }
        }
        default: {
            return state
        }
    }
}