import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import AuthContext from './context/auth';
import App from './app.js';
import { ThemeProvider } from './context/Theme';
function Main() {
  return (
    <ThemeProvider>
      <AuthContext>
        <App />
      </AuthContext>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
