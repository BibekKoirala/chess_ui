import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CommonRegex from "../../../Common/CommonRegex";
import { NotificationTypeEnum, ResponseTypeEnum } from "../../../Common/CommonEnum";
import { Snackbar, Alert, Paper, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import RequestHelper from "../../../Common/RequestHelper";
import Backdrop from '@mui/material/Backdrop';
import CircularProgressBar from "@mui/material/CircularProgress";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const theme = createTheme();

export default function UserRegistration() {

    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      setLoading(true);
      RequestHelper.Post('validatesignintoken', { token: params.token },(res, success)=>{
          setLoading(false);
          if (res && res.status == ResponseTypeEnum.Success) {
              if (success) {
                  // showMessage(res.data.message, NotificationTypeEnum.Success); 
                  setUsername(res.data.data.username);
              }
              else if (res.data) {
                localStorage.setItem('chess_userregmessage', res.data.message);
                navigate('/userregistrationsuccess/false'); 
              }
              else {
                localStorage.setItem('chess_userregmessage', "Something went wrong.");
                navigate('/userregistrationsuccess/false'); 
              }
          }
          else if (res.data) {
            localStorage.setItem('chess_userregmessage', res.data.message);
            navigate('/userregistrationsuccess/false'); 
          }
          else {
            localStorage.setItem('chess_userregmessage', "Something went wrong.");
            navigate('/userregistrationsuccess/false'); 
          }
      })
      console.log("UseEffect is called i times")
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleOpen = () => {
        setOpen(true);
      };

    const showMessage = (message, type) => {
        setMessage(message);
        setType(type);
        setOpen(true);
    }


  const handleSubmit = () => {
    
    setLoading(true);
    let noOfEmptyFields = [newPassword, confirmNewPassword].filter((e)=> e === "")
    if (noOfEmptyFields.length >1) {
        setLoading(false);
        showMessage("All fields are required!", NotificationTypeEnum.Error);
        return
    }
    else if(newPasswordError || !newPassword){
        setLoading(false);
        showMessage("Please provide a valid password.", NotificationTypeEnum.Error);
        return;
    }
    else if (!confirmNewPassword){
        setLoading(false);
        showMessage("Please confirm the password.", NotificationTypeEnum.Error);
        return;
    }
    else if (confirmNewPasswordError){
        setLoading(false);
        showMessage("Confirm password do not match.", NotificationTypeEnum.Error);
        return;
    }

    RequestHelper.Post('createnewpassword', {
        token: params.token,
        password: newPassword,
      }, (res, success)=>{
        setLoading(false);
        if (res) {
            if (success) {
              localStorage.setItem('chess_userregmessage', res.data.message);
              navigate('/userregistrationsuccess/true'); 
            }
            else if (res.data) {
              localStorage.setItem('chess_userregmessage', res.data.message);
              navigate('/userregistrationsuccess/false'); 
            }
            else {
              localStorage.setItem('chess_userregmessage', "Something went wrong.");
              navigate('/userregistrationsuccess/false'); 
            }
        }
        else {
          localStorage.setItem('chess_userregmessage', "Something went wrong.");
          navigate('/userregistrationsuccess/false'); 
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
    }else if (event.target.name === "newpassword") {
        if ( ! CommonRegex.passwordReGex.test(event.target.value)) {
            setNewPasswordError(true);
        }
        else {
            setNewPasswordError(false);
        }
        setNewPassword(event.target.value);
    }else if (event.target.name === "confirmnewpassword") {
      if ( event.target.value !== newPassword ) {
          setConfirmNewPasswordError(true);
      }
      else {
        setConfirmNewPasswordError(false);
      }
      setConfirmNewPassword(event.target.value);
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a password
          </Typography>
          <Box>
            <TextField
              disabled
              value={username}
              error = {usernameError}
              className="form-input"
              color={'secondary'}
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoFocus
              onChange={handleChange}
            />
             <FormControl fullWidth className="form-input" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
              <OutlinedInput
                
                id="newpassword"
                label="New Password"
                name="newpassword"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                autoFocus
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=> setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth className="form-input" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
              <OutlinedInput
                
                id="confirmnewpassword"
                label="Confirm Password"
                name="confirmnewpassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmNewPassword}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=> setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>            
            <Button
            onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Password
            </Button>
            
          </Box>
        </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
