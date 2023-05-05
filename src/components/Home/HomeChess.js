import React from "react";
import { Chessboard } from "react-chessboard";
import { Grid } from "@mui/material";

function HomeChess() {
  return (
    <Grid container>
      <Grid className="login-chessboard" item xs={12}>
        <Chessboard id="BasicBoard" />
      </Grid>
      <Grid item xs={12}>
        Play with Friends
      </Grid>
    </Grid>
  );
}

export default HomeChess;
