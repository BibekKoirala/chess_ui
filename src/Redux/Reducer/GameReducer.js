import { GameAction } from "../../Common/CommonEnum";
import { Game_Over, Game_Ongoing, Game_Not_Started } from "../Action/GameAction";

const initialState = {
    game_status:0,
    draw_offered: false
}

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case Game_Not_Started: {
            return {
                ...state,
                game_status: 0
            }
        }
        case Game_Ongoing: {
            return {
                ...state,
                game_status: 1
            }
        }
        case Game_Over: {
            return {
                ...state,
                game_status: 2
            }
        }
        case GameAction.Draw_Accepted: {
            return {
                ...state, 
                draw_offered: false
            }
        }
        case GameAction.Draw_Offered: {
            return {
                ...state, 
                draw_offered: true
            }
        }
        case GameAction.Draw_Rejected: {
            return {
                ...state, 
                draw_offered: false
            }
        }
        default: {
            return state
        }
    }
}