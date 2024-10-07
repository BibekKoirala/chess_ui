import React from "react";
import "./css/UserRatingDisplay.css"; // Assuming we'll use some custom CSS for styling
import { connect } from "react-redux";
import GameHistoryList from "./GameHistoryList";
import { Grid, Typography } from "@mui/material";

const UserRatingDisplay = (props) => {
  console.log(props);
  return (
    <div className="rating-container">
      <h2 className="rating-title">Your Chess Ratings</h2>
      <div className="rating-cards">
        <div className="rating-card">
          <h3>Bullet</h3>
          <p className="rating-score">{props?.rating?.rating?.bullet}</p>
        </div>
        <div className="rating-card">
          <h3>Blitz</h3>
          <p className="rating-score">{props?.rating?.rating?.blitz}</p>
        </div>
        <div className="rating-card">
          <h3>Rapid</h3>
          <p className="rating-score">{props?.rating?.rating?.rapid}</p>
        </div>
        <div className="rating-card">
          <h3>Classical</h3>
          <p className="rating-score">{props?.rating?.rating?.classical}</p>
        </div>
      </div>
      <Grid style={{ marginTop: 20 }}>
        {props.showHistory && (
          <>
            <Typography
              style={{ textAlign: "center", color: "GrayText" }}
              textAlign={"center"}
              fontSize={"2em"}
              fontWeight={"bold"}
            >
              Game History
            </Typography>
            <GameHistoryList />
          </>
        )}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  rating: state.ratings,
});

export default connect(mapStateToProps)(UserRatingDisplay);
