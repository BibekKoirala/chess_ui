import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import CommonRegex from "../../../Common/CommonRegex";
import { NotificationTypeEnum } from "../../../Common/CommonEnum";
import { Backdrop, CircularProgress, Paper } from "@mui/material";
import RequestHelper from "../../../Common/RequestHelper";
import { useRef } from "react";
import CustomSnackbar from "../../Common/Snackbar";

const theme = createTheme();

export default function Register() {
  const minDate = () => {
    let newDate = new Date();
    newDate.setFullYear(new Date().getFullYear() - 100);
    return newDate;
  };

  const maxDate = () => {
    let newDate = new Date();
    newDate.setFullYear(new Date().getFullYear() - 1);
    return newDate;
  };

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [dob, setDOB] = React.useState(dayjs(maxDate()));

  const [usernameError, setUsernameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [dobError, setDOBError] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const messageRef = useRef(null);

  const handleSubmit = () => {
    setLoading(true);
    let noOfEmptyFields = [username, email, password, confirmPassword, dob].filter(
      (e) => e === ""
    );
    if (noOfEmptyFields.length > 0) {
      setLoading(false);
      messageRef.current.showMessage(
        "All fields are required!",
        NotificationTypeEnum.Error
      );
      return;
    } else if (usernameError || !username) {
      setLoading(false);
      messageRef.current.showMessage(
        "Please provide a valid username",
        NotificationTypeEnum.Error
      );
      return;
    } else if (emailError || !email) {
      setLoading(false);
      messageRef.current.showMessage(
        "Please provide a valid email",
        NotificationTypeEnum.Error
      );
      return;
    } else if (passwordError || !password) {
      setLoading(false);
      messageRef.current.showMessage(
        "Please provide a valid password",
        NotificationTypeEnum.Error
      );
      return;
    } else if (confirmPasswordError || confirmPassword !== password) {
      setLoading(false);
      messageRef.current.showMessage(
        "Passwords do not match",
        NotificationTypeEnum.Error
      );
      return;
    } else if (dobError || !dob) {
      setLoading(false);
      messageRef.current.showMessage(
        "Please provide a valid date of birth",
        NotificationTypeEnum.Error
      );
      return;
    }

    RequestHelper.Post(
      "register",
      {
        email: email,
        username: username,
        password: password,
        birthdate: dob.$d,
      },
      (res, success) => {
        setLoading(false);
        if (res) {
          if (success) {
            messageRef.current.showMessage(
              res.data.message,
              NotificationTypeEnum.Success
            );

            setUsername("")
            setConfirmPassword("")
            setPassword("")
            setEmail("")
            setDOB(dayjs(maxDate()))

          } else if (res.data) {
            messageRef.current.showMessage(
              res.data.message,
              NotificationTypeEnum.Error
            );
          } else {
            messageRef.current.showMessage(
              "Something went wrong",
              NotificationTypeEnum.Error
            );
          }
        } else {
          messageRef.current.showMessage(
            "Something went wrong",
            NotificationTypeEnum.Error
          );
        }
      }
    );
  };

  const handleChange = (event) => {
    if (event.target.name === "username") {
      if (
        event.target.value.length < 4 ||
        !CommonRegex.usernameReGex.test(event.target.value)
      ) {
        setUsernameError(true);
      } else {
        setUsernameError(false);
      }
      setUsername(event.target.value);
    } else if (event.target.name === "email") {
      if (!CommonRegex.emailReGex.test(event.target.value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      if (event.target.value.length < 6) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      setPassword(event.target.value);
    } else if (event.target.name === "confirmPassword") {
      if (event.target.value !== password) {
        setConfirmPasswordError(true);
      } else {
        setConfirmPasswordError(false);
      }
      setConfirmPassword(event.target.value);
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
          <CircularProgress color="inherit" />
        </Backdrop>
        <Paper
          style={{
            padding: 20,
            marginTop: "30%",
            backgroundColor: "hsl(120, 10%, 90%, 0.9)",
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
              Create an account
            </Typography>
            <Box>
              <TextField
                value={username}
                error={usernameError}
                className="form-input"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                value={email}
                error={emailError}
                className="form-input"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
              <TextField
                value={password}
                error={passwordError}
                className="form-input"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <TextField
                value={confirmPassword}
                error={confirmPasswordError}
                className="form-input"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={handleChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="register-datepicker form-input"
                  minDate={dayjs(minDate())}
                  maxDate={dayjs(maxDate())}
                  onError={(e) => setDOBError(true)}
                  onAccept={() => setDOBError(false)}
                  value={dob}
                  handleChange={(d) => setDOB(d)}
                  label={"Birth Date"}
                  openTo="year"
                />
              </LocalizationProvider>

              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid textAlign={"center"} container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Login
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
