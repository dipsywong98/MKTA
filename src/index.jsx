import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Global } from '@emotion/core'
import theme from './theme'
import { ThemeProvider } from 'theme-ui'

const MyGlobal = () => (
  <Global
    styles={(theme) => ({
      body: theme.styles.body,
      '*': theme.styles['*'],
      a: theme.styles.a
    })}
  />
)

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MyGlobal/><App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
