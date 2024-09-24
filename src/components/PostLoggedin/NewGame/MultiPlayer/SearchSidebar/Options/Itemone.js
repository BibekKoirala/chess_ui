import { Button, CircularProgress, Grid } from "@mui/material";
import React, { useContext } from "react";
import { WebsocketContext } from "../../../../../WebsocketContext";
import { connect } from "react-redux";

function Itemone(props) {
  const [ready, val, send] = useContext(WebsocketContext);

  const handleGameSearch = () => {
    send(
      JSON.stringify({
        action: "Cancel_Search",
        payload: { id: props.user.id },
      })
    );
  };

  return (
    <Grid flexDirection={"column"} alignItems={"center"} container>
      <CircularProgress />
      Searching for opponent.
      <Button
        onClick={handleGameSearch}
        className="btn-newgame"
        color="error"
        variant="contained"
      >
        Cancel
      </Button>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.User,
  setting: state.setting,
});

export default connect(mapStateToProps)(Itemone);
