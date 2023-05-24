import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Backdrop, Grid, Typography } from "@mui/material";
import { Chess } from "chess.js";
import { connect } from "react-redux";
import { BaseUrl } from "../../../../ServerSetting";
import { GameAction } from "../../../../Common/CommonEnum";
import { setMultiplayer } from "../../../../Redux/Action/SettingsAction";
import CircularProgressBar from "@mui/material/CircularProgress";

function MultiPlayer(props) {
  const [game, setGame] = useState(new Chess());
  const [ws, setWs] = useState(null);
  const [loading, setLoading] = useState(true);

  const WSMessage = (action, message, payload) => {
    return payload
      ? JSON.stringify({ action: action, message: message, payload: payload })
      : JSON.stringify({ action: action, message: message });
  };

  useEffect(() => {
    const wstemp = new WebSocket(`${BaseUrl.replace("http", "ws")}`);
    setWs(wstemp);
  }, []);

  if (ws) {
    ws.onopen = (e) => {
      ws.send(
        JSON.stringify({
          action: "Search",
          payload: { token: props.user.token, id: props.user.id },
        })
      );
    };

    ws.onmessage = (message) => {
      try {
        message = JSON.parse(message.data);
        switch (message.action) {
          case GameAction.Expired_Token: {
            document.getElementById("logout").click();
            break;
          }
          case GameAction.Game_Started: {
            setLoading(false);
            props.setMultiplayer({
              multiplayertoken: message.payload.token,
              multiplayer_playas: message.payload.piece,
            });
            break;
          }
          case GameAction.Opponent_Move: {
            makeAMove(message.payload.move);
            break;
          }
          case GameAction.Joined: {
            break;
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    ws.onclose = (e) => {
      console.log("Closed");
    };
  }

  function makeAMove(move) {
    console.log(game.fen(), move, game.turn());
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    gameCopy._history = [... game._history, ...gameCopy._history]
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare, targetSquare) {
    if (game.isThreefoldRepetition()) {
      alert('Three Fold repetation.')
    }
    if (props.setting.multiplayer_playas == game.turn()) {
      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
      // illegal move
      if (move === null) return false;
      ws.send(
        WSMessage(GameAction.Move, "Move", {
          move: {
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
          },
          token: props.setting.multiplayertoken,
          id: props.user.id,
        })
      );
      return true;
    } else {
      return false;
    }
  }

  return (
    <Grid justifyContent={"center"} container>
      <Grid className="login-chessboard" item lg={6} md={8} xs={12}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgressBar color="inherit" />
          <Typography>Searching for opponent.</Typography>
        </Backdrop>
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          id="BasicBoard"
        />
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
