import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
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
            <div className='remove-match-container'>
                {/* <button className='remove-match-button' onClick={handleUnmatchClick}>Remove Match</button> */}
                <ClearTwoToneIcon className='remove-match-button' onClick={handleUnmatchClick}/>
            </div>
    );
};

export default Unmatch;



