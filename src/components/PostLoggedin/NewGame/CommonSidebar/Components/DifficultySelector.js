import { Grid, Typography } from "@mui/material";
import React from "react";

const DifficultySelector = ({ difficulty, handleDifficultyChange }) => {
  // Define colors and labels for the difficulty levels
  const difficultyLevels = [
    { level: "Easy", color: "#4CAF50", bgColor: "#E8F5E9" }, // Green for Easy
    { level: "Medium", color: "#FFC107", bgColor: "#FFF8E1" }, // Yellow for Medium
    { level: "Hard", color: "#F44336", bgColor: "#FFEBEE" }, // Red for Hard
  ];

  return (
    <Grid container style={{ marginTop: 20}}justifyContent="center" alignItems="center">
      {difficultyLevels.map((diff, index) => (
        <Grid
          item
          key={index}
          onClick={() => handleDifficultyChange(index)}
          style={{
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "10px",
            paddingBlock: "5px",
            paddingInline: "20px",
            border: `2px solid ${difficulty === index ? diff.color : "#B0BEC5"}`,
            backgroundColor: `${difficulty === index ? diff.bgColor : "#F5F5F5"}`,
            transition: "background-color 0.3s, border-color 0.3s",
            margin: "0 10px", // Add horizontal space between items
            minWidth: "100px", // Ensures consistent width for all options
          }}
        >
          <Typography
            variant="h6"
            style={{
              color: difficulty === index ? diff.color : "#757575",
              fontWeight: difficulty === index ? "bold" : "normal",
            }}
          >
            {diff.level}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default DifficultySelector;
