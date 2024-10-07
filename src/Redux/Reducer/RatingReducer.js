// ratingReducer.js

import {
    FETCH_RATING_REQUEST,
    FETCH_RATING_SUCCESS,
    FETCH_RATING_FAILURE,
  } from '../Action/RatingAction';
  
  const initialState = {
    loading: false,
    rating: null,  // Will hold the user's rating data
    error: null,   // Holds error message if fetching fails
  };
  
  // Reducer to handle fetching user rating
  export const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RATING_REQUEST:
        return {
          ...state,
          loading: true,    // Start loading when fetch request begins
          error: null,      // Clear previous errors
        };
  
      case FETCH_RATING_SUCCESS:
        return {
          ...state,
          loading: false,   // Stop loading on successful fetch
          rating: action.payload,  // Set rating data from payload
          error: null,      // Clear any errors
        };
  
      case FETCH_RATING_FAILURE:
        return {
          ...state,
          loading: false,   // Stop loading on failure
          error: action.error,  // Store error message
        };
  
      default:
        return state;  // Return the current state by default
    }
  };
  