import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Grid } from "@mui/material";
import { Chess } from 'chess.js';
import { connect } from "react-redux";
import SinglePlayer from "./SinglePlayer/SinglePlayer";
import MultiPlayer from "./MultiPlayer/MultiPlayer";

function Game(props) {
    const [game, setGame] = useState(new Chess());

    useEffect(()=>{
        if (game.turn() == 'b') {
            const possibleMoves = game.moves();
            if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return; // exit if the game is over
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            makeAMove(possibleMoves[randomIndex]);
        }
    }, [game])

  function makeAMove(move) {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }


  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    return true;
  }

  return (
    props.setting.against == 0?<SinglePlayer />:<MultiPlayer />
  );
}

const mapStateToProps = (state) => ({
  setting: state.setting
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
