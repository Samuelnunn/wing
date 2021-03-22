import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { sendAMessage, fetchMessageFeedMessages, fetchMessages } from '../../store/messages';
import './messages-on-click.css';

const MessageOnClick = ({personToMessage}) => {
    const divRef = useRef(null);
    
    useEffect(() => {
        divRef.current.scrollIntoView({ block: "end", behavior: 'auto' });
    });

    const messageFeedSelector = useSelector((state) => state.messages.messagefeed);
    return messageFeedSelector.length ?
        <div className='message-feed-container' >
                <div className='scroll-controll' ref={divRef}>    
                {messageFeedSelector.map((eachMessage) => {
                    return(
                        <div className='each-user-message' key={eachMessage.id}>
                            <div className='profile-photo-element'>
                                {<img src={eachMessage.messageSender.profilePhotoUrl} alt="" className='profile-photo'/>}
                            </div>
                            <div className='user-name'>
                                {<h2>{eachMessage.messageSender.firstName}: </h2> }
                            </div>
                            <div className='message-text-element'>
                                {<p>{eachMessage.content}</p> }
                            </div>
                        </div>
                    )
                })} 
                </div>
            </div> 
            :
                <>
                    <h1>Trouble loading! Please refresh the page</h1>
                </>
};

export default MessageOnClick;