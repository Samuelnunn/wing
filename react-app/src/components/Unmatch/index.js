import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMatches, unmatchUser } from '../../store/matched';

const Unmatch = ({eachUser}) => {
    const dispatch = useDispatch();
   
    const handleUnmatchClick = (e) => {
        e.preventDefault();
        if (eachUser) {
            dispatch(unmatchUser(eachUser.id));
        };
    };

    useEffect(() => {
        dispatch(getMatches());
    }, [dispatch]);

    return (
            <div className='add-message-field'>
                <button className='message-send-button' onClick={handleUnmatchClick}>Remove Match</button>
            </div>
    );
};

export default Unmatch;



