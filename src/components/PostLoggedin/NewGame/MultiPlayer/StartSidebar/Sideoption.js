import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Itemone from "./Options/Itemone";
import Itemtwo from "./Options/Itemtwo";
import Itemthree from "./Options/Itemthree";
import { Icon, Paper } from "@mui/material";
import chessboardsvg from "../../../../../Images/chessboard.svg";
import historysvg from "../../../../../Images/history-svgrepo-com.svg";
import GroupIcon from "@mui/icons-material/Group";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component={"div"} sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Sideoption() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
                  <img style={{ height: "100%" }} src={chessboardsvg} />
                </Icon>
              }
              {...a11yProps(0)}
            />
            <Tab
              disabled
              label={<GroupIcon style={{ color: "black" }} />}
              {...a11yProps(1)}
            />
            <Tab
              label={
                <Icon style={{ textAlign: "center" }}>
                  <img style={{ height: "100%" }} src={historysvg} />
                </Icon>
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Itemone />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Itemtwo />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Itemthree />
        </TabPanel>
      </Box>
    </Paper>
  );
}
