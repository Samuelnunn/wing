import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Center from 'react-center';
import Navigation from './Navigation'
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MatchCard from "./components/Match/index";
import Messages from "./components/Messages/index";
import Matched from './components/Matched/index';
import User from './components/Profile/User';
import SplashPage from './components/Splash'
import { authenticate, logout } from "./services/auth";
import { addUser } from "./store/session";
import { getPotentialMatches, usersWhoHaveMatchedCurrent} from './store/matches';
import { matchedByOtherUser } from './store/matched';
import { fetchMessages } from './store/messages';
import { getSeenUsers } from './store/matches';
import { addPreferenceToState } from './store/preferences'
import './index.css';





function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const user = useSelector(state => state.session.user) ;

  const config = {
    navigation: {
      component: Navigation,
      location: "before", // or after
    }
  };

    useEffect(() => {
      (async () => {
        const user = await authenticate();
        if (!user.errors) {
            setAuthenticated(true);
            dispatch(addUser(user));
            dispatch(getPotentialMatches());
            dispatch(matchedByOtherUser());
            dispatch(fetchMessages());
            dispatch(usersWhoHaveMatchedCurrent());
            dispatch(getSeenUsers());
            dispatch(addPreferenceToState())
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
            
            <Route path="/" exact={true} authenticated={authenticated}>
                <SplashPage className='splash'/>
            </Route>
            
            {loaded && (
                <>
                    <Switch>
                        <Route path="/matches">
                            <MatchCard class="body-of-webpage" exact={true} authenticated={authenticated}/>
                            {/* <LogoutButton setAuthenticated={setAuthenticated} /> */}
                            {/* {/* <button onClick={logout}></button> */}
                        </Route>      
                        <Route path="/matches" exact={true} authenticated={authenticated}>
                            <Center>
                                <MatchCard className="body-of-webpage" />
                            </Center>
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
