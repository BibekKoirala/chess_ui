import React, { useEffect, useState } from "react";
import RequestHelper from "../../../../../Common/RequestHelper";
import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { connect } from "react-redux";
import AddBoxIcon from '@mui/icons-material/AddBox';

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
    <Grid container flexDirection={'column'}>
      {userGames.map((games) => {
        
          return (
            <>
            <Grid onClick={()=>handleSetHistory(games)} className="gameHistoryItem" key={games._id}>
              <Avatar
              variant="square"
                alt={games.opponent.username}
                src="/static/images/avatar/1.jpg"
              />
              <Typography className="gameHistoryUsername">{games.opponent.username}</Typography>
              {
                games.draw ?(<AddBoxIcon />):(games.winner ?("win"):("lose"))
              }
            </Grid>
            <Divider />
            </>
          );
        } 
        
        )}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.User,
  };
};

export default connect(mapStateToProps)(Itemthree);
