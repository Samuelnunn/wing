import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAMessage } from '../../store/messages';

const MessageUser = ({eachUser}) => {
    const dispatch = useDispatch();
    const [messageText, setMessageText] = useState("");
    
    const handleMessageSendClick = (e) => {
        e.preventDefault();
        if (messageText) {
            dispatch(sendAMessage(eachUser.id, messageText));
            setMessageText("");
        };
    };

    return (
        <div className='message-matched-container'>
            <textarea 
                className='message-text-area-matched' 
                placeholder='Send a message'
                value={messageText}
                onChange={e => { setMessageText(e.target.value)}}
            ></textarea>
            <button className='message-send-button-matched' onClick={handleMessageSendClick}>Send Message</button>
        </div>
    );
};

export default MessageUser;