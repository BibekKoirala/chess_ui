// ratingActionTypes.js

import RequestHelper from "../../Common/RequestHelper";

export const FETCH_RATING_REQUEST = 'FETCH_RATING_REQUEST';
export const FETCH_RATING_SUCCESS = 'FETCH_RATING_SUCCESS';
export const FETCH_RATING_FAILURE = 'FETCH_RATING_FAILURE';

  // Fetch user rating
  export const fetchUserRating = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_RATING_REQUEST });
      try {

        RequestHelper.Get('ratings', '',async (response, success)=>{
            if (success) {
                dispatch({ type: FETCH_RATING_SUCCESS, payload: response.data.ratings });
              } else {
                dispatch({ type: FETCH_RATING_FAILURE, error: response.message });
              }
        })
      } catch (error) {
        dispatch({ type: FETCH_RATING_FAILURE, error: error.message });
      }
    };
  };
