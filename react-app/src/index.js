import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store";
import App from './App';
import './index.css';
import ModalProvider from './context/ModalContext';
// import AuthProvider from './';
import * as sessionActions from './store/session'

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
    window.store = store;
    window.sessionActions = sessionActions;
}

function Root() {
    return (
        <BrowserRouter>
        <Provider store={store}>
          <ModalProvider>
                <App />
          </ModalProvider>
        </Provider>
      </BrowserRouter>
    );
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
