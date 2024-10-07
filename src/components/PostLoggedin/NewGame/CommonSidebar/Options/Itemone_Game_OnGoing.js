import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    Typography,
  } from "@mui/material";
  import React, { useContext, useEffect, useState } from "react";
  import { WebsocketContext } from "../../../../WebsocketContext";
  import { connect } from "react-redux";
  import { GameAction } from "../../../../../Common/CommonEnum";
import { setGameNotStarted, setGameOver } from "../../../../../Redux/Action/GameAction";
  
  function Itemone(props) {
    const [ready, val, send] = useContext(WebsocketContext);
    const [open, setOpen] = useState(false);
    const [drawOfferedBy, setDrawOffered] = useState(false);

  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleSendDrawOffer = () => {
      send(
        JSON.stringify({
          action: GameAction.Draw_Offered,
          payload: {
            token: props.user.token,
            id: props.user.id,
            username: props.user.username,
            format: props.setting.time,
          },
        })
      );
      setDrawOffered(true);
    };
  
    const handleSendDrawOfferRevoke = () => {
      send(
        JSON.stringify({
          action: GameAction.Draw_Rejected,
          payload: {
            token: props.user.token,
            id: props.user.id,
            username: props.user.username,
            format: props.setting.time,
          },
        })
      );
      setDrawOffered(false);
    };
  
    const handleResign = () => {
        if (props.setting.against == 0) {
            props.setGameOver()
        }
        else{
            send(
                JSON.stringify({
                  action: GameAction.Game_Resign,
                  payload: {
                    format: props.setting.time,
                  },
                })
              );
        }
      
    };
  
    const handleAccept = () => {
      send(
        JSON.stringify({
          action: GameAction.Draw_Accepted,
          payload: {
            token: props.user.token,
            id: props.user.id,
            username: props.user.username,
            format: props.setting.time,
          },
        })
      );
      setDrawOffered(false);
    };
  
    useEffect(() => {
      if (!props.drawOffered) {
        setDrawOffered(false);
      }
    }, [props.drawOffered]);
  
    useEffect(() => {
      let message = val;
      if (ready) {
        if (message) {
          switch (message.action) {
            case GameAction.Draw_Accepted: {
              break;
            }
            case GameAction.Draw_Rejected: {
              setDrawOffered(false);
              break;
            }
          }
        }
      }
    }, [val]);
  
    return (
      <Grid container className="action-buttons">
        <Dialog open={open}>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to resign this game?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleResign}>Yes</Button>
          </DialogActions>
        </Dialog>
  
        <Button
          onClick={handleOpen}
          color="error"
          className="action-button resign"
          variant="contained"
        >
          Resign
        </Button>
        
        {
            props.setting.against == 1 && (props.drawOffered ? (
                <Grid container className="draw-offer-container">
                  <Typography
                    textAlign={"center"}
                    style={{ width: "100%", marginTop: "20px" }}
                    component={"div"}
                  >
                    Draw Offered?
                  </Typography>
                  <Grid container flexDirection={"row"} justifyContent={"space-around"}>
                    <Button
                      onClick={handleAccept}
                      color="inherit"
                      className="action-button btn-draw"
                      variant="contained"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={handleSendDrawOfferRevoke}
                      color="inherit"
                      className="action-button btn-draw"
                      variant="contained"
                    >
                      Reject
                    </Button>
                  </Grid>
                </Grid>
              ) : !drawOfferedBy ? (
                <Button
                  onClick={handleSendDrawOffer}
                  color="inherit"
                  className="action-button"
                  variant="contained"
                >
                  Draw Offer
                </Button>
              ) : (
                <Button
                  onClick={handleSendDrawOfferRevoke}
                  color="inherit"
                  className="action-button"
                  variant="contained"
                >
                  Revoke Draw Offer
                </Button>
              ))
        }
        
      </Grid>
    );
  }
  
  const mapStateToProps = (state) => ({
    user: state.User,
    setting: state.setting,
  });

 
const mapDispatchToProps = (dispatch) => ({
    setGameNotStarted: () => dispatch(setGameNotStarted()),
    setGameOver: () => dispatch(setGameOver())
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Itemone);
  