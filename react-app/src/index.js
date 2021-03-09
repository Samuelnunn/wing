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
import * as matchActions from './store/matches'

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
    window.store = store;
    window.sessionActions = sessionActions;
    window.matchActions = matchActions;
}

function Root() {
    return (
        <BrowserRouter>
          <ModalProvider>
                <Provider store={store}>
                    <App />
                </Provider>
          </ModalProvider>
      </BrowserRouter>
    );
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
