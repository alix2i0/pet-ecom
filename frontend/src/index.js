import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/main.css'
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {store} from "./services/reducer/configureStore"
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    </Provider>
  </React.StrictMode>
);
