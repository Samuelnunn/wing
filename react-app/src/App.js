import React, { useState, useEffect, useSelector } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import LogoutButton from './components/auth/LogoutButton';
import { authenticate } from "./services/auth";
import { addUser } from "./store/session";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(addUser(user));
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
    }
    if (loaded) {
      return (
        <BrowserRouter>
        {/* <NavBar setAuthenticated={setAuthenticated} /> */}
        {/* <LandingPage setAuthenticated={setAuthenticated}/> */}
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          </Route>
        </Switch>
        <Switch>
            <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
            <h1>My Home Page</h1>
            {console.log()}
            <LogoutButton setAuthenticated={setAuthenticated} />
            </ProtectedRoute>
        </Switch>
      </BrowserRouter>
      )
    }    
}

export default App;
