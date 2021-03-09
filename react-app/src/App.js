import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MatchCard from "./components/Match/index"
import LogoutButton from './components/auth/LogoutButton';
import { authenticate, logout } from "./services/auth";
import { addUser } from "./store/session";
import { getPotentialMatches } from './store/matches';




function App() {
const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const user = useSelector(state => state.session.user)
  console.log(user)

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(addUser(user));
        dispatch(getPotentialMatches());
      }
      setLoaded(true);
    })();
  }, [setAuthenticated, dispatch]);


  if (!loaded) {
    return null;
    }

      return (
        <>
            <BrowserRouter>
            <NavBar loaded={loaded} setAuthenticated={setAuthenticated}  authenticated={authenticated}/>
            {loaded && (
                <>
                    <Switch>
                        <Route path="/matches">
                            <MatchCard />
                            <LogoutButton setAuthenticated={setAuthenticated} />
                            <button onClick={logout}></button>
                        </Route>      
                        <Route path="/" exact={true} authenticated={authenticated}>
                            <MatchCard />
                        </Route>
                    </Switch>
                    <>
                    </>
                </>
            )}
            </BrowserRouter>
      </>
    )
}    


export default App;
