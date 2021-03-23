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
        <div className='matched-container'>
            <div className='position-elements'>
        {usersArrayToMap.map((eachUser) => {
                return (
                    <div className='elements-in-matched-container'>
                        <div className='elements-in-top-matched'>
                            <h2 className='matched-first-name'>{eachUser.first_name}, {eachUser.age}</h2>
                            <h3 className='matched-bio'>{eachUser.bio}</h3>
                            <img src={eachUser.profile_photo_url} className='matched-pic'/>
                            <Unmatch className='unmatch-button' eachUser={eachUser} />
                        </div>
                        <div className='elements-in-bottom-matched'>
                            <MessageUser eachUser={eachUser}/>
                        </div>
                    </div>
                );
            })} 
        </div>
        </div>
            : 
            <div className='no-current-matches-container'>
                <h1 className='no-current-matches-text'> No Matches at this time! </h1>
            </div>
};

export default Matched;