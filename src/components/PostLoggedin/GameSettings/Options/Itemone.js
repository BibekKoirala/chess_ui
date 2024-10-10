import { Avatar, Button, Grid, Icon, Paper, Typography, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import RequestHelper from "../../../../Common/RequestHelper";
import CustomSnackbar from "../../../Common/Snackbar";
import Loader from "../../../Common/Loader";
import bot from "../../../../Images/Bot.png";
import human from "../../../../Images/Human.png";
import black from "../../../../Images/Black.png";
import white from "../../../../Images/White.png";
import anycolor from "../../../../Images/AnyColor.png";
import bulletsvg from "../../../../Images/bullet.svg";
import blitzsvg from "../../../../Images/blitz.svg";
import rapidsvg from "../../../../Images/rapid.svg";
import classicalsvg from "../../../../Images/classical.svg";
import { green, red, yellow, grey } from "@mui/material/colors";
import { NotificationTypeEnum } from "../../../../Common/CommonEnum";

function Itemone(props) {
  const [loading, setLoading] = useState(false);
  const [against, setAgainst] = useState(props.setting.against);
  const [time, setTime] = useState(props.setting.time);
  const [difficulty, setDifficulty] = useState(props.setting.difficulty);
  const [playas, setPlayas] = useState(props.setting.playas);
  const messageRef = useRef();

  const handleDifficultyChange = (val) => {
    setDifficulty(val);
  };

  const handlePlayasChange = (val) => {
    setPlayas(val);
  };

  useEffect(() => {
    setLoading(true);
    RequestHelper.Get("setting", "", (res, success) => {
      setLoading(false);
      if (success) {
        let { against, format, difficulty, playas } = res.data.data;
        props.setSettings({
          against: against,
          time: format,
          difficulty: difficulty,
          playas: playas,
        });
        setAgainst(against);
        setDifficulty(difficulty);
        setTime(format);
        setPlayas(playas);
      } else {
        messageRef.current.showMessage(res.data.message, NotificationTypeEnum.Error);
      }
    });
  }, []);

  const handleOnSave = () => {
    setLoading(true);
    RequestHelper.Post(
      "setting",
      {
        against: against,
        format: time,
        difficulty: difficulty,
        playas: playas,
      },
      (res, success) => {
        setLoading(false);
        if (success) {
          props.setSettings({
            against: against,
            time: time,
            difficulty: difficulty,
            playas: playas,
          });
          messageRef.current.showMessage(res.data.message, NotificationTypeEnum.Success);
        } else {
          messageRef.current.showMessage(res.data.message, NotificationTypeEnum.Error);
        }
      }
    );
  };

  const handleAgainstChange = (val) => {
    setAgainst(val);
  };

  const handleTimeChange = (val) => {
    setTime(val);
  };

  return (
    <Box p={3}>
      <Grid container direction="column" spacing={4}>
        {/* Play Against */}
        <Grid item>
          
          <Grid container spacing={3}>
            <Grid item>
              <Paper
                onClick={() => handleAgainstChange(0)}
                sx={{
                  padding: 2,
                  borderColor: against === 0 ? "#00FFFF" : grey[300],
                  backgroundColor: against === 0 ? "#00FFFF" : grey[100],
                  '&:hover': { borderColor: "#00FFFF", cursor: "pointer" },
                }}
              >
                <Avatar alt="Bot" variant="square" src={bot} sx={{ width: 66, height: 66 }} />
                <Typography align="center" variant="caption">
                  Bot
                </Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                onClick={() => handleAgainstChange(1)}
                sx={{
                  padding: 2,
                  borderColor: against === 1 ? "#00FFFF" : grey[300],
                  backgroundColor: against === 1 ? "#00FFFF" : grey[100],
                  '&:hover': { borderColor: "#00FFFF", cursor: "pointer" },
                }}
              >
                <Avatar alt="Human" variant="square" src={human} sx={{ width: 66, height: 66 }} />
                <Typography align="center" variant="caption">
                  Human
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Time */}
        <Grid item>
          
          <Grid container spacing={3}>
            {[bulletsvg, blitzsvg, rapidsvg, classicalsvg].map((timeFormat, index) => (
              <Grid item xs={6} key={index}>
                <Paper
                  onClick={() => handleTimeChange(index)}
                  sx={{
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                    borderColor: time === index ? "#00FFFF" : grey[300],
                    backgroundColor: time === index ? "#00FFFF" : grey[100],
                    '&:hover': { borderColor: "#00FFFF", cursor: "pointer" },
                  }}
                >
                  <Icon sx={{ textAlign: "center" }}>
                    <img style={{ height: "100%" }} src={timeFormat} alt="Time Format" />
                  </Icon>
                  <Typography variant="h5" sx={{ marginLeft: 2 }}>
                    {["Bullet", "Blitz", "Rapid", "Classical"][index]}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Difficulty */}
        <Grid item>
          
          <Grid container spacing={3}>
            {[{ label: "Easy", color: green[700] }, { label: "Medium", color: yellow[700] }, { label: "Hard", color: red[700] }].map((level, index) => (
              <Grid item key={index}>
                <Paper
                  onClick={() => handleDifficultyChange(index)}
                  sx={{
                    padding: 2,
                    borderColor: difficulty === index ? "#00FFFF" : grey[300],
                    backgroundColor: difficulty === index ? "#00FFFF" : grey[100],
                    '&:hover': { borderColor: "#00FFFF", cursor: "pointer" },
                  }}
                >
                  <Avatar alt={level.label} variant="square" sx={{ width: 66, height: 66, backgroundColor: level.color }}>
                    {level.label.charAt(0)}
                  </Avatar>
                  <Typography align="center" variant="caption">
                    {level.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Play As */}
        <Grid item>
          
          <Grid container spacing={3}>
            {[{ color: "b", label: "Black", img: black }, { color: "a", label: "Any", img: anycolor }, { color: "w", label: "White", img: white }].map((colorOption) => (
              <Grid item key={colorOption.color}>
                <Paper
                  onClick={() => handlePlayasChange(colorOption.color)}
                  sx={{
                    padding: 2,
                    borderColor: playas === colorOption.color ? "#00FFFF" : grey[300],
                    backgroundColor: playas === colorOption.color ? "#00FFFF" : grey[100],
                    '&:hover': { borderColor: "#00FFFF", cursor: "pointer" },
                  }}
                >
                  <Avatar alt={colorOption.label} variant="square" src={colorOption.img} sx={{ width: 66, height: 66 }} />
                  <Typography align="center" variant="caption">
                    {colorOption.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Save Button */}
        <Grid item>
          <Button
            color="primary"
            onClick={handleOnSave}
            variant="contained"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      <CustomSnackbar ref={messageRef} />
      <Loader loading={loading} />
    </Box>
  );
}

export default Itemone;
