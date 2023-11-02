import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// routing features
import { BrowserRouter} from 'react-router-dom';   

// global variables specific
import reducer from './reducer';
import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux';

// createStore is function part of redux
// which take reducer as a parameter to make global state variable. 
const store = createStore(reducer);   

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
