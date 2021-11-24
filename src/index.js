import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

// change the theme to:
// md: 800px, lg: 1400px, and others keep the same
const theme = createTheme({
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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      theme={theme}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
