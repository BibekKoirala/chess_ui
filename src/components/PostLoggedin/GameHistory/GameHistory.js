import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { Chess } from "chess.js";
import { useParams } from "react-router-dom";
import RequestHelper from "../../../Common/RequestHelper";
import bot from "../../../Images/Bot.png";
import human from "../../../Images/Human.png";
import { connect } from "react-redux";

function GameHistory(props) {
  const [game, setGame] = useState(new Chess());
  const [gameData, setGameData] = useState({});
  const params = useParams();
  useEffect(() => {
    RequestHelper.Get(`playergames/${params.gameid}`, "", (res, success) => {
      if (success) {
        setGameData(res.data.data);
        let chess = new Chess(res?.data?.data?.game?.finalPosition)
        chess._history = res?.data?.data?.game?.history
        setGame(chess)
      }
    });
  }, []);

  function back() {
    console.log('sad')
        console.log(game.pgn())
        game.undo()
        console.log(game.history())

  }

  function forward() {

  }

  return (
    <Grid container justifyContent={'space-around'} className="container-main">
        <Grid item lg={6} md={12} xs={12}>
            <Button onClick={back}>Undo</Button>
      <Grid item  style={{ display: "flex", flexDirection: "row" }}>
        <Avatar
          variant="square"
          alt={"Bot"}
          src={bot}
          style={{ width: 70, height: 70 }}
        />
        <Typography
          fontSize={"1.6em"}
          fontWeight={"bold"}
          className="gameHistoryUsername"
        >
          {"Bot"}
        </Typography>
      </Grid>
      <Chessboard
        areArrowsAllowed
        position={game.fen()}
        id="BasicBoard"
        boardOrientation={gameData?.white ? 'white': 'black'}
      />
      <Grid item style={{ display: "flex", flexDirection: "row" }}>
        <Avatar
          variant="square"
          alt={props.user.username.toUpperCase()}
          src={human}
          style={{ width: 70, height: 70 }}
        />
        <Typography
          fontSize={"1.6em"}
          fontWeight={"bold"}
          className="gameHistoryUsername"
        >
          {props.user.username}
        </Typography>
      </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.User,
  };
};

export default connect(mapStateToProps)(GameHistory);
