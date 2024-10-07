import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Avatar, Grid, Typography } from "@mui/material";
import { Chess } from "chess.js";
import { connect } from "react-redux";
import ChessEngine from "./engineClass";
import { GameAction } from "../../../../Common/CommonEnum";
import GameoverModal from "../../../Common/GameoverModal";
import {
  setGameNotStarted,
  setGameOnGoing,
  setGameOver,
} from "../../../../Redux/Action/GameAction";

import bot from "../../../../Images/Bot.png";
import human from "../../../../Images/Human.png";
// import engineGame from "./engine";

function SinglePlayer(props) {
  const [Engine, setEngine] = useState(new ChessEngine(props.setting.playas));
  const [game, setGame] = useState(Engine.game);
  const [gameResult, setGameResult] = useState(null); // "win", "lose", or "draw"
  const [gameReason, setGameReason] = useState(null); // e.g., "Checkmate", "Timeout", "Resignation"

  useEffect(() => {
    setTimeout(() => setGame(Engine.GetCurrentPosition()), 1000);
  }, [game]);

  useEffect(() => {

    if (props.game.game_status == 1) {
      if (props.setting.playas == "b") {
        Engine.prepareMove();
        setTimeout(() => setGame(Engine.GetCurrentPosition()), 1000);
      }
    } else if (props.game.game_status == 0){
      Engine.game.reset()
      Engine.player = props.setting.playas
      // setGame(new Chess());
    }
    else {
      if (!Engine.game.isGameOver()) {
        setGameResult("lose");
        setGameReason('Resignation');
        props.setGameOver();
      }
        
    }
    // if (game.turn() !== playas) {
    //     if (difficulty == 1) {
    //         makeEasyMove();
    //     }
    //     else if (difficulty == 2) {
    //         makeMediumMove();
    //     }
    //     else if (difficulty == 3) {
    //         makeHardMove();
    //     }
    // }
    // console.log(game.history({verbose: true}))
  }, [props.game.game_status]);

  useEffect(() => {
    if (props.game.game_status == 1) {
      var message;
      console.log(Engine.game)
      if (Engine.game.isCheckmate()) {
        message = "Checkmate";
        if (Engine.game.turn() == props.setting.playas) {
          setGameResult("lose");
        } else {
          setGameResult("win");
        }
      } else if (Engine.game.isStalemate()) {
        message = "Stalemate";
        setGameResult("draw");
      } else if (Engine.game.isInsufficientMaterial()) {
        message = "Insufficient Material";
        setGameResult("draw");
      } else if (Engine.game.isThreefoldRepetition()) {
        message = "Threefold repetition";
        setGameResult("draw");
      } else if (Engine.game.isDraw()) {
        message = "Draw";
        setGameResult("draw");
      } else {
        message = "Draw";
        setGameResult("draw");
        props.setGameNotStarted()
      }
      setGameReason(message);
      props.setGameOver();
    }
    
  }, [Engine.game.isGameOver()]);

  function makeEasyMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function makeMediumMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function makeHardMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function makeAMove(move) {
    let gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    gameCopy._history = [...game._history, ...gameCopy._history];
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare, targetSquare) {
    console.log(props.game.game_status);
    if (props.game.game_status == 1) {
      Engine.onDrop(sourceSquare, targetSquare);
      setGame(Engine.GetCurrentPosition());
    }
  }

  function onRematch() {
    Engine.game.reset()
    Engine.player = props.setting.playas
    // setEngine(new ChessEngine(props.setting.playas));
    setGame(new Chess());
    props.setGameOnGoing();
  }

  function onNewGame() {
    Engine.game.reset()
    setGame(new Chess())
    props.setGameNotStarted();
  }

  return (
    <>
      {props.game.game_status == 2 && (
        <GameoverModal
          result={gameResult}
          reason={gameReason}
          opponent={"BOT"}
          onRematch={onRematch}
          onNewGame={onNewGame}
          onClose={onNewGame}
        />
      )}
      <Grid item style={{ display: "flex", flexDirection: "row" }}>
          <Avatar
            variant="square"
            alt={'Bot'}
            src={bot}
            style={{width: 70, height: 70}}
          />
          <Typography fontSize={'1.6em'} fontWeight={'bold'} className="gameHistoryUsername">
            {"Bot"}
          </Typography>
        </Grid>
      <Chessboard
        areArrowsAllowed
        position={game}
        onPieceDrop={onDrop}
        id="BasicBoard"
        boardOrientation={props.setting.playas == "b" ? "black" : "white"}
      />
      <Grid item style={{ display: "flex", flexDirection: "row" }}>
          <Avatar
            variant="square"
            alt={props.user.username.toUpperCase()}
            src={human}
            style={{width: 70, height: 70}}
          />
          <Typography fontSize={'1.6em'} fontWeight={'bold'} className="gameHistoryUsername">
            {props.user.username }
          </Typography>
        </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.User,
  setting: state.setting,
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  setGameNotStarted: () => dispatch(setGameNotStarted()),
  setGameOnGoing: () => dispatch(setGameOnGoing()),
  setGameOver: () => dispatch(setGameOver()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlayer);
