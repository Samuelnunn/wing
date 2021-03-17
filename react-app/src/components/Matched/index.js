import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageUser from '../MessageUser';
import Unmatch from '../Unmatch';
import { getMatches } from '../../store/matched'
import './matched.css';


const Matched = () => {
    const dispatch = useDispatch();
    
    const usersMatches = useSelector((state) => state.matched.matchedUsers);
    
    useEffect(() => {
        dispatch(getMatches());
    }, [dispatch]);
    
    const usersArrayToMap = Object.values(usersMatches);
    
    return usersArrayToMap.length ? 
        usersArrayToMap.map((eachUser) => {
            return (
                <div>
                    <h2>{eachUser.first_name}</h2>
                    <h3>{eachUser.bio}</h3>
                    <img src={eachUser.profile_photo_url} className='match-pic'/>
                    <MessageUser eachUser={eachUser}/>
                    <Unmatch eachUser={eachUser} />
                </div>
            );
        }) :
    <h1> No Matches at this time! </h1>
};

export default Matched;