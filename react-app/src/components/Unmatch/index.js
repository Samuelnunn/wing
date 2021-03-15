import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchedByOtherUser, unmatchUser } from '../../store/matched';

const Unmatch = ({eachUser}) => {
    const dispatch = useDispatch();
    
    useEffect(() => {},
    
    [dispatch])

    const handleUnmatchClick = (e) => {
        e.preventDefault();
        if (eachUser) {
            dispatch(unmatchUser(eachUser.id));
            // dispatch(matchedByOtherUser());
        };
    };

    return (
            <div className='add-message-field'>
                <button className='message-send-button' onClick={handleUnmatchClick}>Remove Match</button>
            </div>
    );
};

export default Unmatch;



