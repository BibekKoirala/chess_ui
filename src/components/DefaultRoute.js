import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import MainHeader from './Headers/MainHeader'

function DefaultRoute(props) {
    const { Component } = props
  return (
    <>
    <MainHeader />
    {
        !props.user.token? <Component />: <Navigate to={"/game"} replace />
    }
    </>
  )
}

const mapStateToProps = (state) => ({
    user: state.User
})

export default connect(mapStateToProps, null)(DefaultRoute)