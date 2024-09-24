import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Grid, Paper, Typography, } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error';
import Color from '../../../Theme/Color';

function UserRegistrationSuccess(props) {

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem('chess_userregmessage')){
        navigate('/', { replace: true });
      }
    },[])
    console.log(params.success)
  return (
    <div>
      <Grid justifyContent={'center'} container spacing={2}>
        <Grid style={{textAlign: 'center', padding: 50}} item lg={6} md={6} sm={12} xs={12}>
          <Paper style={{padding: 50, backgroundColor: Color.Secondary}}>
          {params.success.toLowerCase() == "true"?
            <CheckCircleIcon htmlColor='green' style={{height: '100px', width: '100px'}} />:
            <ErrorIcon htmlColor='red' style={{height: '100px', width: '100px'}}/> }
          <Typography style={{marginTop: 15, color: 'white'}} variant='h4'>{localStorage.getItem('chess_userregmessage')?localStorage.getItem('chess_userregmessage'):"Something went wrong."}</Typography>
          <Typography style={{marginTop: 15}} variant='h5'><Link to={'/'}>Go to login</Link></Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserRegistrationSuccess