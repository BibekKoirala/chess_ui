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
import { WebsocketContext } from "../../../../../WebsocketContext";
import { connect } from "react-redux";
import { GameAction } from "../../../../../../Common/CommonEnum";

function Itemone(props) {
  const [ready, val, send] = useContext(WebsocketContext);
  const [open, setOpen] = useState(false);
  const [drawOfferedBy, setDrawOffered] = useState(false);

  const handleGameSearch = () => {
    send(
      JSON.stringify({
        action: "Search",
        payload: {
          token: props.user.token,
          id: props.user.id,
          username: props.user.username,
        },
      })
    );
  };

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
        },
      })
    );
    setDrawOffered(false);
  }

  const handleAccept = () => {
    send(
      JSON.stringify({
        action: GameAction.Draw_Accepted,
        payload: {
          token: props.user.token,
          id: props.user.id,
          username: props.user.username,
        },
      })
    );
    setDrawOffered(false);
  }

  useEffect(()=>{
    if (!props.drawOffered) {
      setDrawOffered(false);
    }
  },[props.drawOffered])

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
    <Grid container>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to resign this game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={handleOpen}
        color="error"
        className="btn-newgame resign-btn"
        variant="contained"
      >
        Resign
      </Button>
      {props.drawOffered ? (
        <Grid container>
          <Typography textAlign={'center'} style={{width: '100%', marginTop: '20px'}}component={"div"}>Draw Offered?</Typography>
          <Grid container flexDirection={"row"} justifyContent={"space-around"}>
          <Button
          onClick={handleAccept}
          color="inherit"
          className="btn-newgame btn-draw"
          variant="contained"
        >
          Accept
        </Button>
        <Button
          onClick={handleSendDrawOfferRevoke}
          color="inherit"
          className="btn-newgame btn-draw"
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
          className="btn-newgame"
          variant="contained"
        >
          Draw Offer
        </Button>
      ) : (
        <Button
          onClick={handleSendDrawOfferRevoke}
          color="inherit"
          className="btn-newgame"
          variant="contained"
        >
          Revoke Draw Offer
        </Button>
      )}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.User,
  setting: state.setting,
});

export default connect(mapStateToProps)(Itemone);
