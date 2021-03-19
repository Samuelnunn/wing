import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendAMessage, fetchMessageFeedMessages } from '../../store/messages';
import './messages-on-click.css';

const MessageOnClick = ({personToMessage, onClose}) => {
    const dispatch = useDispatch();
    const messageFeedSelector = useSelector((state) => state.messages)
    
    // useEffect(() => {
    //     dispatch(fetchMessageFeedMessages(personToMessage));
    // }, [dispatch, fetchMessageFeedMessages]);
    
    console.log(messageFeedSelector)
    console.log(personToMessage)

    const [messageText, setMessageText] = useState("");


    const handleMessageSendClick = (e) => {
        e.preventDefault();
        if (messageText) {
            // dispatch(sendAMessage(idToSend, messageText));
            setMessageText("");
            onClose();
        };
    };

    return (
        <>
            <div className='add-message-field'>
                <div>
                    {/* <p>{personToMessage}</p> */}
                    <h1>{"myObject"}</h1>
                </div>
                <div>
                    <textarea 
                        className='message-text-area' 
                        placeholder='Send a message'
                        value={messageText}
                        onChange={e => { setMessageText(e.target.value)}}
                    ></textarea>
                </div>
                <button className='message-send-button' onClick={handleMessageSendClick}>Send Message</button>
            </div>
        </>
    );
};

export default MessageOnClick;