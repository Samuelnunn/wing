import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendAMessage, fetchMessageFeedMessages, fetchMessages } from '../../store/messages';
import './messages-on-click.css';

const MessageOnClick = ({personToMessage}) => {
    
    const messageFeedSelector = useSelector((state) => state.messages.messagefeed);
    
    const dispatch = useDispatch()

   
    // useEffect(() => {

    // },[dispatch, fetchMessages, personToMessage])


    
    return messageFeedSelector.length ?
        messageFeedSelector.map((eachMessage) => {
            return(
                <div className='message-feed-container' key={eachMessage.id}>
                    <div className='profile-photo-element'>
                        {<img src={eachMessage.messageSender.profilePhotoUrl} alt="" className='profile-photo'/>}
                    </div>
                    <div className='user-name'>
                            {<h2>{eachMessage.messageSender.firstName}: </h2> }
                    </div>
                    <div className='message-element'>
                            {<h2>{eachMessage.content}</h2> }
                    </div>
                </div>
            )
        }) :
            <>
                <h1>Trouble loading! Please refresh the page</h1>
            </>
};

export default MessageOnClick;