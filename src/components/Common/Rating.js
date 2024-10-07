import React from 'react';
import './css/UserRatingDisplay.css'; // Assuming we'll use some custom CSS for styling
import { connect } from 'react-redux';

const UserRatingDisplay = (props) => {
    console.log(props)
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
    </div>
  );
};

const mapStateToProps = (state) => ({
    rating: state.ratings,
  });
  

export default connect(mapStateToProps)(UserRatingDisplay);
