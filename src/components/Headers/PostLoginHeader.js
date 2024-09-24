import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import playicon from "../../Images/playicon.svg";
import competitionIcon from "../../Images/competition-cup.svg";

import { Icon, SvgIcon } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { removeUserInfo } from "../../Redux/Action/UserAction";
import { removeUserSetting } from "../../Redux/Action/SettingsAction";
import { connect } from "react-redux";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to={"/game"} style={{ width: "100%", color: "black" }}>
            <ListItemButton>
              <ListItemIcon>
                <Icon style={{ textAlign: "center" }}>
                  <img style={{ height: "100%" }} src={playicon} />
                </Icon>
              </ListItemIcon>
              <ListItemText primary={"Play"} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link to={"/setting"} style={{ width: "100%", color: "black" }}>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link to={"/stats"} style={{ width: "100%", color: "black" }}>
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={"Stats"} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Social"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon style={{ textAlign: "center" }}>
                <img style={{ height: "100%" }} src={competitionIcon} />
              </Icon>
            </ListItemIcon>
            <ListItemText primary={"Tournament"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem id={"logout"} onClick={props.logout} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Log Out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="nav-bar"
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { md: "none" },
        }}
      >
        <Toolbar className="nav-bar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Chess
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
          backgroundColor: "gray",
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none", xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { sm: "none", md: "block", xs: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.User,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    localStorage.removeItem('ch_token');
    localStorage.removeItem('chess_userinfo')
    dispatch(removeUserInfo());
    dispatch(removeUserSetting());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);
