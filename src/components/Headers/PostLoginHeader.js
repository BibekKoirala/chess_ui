import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Remove_UserInfo } from "../../Redux/Action/UserAction";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import BarChartIcon from '@mui/icons-material/BarChart';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

function PostLoginHeader(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <Grid style={{ width: "100%" }} container>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Hi {props?.user?.username},
            </Typography>
            <Button onClick={props.logout} color="inherit">
              Logout
            </Button>
          </Grid>
          <Grid className={"navitemcontainer"} container>
            <Grid className={"navitem"} item>
              <Link to="/setting" replace>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                  SETTING <Settings sx={{ height: 30, width: 30 }} />
                </Typography>
              </Link>
            </Grid>
            <Grid className={"navitem"} item>
              <Link to="/game">
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                  GAME <PlayCircleFilledWhiteIcon sx={{ height: 30, width: 30 }} />
                </Typography>
              </Link>
            </Grid>
            <Grid className={"navitem"} item>
              <Link to="/stats">
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                  STATS <BarChartIcon sx={{ height: 30, width: 30 }} />
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.User,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({ type: Remove_UserInfo }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostLoginHeader);
