import React, { useEffect, useState, useContext, useRef } from "react";
import { Chessboard } from "react-chessboard";
import {
  Avatar,
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Chess } from "chess.js";
import { connect } from "react-redux";
import { BaseUrl } from "../../../../ServerSetting";
import {
  GameAction,
  NotificationTypeEnum,
} from "../../../../Common/CommonEnum";
import { setMultiplayer } from "../../../../Redux/Action/SettingsAction";
import CircularProgressBar from "@mui/material/CircularProgress";
import { WebsocketContext } from "../../../WebsocketContext";
import Sideoption from "./StartSidebar/Sideoption";
import GameSideoption from "./GameSidebar/GameSideoption";
import SearchSideoption from "./SearchSidebar/SearchSideoption";
import CustomSnackbar from "../../../Common/Snackbar";

function MultiPlayer(props) {
  const [game, setGame] = useState(new Chess());
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [endCondition, setEndCondition] = useState("");
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [opponentLeft, setOpponentLeft] = useState(false);
  const [drawOffered, setDrawOffered] = useState(false);
  const [gameHistory, setGameHistory] = useState(false);
  const [historyGame, setHistoryGame] = useState(new Chess());
  const [historyas, setHistoryAs] = useState('w');
  const [myinfo, setMyInfo] = useState({});
  const [opponentInfo, setOpponentInfo] = useState({});
  const [myClock, setMyClock] = useState(0);
  const [opponentClock, setOpponentClock] = useState(0);

  const messageRef = useRef("");
  const timerRef = useRef(15);

  const WSMessage = (action, message, payload) => {
    return payload
      ? JSON.stringify({ action: action, message: message, payload: payload })
      : JSON.stringify({ action: action, message: message });
  };

  const [ready, val, send] = useContext(WebsocketContext);

  const handleStart = () => {
    setSearch(false);
    setStart(true);
    setGameHistory(false);
  };

  const handleSearch = () => {
    setStart(false);
    setSearch(true);
  };

  const handleCancelSearch = () => {
    setSearch(false);
    setStart(false);
  };

  useEffect(() => {
    if (props.setting.multiplayertoken && ready) {
      send(
        WSMessage(GameAction.Rejoin, "Rejoin", {
          token: props.setting.multiplayertoken,
          id: props.user.id,
          format: props.setting.time
        })
      );
    }
  }, []);

  useEffect(() => {
    let message = val;
    if (ready) {
      if (message) {
        switch (message.action) {
          case GameAction.Search: {
            handleSearch();
            break;
          }
          case GameAction.Expired_Token: {
            document.getElementById("logout").click();
            break;
          }
          case GameAction.Cancel_Search: {
            handleCancelSearch();
            messageRef.current.showMessage(
              message.message,
              NotificationTypeEnum.Info
            );
            break;
          }
          case GameAction.Game_Started: {
            setLoading(false);
            handleStart();
            props.setMultiplayer({
              multiplayertoken: message.payload.token,
              multiplayer_playas: message.payload.piece,
            });
            setGame(new Chess());
            break;
          }
          case GameAction.Opponent_Move: {
            makeAMove(message.payload.move);
            break;
          }
          case GameAction.Game_Over: {
            if (message.payload.draw) {
              try {
                makeAMove(message.payload.move);
              } catch (e) {
                console.log(e.message);
              }
            } else if (!message.payload.win) {
              makeAMove(message.payload.move);
            }
            props.setMultiplayer({
              multiplayertoken: null,
              multiplayer_playas: props.setting.multiplayer_playas,
            });
            setTimeout(() => {
              setOpen(true);
            }, 1000);
            setEndCondition(message.message);
            break;
          }
          case GameAction.Rejoin_Success: {
            let tempgame = new Chess(message.payload.fen);
            tempgame._history = message.payload.history;
            setGame(tempgame);
            handleStart();
            break;
          }
          case GameAction.Rejoin_Failure: {
            props.setMultiplayer({
              multiplayertoken: null,
              multiplayer_playas: "w",
            });
            messageRef.current.showMessage(
              message.message,
              NotificationTypeEnum.Error
            );
            break;
          }
          case GameAction.Opponent_Left: {
            setOpponentLeft(true);
            var timeout = setInterval(() => {
              timerRef.current = timerRef.current - 1;
              if (timerRef.current < 1) {
                timerRef.current = 15;
                clearInterval(timeout);
                send(
                  WSMessage(
                    GameAction.Opponent_Inactive,
                    "Opponent is inactive.",
                    {
                      format: props.setting.time
                    }
                  )
                );
              }
            }, 1000);
            break;
          }
          case GameAction.Opponent_Rejoin: {
            if (timeout) {
              timerRef.current = 15;
              clearInterval(timeout);
            }
            break;
          }
          case GameAction.Draw_Offered: {
            setDrawOffered(true);
            break;
          }
          case GameAction.Draw_Accepted: {
            break;
          }
          case GameAction.Draw_Rejected: {
            setDrawOffered(false);
            break;
          }
          case GameAction.Game_Clock: {
            setMyClock(message.payload.ownclock)
            setOpponentClock(message.payload.opponentclock)
          }
        }
      }
    }
  }, [val]);

  function makeAMove(move) {
    if (!start) {
      return null;
    }
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move(move);
      gameCopy._history = [...game._history, ...gameCopy._history];
      setGame(gameCopy);
      if (gameCopy.isGameOver()) {
        if (props.setting.multiplayer_playas != gameCopy.turn()) {
          /*****************Not required will be removed in the future*****************/
          let action = "",
            message = "";
          if (gameCopy.isCheckmate()) {
            action = GameAction.Is_CheckMate;
            message = "Checkmate";
          } else if (gameCopy.isStalemate()) {
            action = GameAction.Is_StaleMate;
            message = "Stalemate";
          } else if (gameCopy.isInsufficientMaterial()) {
            action = GameAction.Is_InsufficientMaterial;
            message = "Insufficient Material";
          } else if (gameCopy.isThreefoldRepetition()) {
            action = GameAction.Is_ThreeFold;
            message = "Threefold repetition";
          } else if (gameCopy.isDraw()) {
            action = GameAction.Is_Draw;
            message = "Draw";
          } else {
            action = GameAction.Is_Draw;
            message = "Draw";
          }
          send(
            WSMessage(GameAction.Move, message, {
              move: move,
              token: props.setting.multiplayertoken,
              id: props.user.id,
              format: props.setting.time
            })
          );
        }
        return null;
      }
      return result; // null if the move was illegal, the move object if the move was legal
    } catch (e) {
      return null;
    }
  }

  function onDrop(sourceSquare, targetSquare) {
    if (props.setting.multiplayer_playas == game.turn()) {
      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
      // illegal move
      if (move === null) return false;
      send(
        WSMessage(GameAction.Move, "Move", {
          move: {
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
          },
          token: props.setting.multiplayertoken,
          id: props.user.id,
          format: props.setting.time
        })
      );
      return true;
    } else {
      return false;
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleCancelSearch();
    setDrawOffered(false)
    setOpen(false);
  };

  const handleGameHistory = (games, as, gm) => {
    setGameHistory(true);
    let newGame = new Chess(games.finalPosition);
    newGame._history = games.history;
    setHistoryGame(newGame)
    setHistoryAs(as?'white': 'black');
    let message = ''
    if (gm.draw) {
      switch (gm.concludeby) {
        case GameAction.Is_StaleMate:{
        message = "Game drawn by stalemate.";
        break;
      } case GameAction.Is_InsufficientMaterial:{
        message = "Game drawn by insufficient material.";
        break;
      } case GameAction.Is_ThreeFold:{
        message = "Game drawn by threefold repetition";
        break;
      } case GameAction.Is_Draw:{
        message = "Game drawn";
        break
      } default: {
        message = "Game drawn";
        break;
      }
      }
    }
    else if (gm.winner) {
      message = "You won."
    }
    else {
      message = "You lost."
    }
    setEndCondition(message);

    setOpen(true);
  }

  const timeFormatter = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`
  }

  return (
    <Grid justifyContent={"space-around"} container className="container-main">
      <CustomSnackbar ref={messageRef} />
      <Grid className="multiplayer-chessboard" item lg={6} md={8} xs={12}>
        <Dialog open={open}>
          <DialogTitle>{endCondition}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgressBar color="inherit" />
          <Typography>Searching for opponent.</Typography>
        </Backdrop>

        <Grid style={{width: '100%',}} container justifyContent={'space-between'}>
          <Grid  item style={{display: 'flex', flexDirection: 'row'}}>
        <Avatar
              variant="square"
                alt={opponentInfo.username || "Opponent"}
                src="/static/images/avatar/1.jpg"
              />
              <Typography className="gameHistoryUsername">{opponentInfo.username || "Opponent"}</Typography>
              </Grid>
              <Grid className="game-clock-container">
              <Paper className="game-clock game-clock-opponent">
                {timeFormatter(opponentClock)}
                </Paper>
              </Grid>
        </Grid>
        {opponentLeft &&
          `Opponent left game will abort in ${timerRef.current} seconds if they dont rejoin.`}
        {
          gameHistory?
          <Chessboard
          style={{float: 'right'}}
          position={historyGame.fen()}
          onPieceDrop={onDrop}
          id="BasicBoard"
          boardOrientation={
            historyGame
          }
        />
          :
          <Chessboard
          style={{float: 'right'}}

          position={game.fen()}
          onPieceDrop={onDrop}
          id="BasicBoard"
          boardOrientation={
            props.setting.multiplayer_playas == "b" ? "black" : "white"
          }
        />}
        <Grid style={{width: '100%',}} container justifyContent={'space-between'}>
          <Grid  item style={{display: 'flex', flexDirection: 'row'}}>
        <Avatar
              variant="square"
                alt={props.user.username || "Opponent"}
                src="/static/images/avatar/1.jpg"
              />
              <Typography className="gameHistoryUsername">{props.user.username || "Opponent"}</Typography>
              </Grid>
              <Grid className="game-clock-container">
                <Paper className="game-clock game-clock-own">
                {timeFormatter(myClock)}
                </Paper>
              </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} xs={12}>
        <div className="container">
          {start ? (
            <GameSideoption drawOffered={drawOffered} />
          ) : search ? (
            <SearchSideoption />
          ) : (
            <Sideoption handleGameHistory={handleGameHistory} />
          )}
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.User,
  setting: state.setting,
});

const mapDispatchToProps = (dispatch) => ({
  setMultiplayer: (payload) => dispatch(setMultiplayer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MultiPlayer);
