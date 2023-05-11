import { Remove_UserInfo, Set_UserInfo } from "../Action/UserAction"

const initialState = {
    username: '',
    email: '',
    dateofbirth: '',
    token: '',
    id: ''
}

export const userReducer = (state= initialState, action) => {
    switch (action.type) {
        case Set_UserInfo: {
            return {
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                dateofbirth: action.payload.birthdate,
                token: action.payload.token,
                id: action.payload.id
            }
        }
        case Remove_UserInfo: {
            return {
                ...initialState
            }
        }
        default: {
            return state
        }
    }
}