import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { WebsocketContext } from "../../../../../WebsocketContext";
import { connect } from "react-redux";

function Itemone(props) {
  const [ready, val, send] = useContext(WebsocketContext);
  const [open, setOpen] = useState(false);

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
      <Button onClick={handleOpen} className="btn-newgame" variant="contained">
        Resign
      </Button>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.User,
  setting: state.setting,
});

export default connect(mapStateToProps)(Itemone);
