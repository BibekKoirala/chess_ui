import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Main from './components/Main';
import Color from './Theme/Color';


const theme = createTheme({
  palette: {
    primary: {
      main: Color.Primary
    },
    secondary: {
      main: Color.Secondary
    }
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
