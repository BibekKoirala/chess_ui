import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import bot from "../../../Images/Bot.png";
import human from "../../../Images/Human.png";
import black from "../../../Images/Black.png";
import white from "../../../Images/White.png";
import anycolor from "../../../Images/AnyColor.png";

import { green, red, yellow } from "@mui/material/colors";
import { setUserSetting } from "../../../Redux/Action/SettingsAction";
import { connect } from "react-redux";

function Settings(props) {
  const [against, setAgainst] = useState(props.setting.against);
  const [time, setTime] = useState(props.setting.time);
  const [difficulty, setDifficulty] = useState(props.setting.difficulty);
  const [playas, setPlayas] = useState(props.setting.playas);

  const handleAgainstChange = (val) => {
    setAgainst(val);
  };

  const handleTimeChange = (val) => {
    setTime(val);
  };

  const handleDifficultyChange = (val) => {
    setDifficulty(val);
  };

  const handlePlayasChange = (val) => {
    setPlayas(val);
  };

  const handleOnSave = () => {
    props.setSettings({
        against: against,
        time: time,
        difficulty: difficulty,
        playas: playas,
    })
  }

  return (
    <Grid textAlign={"center"} justifyContent={"center"} container>
      <Grid item lg={6} md={8} sm={12} xs={12}>
        <Paper className="settingPaper">
          <Typography style={{ marginBottom: 20 }} variant="h2">
            Configure Settings
          </Typography>
          <Grid alignItems={"center"} container>
            <Typography style={{ marginRight: 20 }} variant="h4">
              Play Against:{" "}
            </Typography>
            <div
              onClick={() => handleAgainstChange(1)}
              style={{
                borderColor: `${against == 1 ? "#00FFFF" : "gray"}`,
              }}
              className={"settingoptions"}
            >
              <Avatar
                alt="Bot"
                variant="square"
                sx={{ width: 66, height: 66 }}
                src={bot}
              />
              <Typography variant="caption">Bot</Typography>
            </div>
            <div
              onClick={() => handleAgainstChange(2)}
              style={{
                borderColor: `${against == 2 ? "#00FFFF" : "gray"}`,
              }}
              className={"settingoptions"}
            >
              <Avatar
                alt="Bot"
                variant="square"
                sx={{ width: 66, height: 66 }}
                src={human}
              />
              <Typography variant="caption">Human</Typography>
            </div>
          </Grid>
          <Grid
            flexDirection={"row"}
            alignItems={"center"}
            style={{ marginTop: 20 }}
            container
          >
            <Typography style={{ marginRight: 20 }} variant="h4">
              Time:{" "}
            </Typography>
            <Grid container>
              <Grid
                item
                onClick={() => handleTimeChange(1)}
                style={{
                  borderColor: `${time == 1 ? "#00FFFF" : "gray"}`,
                }}
                className={"settingoptions"}
                xs={3}
              >
                <Typography component={"span"} variant="h5">
                  1 min
                </Typography>
              </Grid>
              <Grid
                item
                onClick={() => handleTimeChange(2)}
                style={{
                  borderColor: `${time == 2 ? "#00FFFF" : "gray"}`,
                }}
                className={"settingoptions"}
                xs={3}
              >
                <Typography component={"span"} variant="h5">
                  2 min
                </Typography>
              </Grid>
              <Grid
                item
                onClick={() => handleTimeChange(5)}
                style={{
                  borderColor: `${time == 5 ? "#00FFFF" : "gray"}`,
                }}
                className={"settingoptions"}
                xs={3}
              >
                <Typography component={"span"} variant="h5">
                  5 min
                </Typography>
              </Grid>
            </Grid>
            <Grid marginTop={1} container>
              <Grid
                item
                onClick={() => handleTimeChange(10)}
                style={{
                  borderColor: `${time == 10 ? "#00FFFF" : "gray"}`,
                }}
                className={"settingoptions"}
                xs={3}
              >
                <Typography component={"span"} variant="h5">
                  10 min
                </Typography>
              </Grid>
              <Grid
                item
                onClick={() => handleTimeChange(15)}
                style={{
                  borderColor: `${time == 15 ? "#00FFFF" : "gray"}`,
                }}
                className={"settingoptions"}
                xs={3}
              >
                <Typography component={"span"} variant="h5">
                  15 min
                </Typography>
              </Grid>
              <Grid
                item
                onClick={() => handleTimeChange(30)}
                style={{
                  borderColor: `${time == 30 ? "#00FFFF" : "gray"}`,
                }}
                className={"settingoptions"}
                xs={3}
              >
                <Typography component={"span"} variant="h5">
                  30 min
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid alignItems={"center"} style={{ marginTop: 20 }} container>
            <Typography style={{ marginRight: 20 }} variant="h4">
              Difficulty:{" "}
            </Typography>
            <div
              onClick={() => handleDifficultyChange(1)}
              style={{
                borderColor: `${difficulty == 1 ? "#00FFFF" : "gray"}`,
              }}
              className={"settingoptions"}
            >
              <Avatar
                alt="Bot"
                variant="square"
                sx={{ width: 66, height: 66, backgroundColor: green[700] }}
              >
                E
              </Avatar>
              <Typography variant="caption">Easy</Typography>
            </div>
            <div
              onClick={() => handleDifficultyChange(2)}
              style={{
                borderColor: `${difficulty == 2 ? "#00FFFF" : "gray"}`,
              }}
              className={"settingoptions"}
            >
              <Avatar
                alt="Bot"
                variant="square"
                sx={{ width: 66, height: 66, backgroundColor: yellow[700] }}
              >
                M
              </Avatar>
              <Typography variant="caption">Medium</Typography>
            </div>
            <div
              onClick={() => handleDifficultyChange(3)}
              style={{
                borderColor: `${difficulty == 3 ? "#00FFFF" : "gray"}`,
              }}
              className={"settingoptions"}
            >
              <Avatar
                alt="Bot"
                variant="square"
                sx={{ width: 66, height: 66, backgroundColor: red[700] }}
              >
                H
              </Avatar>
              <Typography variant="caption">Hard</Typography>
            </div>
          </Grid>

          <Grid alignItems={"center"} style={{ marginTop: 20 }} container>
            <Typography style={{ marginRight: 20 }} variant="h4">
              Play As:{" "}
            </Typography>
            <div
              onClick={() => handlePlayasChange('b')}
              style={{
                borderColor: `${playas == 'b' ? "#00FFFF" : "gray"}`,
              }}
              className={"settingoptions"}
            >
              <Avatar
                alt="Bot"
                variant="square"
                sx={{ width: 66, height: 66 }}
                src={black}
              />
              <Typography variant="caption">Black</Typography>
            </div>

            <div
              onClick={() => handlePlayasChange('a')}
              style={{
                borderColor: `${playas == 'a' ? "#00FFFF" : "gray"}`,
              }}
              className={"settingoptions"}
            >
              <Avatar
                alt="Bot"
                variant="square"
                sx={{ width: 66, height: 66 }}
                src={anycolor}
              />
              <Typography variant="caption">Any</Typography>
            </div>

            <div
              onClick={() => handlePlayasChange('w')}
              style={{
                borderColor: `${playas == 'w' ? "#00FFFF" : "gray"}`,
              }}
              className={"settingoptions"}
            >
              <Avatar
                alt="Bot"
                variant="square"
                sx={{ width: 66, height: 66 }}
                src={white}
              />
              <Typography variant="caption">White</Typography>
            </div>
          </Grid>

          <Button color="primary" className="settingSave" onClick={handleOnSave} variant="contained">
            Save
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
    setting: state.setting
})

const mapDispatchToProps = (dispatch) => ({
    setSettings: (setting) => dispatch(setUserSetting(setting))
})


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
