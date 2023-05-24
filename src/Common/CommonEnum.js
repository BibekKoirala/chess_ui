export const NotificationTypeEnum = {
    Success: "success",
    Error: "error",
    Warning: "warning",
    Info: "info",
}

export const ResponseTypeEnum = {
    Success: 200,
    BadRequest: 400,
    Unauthorized: 401,
    Unauthenticated: 403,
    NotFound: 404,
    InternalServerError: 500
}

export const GameAction = {
    Expired_Token: "Expired_Token",
    Search: "Search",
    Game_Started: "Game_Started",
    Joined: "Joined",
    Opponent_Move: "Opponent_Move",
    Game_Over: "Game_Over",
    Move: "Move",
    Invalid_Request: "Invalid_Request",
    Rejoin: "Rejoin",
    Illegal_Move: "Illegal_Move",
    In_Check: "In_Check",
}