import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MatchCard from "./components/Match/index";
import Messages from "./components/Messages/index";
import LogoutButton from './components/auth/LogoutButton';
import Matched from './components/Matched/index';
import User from './components/User'
import { authenticate, logout } from "./services/auth";
import { addUser } from "./store/session";
import { getPotentialMatches } from './store/matches';
import { matchedByOtherUser } from './store/matched';
import { fetchMessages } from './store/messages';
import './index.css';




function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const user = useSelector(state => state.session.user) ;


    useEffect(() => {
      (async () => {
        const user = await authenticate();
        if (!user.errors) {
            setAuthenticated(true);
            dispatch(addUser(user));
            dispatch(getPotentialMatches());
            dispatch(matchedByOtherUser());
            dispatch(fetchMessages());
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
                            <MatchCard class="body-of-webpage"/>
                            {/* <LogoutButton setAuthenticated={setAuthenticated} /> */}
                            {/* {/* <button onClick={logout}></button> */}
                        </Route>      
                        <Route path="/" exact={true} authenticated={authenticated}>
                            <MatchCard className="body-of-webpage" />
                        </Route>
                        <Route path="/messages" exact={true} authenticated={authenticated}>
                            <Messages className="body-of-webpage" loaded={loaded} />
                        </Route>
                        <Route path="/matched" exact={true} authenticated={authenticated}>
                            <Matched className="body-of-webpage" loaded={loaded} />
                        </Route>
                        <Route path="/profile" exact={true} authenticated={authenticated}>
                            <User user={user} className="body-of-webpage" loaded={loaded} />
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
