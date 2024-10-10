import React, { useEffect, useState } from "react";
import RequestHelper from "../../Common/RequestHelper";
import { Avatar, Divider, Grid, Typography, Box, Icon } from "@mui/material";
import { connect } from "react-redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import human from "../../Images/Human.png";
import "./css/GameHistoryList.css"; // Assuming we will use external CSS
import bulletsvg from "../../Images/bullet.svg";
import blitzsvg from "../../Images/blitz.svg";
import rapidsvg from "../../Images/rapid.svg";
import classicalsvg from "../../Images/classical.svg";
import { useNavigate } from "react-router-dom";

function GameHistoryList(props) {
  const [userGames, setUserGames] = useState([]);
  const navigate = useNavigate()
  const timeOptions = [
    { label: 'Bullet', icon: bulletsvg },
    { label: 'Blitz', icon: blitzsvg },
    { label: 'Rapid', icon: rapidsvg },
    { label: 'Classical', icon: classicalsvg },
  ];


  useEffect(() => {
    RequestHelper.Get("playergames", "", (res, success) => {
      if (success) {
        const sortedGames = res.data.data.sort((a, b) => new Date(b.game.createdon) - new Date(a.game.createdon));

        setUserGames(res.data.data);
        console.log(res.data.data)
      }
    });
  }, []);

  const handleSetHistory = (games) => {
    navigate('/gamehistory/:'+games._id)
  };

  return (
    <Grid container flexDirection="row" style={{
      borderRadius: '20px',
      maxHeight: '80vh', // Limit the height to viewport height
      overflowY: 'auto', // Enable vertical scrolling when content exceeds max height
    }} className="game-history-container">
      {userGames.map((games) => (
        <React.Fragment key={games._id}>
          <div
            width={'100%'}
            height={'100px'}
            alignItems="center"
            className="game-history-item"
            onClick={() => handleSetHistory(games)}
          >
            <Icon style={{ textAlign: "center", marginRight: 20 }}>
            <img style={{ height: "100%" }} src={timeOptions[Number(games.game.format)].icon} alt={timeOptions[Number(games.game.format)].label} />
          </Icon>

            {/* Avatar with opponent's username */}
            <Grid item>
              <Avatar
                variant="square"
                alt={games.opponent.username}
                src={human}
                className="opponent-avatar"
              />
            </Grid>
            <Grid item xs className="game-info">
              <Typography variant="h6" className="game-history-username">
                {games.opponent.username}
              </Typography>
            </Grid>
            {/* Display the result icon (win, lose, draw) */}
            <Grid item className="game-result">
              {games.draw ? (
                <Typography variant="h6" className="draw-result">-</Typography>
              ) : games.winner ? (
                <ArrowUpwardIcon className="win-icon" />
              ) : (
                <ArrowDownwardIcon className="lose-icon" />
              )}
            </Grid>
          </div>
        </React.Fragment>
      ))}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.User,
  };
};

export default connect(mapStateToProps)(GameHistoryList);
