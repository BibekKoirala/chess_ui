import { Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import { WebsocketContext } from "../../../../../WebsocketContext";
import { connect } from "react-redux";

function Itemone(props) {
  const [ready, val, send] = useContext(WebsocketContext);

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

  return (
    <Grid container>
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

export default connect(mapStateToProps)(Itemone);
