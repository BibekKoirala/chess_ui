export const NotificationTypeEnum = {
  Success: "success",
  Error: "error",
  Warning: "warning",
  Info: "info",
};

export const ResponseTypeEnum = {
  Success: 200,
  BadRequest: 400,
  Unauthorized: 401,
  Unauthenticated: 403,
  NotFound: 404,
  InternalServerError: 500,
};

export const GameAction = {
  Online: "Online",
  Expired_Token: "Expired_Token",
  Search: "Search",
  Cancel_Search: "Cancel_Search",
  Game_Started: "Game_Started",
  Joined: "Joined",
  Opponent_Move: "Opponent_Move",
  Game_Over: "Game_Over",
  Move: "Move",
  Invalid_Request: "Invalid_Request",
  Rejoin: "Rejoin",
  Rejoin_Success: "Rejoin_Success",
  Rejoin_Failure: "Rejoin_Failure",
  Opponent_Rejoin: "Opponent_Rejoin",
  Opponent_Left: "Opponent_Left",
  Opponent_Inactive: "Opponent_Inactive",
  Illegal_Move: "Illegal_Move",
  In_Check: "In_Check",
  Is_CheckMate: "IS_CheckMate",
  Is_StaleMate: "Is_Stalemate",
  Is_Draw: "Is_Draw",
  Is_ThreeFold: "Is_ThreeFold",
  Is_InsufficientMaterial: "Is_InsufficientMaterial",
};
