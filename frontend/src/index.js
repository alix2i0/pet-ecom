import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/main.css'
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {store} from "./services/reducer/configureStore"
import { Provider } from 'react-redux';

const title = "Meowtopia";
const navLinks = [
  { href: "/", text: "Home", style: "text-teal-600" },
  { href: "/about", text: "About", style: "text-white" },
  { href: "/products", text: "Products", style: "text-white" },
  { href: "/contact", text: "Contact", style: "text-white" },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter >
      <App title={title} navLinks={navLinks} />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
