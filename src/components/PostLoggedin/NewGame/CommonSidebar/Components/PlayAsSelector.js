import React from 'react';
import { Avatar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import black from "../../../../../Images/Black.png";
import white from "../../../../../Images/White.png";

const PlayAsSelector = ({ playas, handlePlayasChange }) => {
  return (
    <div className="container2" style={{ marginTop: 30, display: 'flex', alignItems: 'center', justifyContent: "space-evenly" }}>
      <div
        onClick={() => handlePlayasChange("b")}
        style={{
          borderColor: playas === 'b' ? "#007BFF" : "#B0BEC5",
          backgroundColor: playas === 'b' ? "#E3F2FD" : "#F5F5F5",
          cursor: 'pointer',
          padding: '10px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: '10px' // Space between options and divider
        }}
        className="settingoptions game-icon"
      >
        <Avatar
          alt="Black Player"
          variant="square"
          sx={{ width: 66, height: 66 }}
          src={black}
        />
        <Typography variant="caption">Black</Typography>
      </div>



      <div
        onClick={() => handlePlayasChange("w")}
        style={{
          borderColor: playas === 'w' ? "#007BFF" : "#B0BEC5",
          backgroundColor: playas === 'w' ? "#E3F2FD" : "#F5F5F5",
          cursor: 'pointer',
          padding: '10px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: '10px' // Space between options and divider
        }}
        className="settingoptions game-icon"
      >
        <Avatar
          alt="White Player"
          variant="square"
          sx={{ width: 66, height: 66 }}
          src={white}
        />
        <Typography variant="caption">White</Typography>
      </div>
    </div>
  );
};

// PropTypes for type checking
PlayAsSelector.propTypes = {
  playas: PropTypes.oneOf(['b', 'w']).isRequired,
  handlePlayasChange: PropTypes.func.isRequired,
  blackAvatar: PropTypes.string.isRequired,
  whiteAvatar: PropTypes.string.isRequired,
};

export default PlayAsSelector;
