import React from 'react'
import Rating from '../../Common/Rating'
import GameHistoryList from '../../Common/GameHistoryList'
import { Grid } from '@mui/material'

function Statistics() {
  return (

    <Grid justifyContent={"space-around"} container className="container-main">
      <Rating showHistory={true} />
    </Grid>

  )
}

export default Statistics