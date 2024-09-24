import { Avatar, Box, Button, Grid, Icon, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { setUserSetting } from "../../../Redux/Action/SettingsAction";
import { connect } from "react-redux";
import chesspiecesvg from '../../../Images/chess-timer.svg';
import settingiconsvg from '../../../Images/setting-4.svg'
import TabPanel from "../../Common/Tabpanel"
import Itemone from "./Options/Itemone";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Settings(props) {


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  

  return (
    <Grid textAlign={"center"} justifyContent={"center"} container>
      <Grid item lg={6} md={8} sm={12} xs={12}>
      <Paper style={{ padding: 10, margin: 10 }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Icon style={{ textAlign: "center" }}>
                  <img style={{ height: "100%" }} src={chesspiecesvg} />
                </Icon>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={<Icon style={{ textAlign: "center" }}>
              <img style={{ height: "100%" }} src={settingiconsvg} />
            </Icon>}
              {...a11yProps(1)}
            />
            
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        <Itemone {...props}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          hello
        </TabPanel>
      </Box>
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
