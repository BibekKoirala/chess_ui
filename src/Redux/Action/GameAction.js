import { GameAction } from "../../Common/CommonEnum";

export const Game_Not_Started = "Game_Not_Started";
export const Game_Ongoing = "Game_Ongoing";
export const Game_Over = "Game_Over"

export function setGameNotStarted () {
    return {
        type: Game_Not_Started
    }
}

export function setGameOnGoing () {
    return {
        type: Game_Ongoing
    }
}

export function setGameOver () {
    return {
        type: Game_Over
    }
}

export function setDrawOffered () {
    return {
        type: GameAction.Draw_Offered
    }
}

export function setDrawRejected () {
    return {
        type : GameAction.Draw_Rejected
    }
}

export function setDrawAccepted () {
    return {
        type : GameAction.Draw_Accepted
    }
}