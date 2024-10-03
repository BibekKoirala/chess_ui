import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Main from "./components/Main";
import Color from "./Theme/Color";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/redux_store";
import { PersistGate } from "redux-persist/integration/react";
import MainHeader from "./components/Headers/MainHeader";
import { WebsocketProvider } from "./components/WebsocketContext";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: Color.Primary,
    },
    secondary: {
      main: Color.Secondary,
    },
  },
});

function Copyright(props) {
  return (
    <Typography
      className="footer"
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a color="inherit" href="/">
        Bibek Koirala
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <WebsocketProvider>
          <div className="App">
            <ThemeProvider theme={theme}>
              <Main />
            </ThemeProvider>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </div>
        </WebsocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
