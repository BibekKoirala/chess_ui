import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Backdrop, Paper, Snackbar } from '@mui/material';
import { useState } from 'react';
import CommonRegex from '../../Common/CommonRegex';
import CircularProgressBar from "@mui/material/CircularProgress";
import { NotificationTypeEnum } from '../../Common/CommonEnum';
import RequestHelper from '../../Common/RequestHelper';
import { Set_UserInfo } from '../../Redux/Action/UserAction';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

function SignIn(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState('success');
  const navigate = useNavigate()

  const showMessage = (message, type) => {
    setMessage(message);
    setType(type);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (event) => {
    setLoading(true);
    let noOfEmptyFields = [username, password].filter((e)=> e === "")
    if (noOfEmptyFields.length >1) {
        setLoading(false);
        showMessage("All fields are required!", NotificationTypeEnum.Error);
        return
    }
    else if(usernameError || !username){
      setLoading(false);
      showMessage("Please provide a valid username.", NotificationTypeEnum.Error);
      return;
  }
    else if(passwordError || !password){
        setLoading(false);
        showMessage("Please provide a valid password.", NotificationTypeEnum.Error);
        return;
    }
    
    RequestHelper.Post('login', {
      username: username,
      password: password,
    }, (res, success)=>{
      setLoading(false);
      if (res) {
          if (success) {
            props.setUser(res.data.data);
            localStorage.setItem('chess_userinfo', JSON.stringify(res.data.data));
            navigate('/setting')
            showMessage(res.data.message, NotificationTypeEnum.Success);
          }
          else if (res.data) {
            showMessage(res.data.message, NotificationTypeEnum.Error);
          }
          else {
            showMessage(res.data.message, NotificationTypeEnum.Error);
          }
      }
      else {
        showMessage("Something went wrong.", NotificationTypeEnum.Error);
      }
    })
  };

  const handleChange = (event) => {
    if (event.target.name === "username") {
        if (event.target.value.length < 4 || ! CommonRegex.usernameReGex.test(event.target.value)) {
            setUsernameError(true);
        }
        else {
            setUsernameError(false);
        }
        setUsername(event.target.value);
    }else if (event.target.name === "password") {
        if ( ! CommonRegex.passwordReGex.test(event.target.value)) {
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
        }
        setPassword(event.target.value);
    }
    else {
        return;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgressBar color="inherit" />
      </Backdrop>
        <Paper style={{padding: 20, marginTop: '30%'}}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box >
            <TextField
              error={usernameError}
              value={username}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              error={passwordError}
              value={password}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgetpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    setUser : (user) => dispatch({ type: Set_UserInfo, payload: user})
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(SignIn);