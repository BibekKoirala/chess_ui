import { Avatar, Button, Grid, Icon, SvgIcon, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import RequestHelper from "../../../../Common/RequestHelper"
import CustomSnackbar from "../../../Common/Snackbar";

import bot from "../../../../Images/Bot.png";
import human from "../../../../Images/Human.png";
import black from "../../../../Images/Black.png";
import white from "../../../../Images/White.png";
import anycolor from "../../../../Images/AnyColor.png";
import bulletsvg from "../../../../Images/bullet.svg";
import blitzsvg from "../../../../Images/blitz.svg";
import rapidsvg from "../../../../Images/rapid.svg"
import classicalsvg from "../../../../Images/classical.svg"

import { green, red, yellow } from "@mui/material/colors";
import { NotificationTypeEnum } from "../../../../Common/CommonEnum";
import Loader from "../../../Common/Loader";

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

  useEffect(()=>{
    setLoading(true);
    RequestHelper.Get('setting', '', (res, success) => {
          setLoading(false);
          if (success) {
           let {against, format, difficulty, playas} = res.data.data
              props.setSettings({
                  against: against,
                  time: format,
                  difficulty: difficulty,
                  playas: playas,
                });
                setAgainst(against);
                setDifficulty(difficulty);
                setTime(format);
                setPlayas(playas)
              //messageRef.current.showMessage(res.data.message, NotificationTypeEnum.Success);
          }
          else{
              messageRef.current.showMessage(res.data.message, NotificationTypeEnum.Error);
          }
      })
  }, [])

  const handleOnSave = () => {
    setLoading(true);
    RequestHelper.Post('setting', {
      against: against,
      format: time,
      difficulty: difficulty,
      playas: playas, 
    }, (res, success) => {
        setLoading(false);
        if (success) {
            props.setSettings({
                against: against,
                time: time,
                difficulty: difficulty,
                playas: playas,
              });
            messageRef.current.showMessage(res.data.message, NotificationTypeEnum.Success);
        }
        else{
            messageRef.current.showMessage(res.data.message, NotificationTypeEnum.Error);
        }
    })
  };

  const handleAgainstChange = (val) => {
    setAgainst(val);
  };

  const handleTimeChange = (val) => {
    setTime(val);
  };

  return (
    <>
      <Grid alignItems={"center"} container>
        <Typography style={{ marginRight: 20 }} variant="h4">
          Play Against:{" "}
        </Typography>
        <div
          onClick={() => handleAgainstChange(0)}
          style={{
            borderColor: `${against == 0 ? "#00FFFF" : "gray"}`,
            backgroundColor: `${against == 0 ? "#00FFFF" : "gray"}`,
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
          onClick={() => handleAgainstChange(1)}
          style={{
            borderColor: `${against == 1 ? "#00FFFF" : "gray"}`,
            backgroundColor: `${against == 1 ? "#00FFFF" : "gray"}`,
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
        <CustomSnackbar ref={messageRef} />
        <Loader loading={loading} />
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
            onClick={() => handleTimeChange(0)}
            style={{
              borderColor: `${time == 0 ? "#00FFFF" : "gray"}`,
              backgroundColor: `${time == 0 ? "#00FFFF" : "gray"}`,
            }}
            className={"settingoptions timesetting"}
            xs={5}
          >
            <Icon style={{ textAlign: "center" }}>
              <img style={{ height: "100%" }} src={bulletsvg} />
            </Icon> &nbsp; &nbsp; 
            <Typography component={"span"} variant="h5">
             Bullet
            </Typography>
          </Grid>
          <Grid
            item
            onClick={() => handleTimeChange(1)}
            style={{
              borderColor: `${time == 1 ? "#00FFFF" : "gray"}`,
              backgroundColor: `${time == 1 ? "#00FFFF" : "gray"}`,
            }}
            className={"settingoptions timesetting"}
            xs={5}
          >
            <Icon style={{ textAlign: "center" }}>
                <img style={{ height: "100%" }} src={blitzsvg} />
              </Icon> &nbsp; &nbsp;
            <Typography component={"span"} variant="h5">
              Blitz
            </Typography>
          </Grid>
          <Grid
            item
            onClick={() => handleTimeChange(2)}
            style={{
              borderColor: `${time == 2 ? "#00FFFF" : "gray"}`,
              backgroundColor: `${time == 2 ? "#00FFFF" : "gray"}`,
            }}
            className={"settingoptions timesetting"}
            xs={5}
          >
            <Icon style={{ textAlign: "center" }}>
              <img style={{ height: "100%" }} src={rapidsvg} />
            </Icon>&nbsp; &nbsp;
            <Typography component={"span"} variant="h5">
             Rapid
            </Typography>
          </Grid>

          <Grid
            item
            onClick={() => handleTimeChange(3)}
            style={{
              borderColor: `${time == 3 ? "#00FFFF" : "gray"}`,
              backgroundColor: `${time == 3 ? "#00FFFF" : "gray"}`,
            }}
            className={"settingoptions timesetting"}
            xs={5}
          >
            <Icon style={{ textAlign: "center" }}>
              <img style={{ height: "100%" }} src={classicalsvg} />
            </Icon>&nbsp; &nbsp;
            <Typography component={"span"} variant="h5">
             Classical
            </Typography>
          </Grid>
        </Grid>
        
      </Grid>

      <Grid alignItems={"center"} style={{ marginTop: 20 }} container>
        <Typography style={{ marginRight: 20 }} variant="h4">
          Difficulty:{" "}
        </Typography>
        <div
          onClick={() => handleDifficultyChange(0)}
          style={{
            borderColor: `${difficulty == 0 ? "#00FFFF" : "gray"}`,
            backgroundColor: `${difficulty == 0 ? "#00FFFF" : "gray"}`,
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
          onClick={() => handleDifficultyChange(1)}
          style={{
            borderColor: `${difficulty == 1 ? "#00FFFF" : "gray"}`,
            backgroundColor: `${difficulty == 1 ? "#00FFFF" : "gray"}`,
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
          onClick={() => handleDifficultyChange(2)}
          style={{
            borderColor: `${difficulty == 2 ? "#00FFFF" : "gray"}`,
            backgroundColor: `${difficulty == 2 ? "#00FFFF" : "gray"}`,
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
          onClick={() => handlePlayasChange("b")}
          style={{
            borderColor: `${playas == "b" ? "#00FFFF" : "gray"}`,
            backgroundColor: `${playas == "b" ? "#00FFFF" : "gray"}`,
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
          onClick={() => handlePlayasChange("a")}
          style={{
            borderColor: `${playas == "a" ? "#00FFFF" : "gray"}`,
            backgroundColor: `${playas == "a" ? "#00FFFF" : "gray"}`,
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
          onClick={() => handlePlayasChange("w")}
          style={{
            borderColor: `${playas == "w" ? "#00FFFF" : "gray"}`,
            backgroundColor: `${playas == "w" ? "#00FFFF" : "gray"}`,
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

      <Button
        color="primary"
        className="settingSave"
        onClick={handleOnSave}
        variant="contained"
      >
        Save
      </Button>
    </>
  );
}

export default Itemone;
