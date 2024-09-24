import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Grid } from "@mui/material";
import { Chess } from "chess.js";
import { connect } from "react-redux";
import ChessEngine from "./engineClass";
// import engineGame from "./engine";

var Engine = new ChessEngine("w");
function SinglePlayer(props) {
  const [game, setGame] = useState(Engine.GetCurrentPosition());
  const { difficulty, playas } = props.setting;

  useEffect(() => {
    //const engine = engineGame();
    //engine.start();
    //engine.setPlayerColor('black');
  }, []);

  useEffect(() => {
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
  }, [Engine.GetCurrentPosition()]);

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
    Engine.onDrop(sourceSquare, targetSquare);
    setGame(Engine.GetCurrentPosition());
  }

  console.log(game);
  return (
    <Grid justifyContent={"center"} container className="container-main">
      <Grid className="login-chessboard" item lg={6} md={8} xs={12}>
        <Chessboard
          areArrowsAllowed
          position={Engine.GetCurrentPosition()}
          onPieceDrop={onDrop}
          id="BasicBoard"
          boardOrientation={props.setting.playas == "b" ? "black" : "white"}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  setting: state.setting,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlayer);
