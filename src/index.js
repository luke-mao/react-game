import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

// change the theme to:
// md: 800px, lg: 1400px, and others keep the same
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1400,
      xl: 1536,
    },
  },
});

theme = responsiveFontSizes(theme);

// the github pages does not support BrowserRouter,
// use HashRouter instead
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      theme={theme}
    >
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
