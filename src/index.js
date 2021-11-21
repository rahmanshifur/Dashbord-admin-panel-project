import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// IMPORT COMPONENTS
import App from './app/index';
import store from './store';

// IMPORT STYLE
import 'bootstrap/dist/css/bootstrap.min.css';
import '.././src/assets/scss/style.scss'

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

// IMPORT STORE PROVIDER FROM EASY peasy
import { StoreProvider } from 'easy-peasy'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store} >
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
