import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Grid } from "@mui/material";
import { Chess } from "chess.js";
import { connect } from "react-redux";
import ChessEngine from "./engineClass";
import { GameAction } from "../../../../Common/CommonEnum";
// import engineGame from "./engine";

function SinglePlayer(props) {
  const [Engine, setEngine] = useState(new ChessEngine(props.setting.playas))
  const [game, setGame] = useState();
  const { difficulty, playas } = props.setting;

  useEffect(() => {
    console.log(Engine.get_moves())
    // Engine.OnEngineMessage({data: 'Make'})
    setTimeout(()=> setGame(Engine.GetCurrentPosition()), 1000)
  }, [game]);

  useEffect(() => {
    console.log(props.game)
    if (props.game.game_status == 1) {
      if (props.setting.playas == 'b') {
        Engine.prepareMove()
    setTimeout(()=> setGame(Engine.GetCurrentPosition()), 1000)

      }
    }
    else {
      setEngine(new ChessEngine(props.setting.playas))
      setGame(new Chess())
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

  useEffect(()=>{
    var action, message;
    if (Engine.game.turn() == props.setting.playas) {
      console.log("You lost")
    }
    if (Engine.game.isCheckmate()) {
      action = GameAction.Is_CheckMate;
      message = "Checkmate";
    } else if (Engine.game.isStalemate()) {
      action = GameAction.Is_StaleMate;
      message = "Stalemate";
    } else if (Engine.game.isInsufficientMaterial()) {
      action = GameAction.Is_InsufficientMaterial;
      message = "Insufficient Material";
    } else if (Engine.game.isThreefoldRepetition()) {
      action = GameAction.Is_ThreeFold;
      message = "Threefold repetition";
    } else if (Engine.game.isDraw()) {
      action = GameAction.Is_Draw;
      message = "Draw";
    } else {
      action = GameAction.Is_Draw;
      message = "Draw";
    }
  }, [Engine.game.isGameOver()])

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
    console.log(props.game.game_status)
    if (props.game.game_status == 1) {
      Engine.onDrop(sourceSquare, targetSquare);
      setGame(Engine.GetCurrentPosition());
    }
   
  }

  return (

        <Chessboard
          areArrowsAllowed
          position={game}
          onPieceDrop={onDrop}
          id="BasicBoard"
          boardOrientation={props.setting.playas == "b" ? "black" : "white"}
        />


  );
}

const mapStateToProps = (state) => ({
  setting: state.setting,
  game: state.game
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlayer);
