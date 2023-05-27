import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import MainHeader from "./Headers/MainHeader";
import { CircularProgress } from "@mui/material";

function SecureRoute(props) {
  const { Component } = props;
  return (
    <>
      <Suspense fallback={<CircularProgress />}>
        <MainHeader />
        {props.user.token ? <Component /> : <Navigate to={"/"} replace />}
      </Suspense>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps, null)(SecureRoute);
