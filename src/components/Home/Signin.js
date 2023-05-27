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
import { Alert, Backdrop, Paper, Snackbar } from "@mui/material";
import { useState } from "react";
import CommonRegex from "../../Common/CommonRegex";
import CircularProgressBar from "@mui/material/CircularProgress";
import { NotificationTypeEnum } from "../../Common/CommonEnum";
import RequestHelper from "../../Common/RequestHelper";
import { Set_UserInfo } from "../../Redux/Action/UserAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import CustomSnackbar from "../Common/Snackbar";

const theme = createTheme();

function SignIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const messageRef = useRef(null);

  const handleSubmit = (event) => {
    setLoading(true);
    let noOfEmptyFields = [username, password].filter((e) => e === "");
    if (noOfEmptyFields.length > 1) {
      setLoading(false);
      messageRef.current.showMessage(
        "All fields are required!",
        NotificationTypeEnum.Error
      );
      return;
    } else if (usernameError || !username) {
      setLoading(false);
      messageRef.current.showMessage(
        "Please provide a valid username.",
        NotificationTypeEnum.Error
      );
      return;
    } else if (passwordError || !password) {
      setLoading(false);
      messageRef.current.showMessage(
        "Please provide a valid password.",
        NotificationTypeEnum.Error
      );
      return;
    }

    RequestHelper.Post(
      "login",
      {
        username: username,
        password: password,
      },
      (res, success) => {
        setLoading(false);
        if (res) {
          if (success) {
            props.setUser(res.data.data);
            localStorage.setItem(
              "chess_userinfo",
              JSON.stringify(res.data.data)
            );
            navigate("/setting");
            messageRef.current.showMessage(
              res.data.message,
              NotificationTypeEnum.Success
            );
          } else if (res.data) {
            messageRef.current.showMessage(
              res.data.message,
              NotificationTypeEnum.Error
            );
          } else {
            messageRef.current.showMessage(
              res.data.message,
              NotificationTypeEnum.Error
            );
          }
        } else {
          messageRef.current.showMessage(
            "Something went wrong.",
            NotificationTypeEnum.Error
          );
        }
      }
    );
  };

  const handleChange = (event) => {
    if (event.target.name === "username") {
      if (event.target.value.length === 0) {
        setUsernameError(false);
      } else if (
        event.target.value.length < 4 ||
        !CommonRegex.usernameReGex.test(event.target.value)
      ) {
        setUsernameError(true);
      } else {
        setUsernameError(false);
      }
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      if (event.target.value.length === 0) {
        setPasswordError(false);
      } else if (!CommonRegex.passwordReGex.test(event.target.value)) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      setPassword(event.target.value);
    } else {
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <CustomSnackbar ref={messageRef} />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgressBar color="inherit" />
        </Backdrop>
        <Paper
          style={{
            padding: 20,
            marginTop: "30%",
            backgroundColor: "hsl(120, 10%, 90%, 0.3)",
          }}
        >
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
              Sign in
            </Typography>
            <Box>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: Set_UserInfo, payload: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
