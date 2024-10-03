import { Avatar, Button, Grid, Icon, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { WebsocketContext } from "../../../../WebsocketContext";
import { connect } from "react-redux";
import bot from "../../../../../Images/Bot.png";
import human from "../../../../../Images/Human.png";

import DifficultySelector from "../Components/DifficultySelector";
import TimeSelector from "../Components/TimeSelector";
import PlayAsSelector from "../Components/PlayAsSelector";
import { setUserSetting } from "../../../../../Redux/Action/SettingsAction";
import { setGameOnGoing } from "../../../../../Redux/Action/GameAction";

function Itemone(props) {
  const [ready, val, send] = useContext(WebsocketContext);
  const [against, setAgainst] = useState(props.setting.against);

  const [time, setTime] = useState(props.setting.time);
  const [difficulty, setDifficulty] = useState(props.setting.difficulty);
  const [playas, setPlayas] = useState(props.setting.playas);

  const handleGameSearch = () => {
    if (against == 0) {
      props.setGameStarted()
    }
    else {
      send(
        JSON.stringify({
          action: "Search",
          payload: {
            token: props.user.token,
            id: props.user.id,
            username: props.user.username,
            format: props.setting.time,
          },
        })
      );
    }
  };

  const handleAgainstChange = (val) => {
    setAgainst(val);
    props.setSettings({
      against: val,
    });
  };

  const handleTimeChange = (val) => {
    setTime(val);
    props.setSettings({
      time: val,
    });
  };

  const handleDifficultyChange = (val) => {
    setDifficulty(val);
    props.setSettings({
      difficulty: val,
    });
  };

  const handlePlayasChange = (val) => {
    setPlayas(val);
    props.setSettings({
      playas: val,
    });
  };

  return (
    <Grid container>
      <Typography className="play-text">Play?</Typography>
      <div class="container2">
        <div
          onClick={() => handleAgainstChange(0)}
          style={{
            borderColor: `${against == 0 ? "#007BFF" : "#B0BEC5"}`,
            backgroundColor: `${against == 0 ? "#E3F2FD" : "#F5F5F5"}`,
          }}
          className="settingoptions"
        >
          <Avatar
            alt="Bot"
            variant="square"
            sx={{ width: 66, height: 66 }}
            src={bot}
          />
          <Typography variant="caption">Bot</Typography>
        </div>

        <div class="divider">
          <span>or</span>
        </div>

        <div
          onClick={() => handleAgainstChange(1)}
          style={{
            borderColor: `${against == 1 ? "#007BFF" : "#B0BEC5"}`,
            backgroundColor: `${against == 1 ? "#E3F2FD" : "#F5F5F5"}`,
          }}
          className="settingoptions"
        >
          <Avatar
            alt="Human"
            variant="square"
            sx={{ width: 66, height: 66 }}
            src={human}
          />
          <Typography variant="caption">Human</Typography>
        </div>
      </div>

      <Grid
        container
        style={{
          marginTop: 20,
          paddingBottom: 20,
          borderRadius: 10,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #B0BEC5",
        }}
        justifyContent="space-around"
        alignItems="center"
      >
        {against == 1 && (
          <TimeSelector time={time} handleTimeChange={handleTimeChange} />
        )}

        {against == 0 && (
          <>
            <DifficultySelector
              difficulty={difficulty}
              handleDifficultyChange={handleDifficultyChange}
            />

            <PlayAsSelector
              playas={playas}
              handlePlayasChange={handlePlayasChange}
            />
          </>
        )}
      </Grid>
      <Button
        onClick={handleGameSearch}
        className="btn-newgame"
        variant="contained"
      >
        New Game
      </Button>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.User,
  setting: state.setting,
});

const mapDispatchToProps = (dispatch) => ({
  setSettings: (setting) => dispatch(setUserSetting(setting)),
  setGameStarted: () => dispatch(setGameOnGoing())
})

export default connect(mapStateToProps, mapDispatchToProps)(Itemone);
