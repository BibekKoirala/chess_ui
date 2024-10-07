import React from 'react';
import { Grid, Icon, Typography } from '@mui/material';

import bulletsvg from "../../../../../Images/bullet.svg";
import blitzsvg from "../../../../../Images/blitz.svg";
import rapidsvg from "../../../../../Images/rapid.svg";
import classicalsvg from "../../../../../Images/classical.svg";

const TimeSelector = ({ time, handleTimeChange }) => {
  // Define the time options and their associated icons
  const timeOptions = [
    { label: 'Bullet', icon: bulletsvg },
    { label: 'Blitz', icon: blitzsvg },
    { label: 'Rapid', icon: rapidsvg },
    { label: 'Classical', icon: classicalsvg },
  ];

  return (
    <Grid container style={{marginTop: 20}} justifyContent="center" alignItems="center">
      {timeOptions.map((option, index) => (
        <Grid
          item
          key={index}
          onClick={() => handleTimeChange(index)}
          style={{
            borderColor: time === index ? '#007BFF' : '#B0BEC5',
            backgroundColor: time === index ? '#E3F2FD' : '#F5F5F5',
            textAlign: 'center',
            cursor: 'pointer',
            paddingBlock: "5px",
            paddingInline: "20px",
            borderRadius: '10px',
            margin: "0 10px",
            width: '100%', // Set to 100% for responsive sizing
          }}
          className={"timeoptions timesetting game-icon"}
          xs={5} // Adjusted to allow two items per row
        >
          <Icon style={{ textAlign: "center" }}>
            <img style={{ height: "100%" }} src={option.icon} alt={option.label} />
          </Icon>
          <Typography component={"span"} variant="h5">
            {option.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default TimeSelector;
