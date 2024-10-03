import { Game_Over, Game_Ongoing, Game_Not_Started } from "../Action/GameAction";

const initialState = {
    game_status:0
}

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case Game_Not_Started: {
            return {
                game_status: 0
            }
        }
        case Game_Ongoing: {
            return {
                game_status: 1
            }
        }
        case Game_Over: {
            return {
                game_status: 2
            }
        }
        default: {
            return state
        }
    }
}