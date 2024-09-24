import { Remove_Settings, Set_Multiplayer, Set_Settings } from "../Action/SettingsAction"

const initialState = {
    against: 1,
    time: 10,
    difficulty: 1,
    playas: 'a',
    multiplayertoken: null,
    multiplayer_playas: "a"
}

export const settingReducer = (state= initialState, action) => {
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