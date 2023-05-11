import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Main from './components/Main';
import Color from './Theme/Color';
import { Provider } from 'react-redux';
import { persistor, store } from './Redux/redux_store';
import { PersistGate } from 'redux-persist/integration/react';
import MainHeader from './components/Headers/MainHeader';


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
  console.log(store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
    <div className="App">
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </div>
    </PersistGate>
    </Provider>
  );
}

export default App;
