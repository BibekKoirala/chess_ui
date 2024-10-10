import React, { useEffect, useState } from "react";
import RequestHelper from "../../../../../Common/RequestHelper";
import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { connect } from "react-redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import GameHistoryList from "../../../../Common/GameHistoryList";

function Itemthree(props) {
  console.log(props)
  const [userGames, setUserGames] = useState([]);
  useEffect(() => {
    RequestHelper.Get("playergames", "", (res, success) => {
      if (success) {
        setUserGames(res.data.data);
      }
    });
  }, []);

  const handleSetHistory = (games) => {
    props.handleGameHistory(games.game, games.white, games)
  }

  return (
    <GameHistoryList />
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.User,
  };
};

export default connect(mapStateToProps)(Itemthree);
