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
        <>
            <div className='add-message-field'>
                <textarea 
                    className='message-text-area' 
                    placeholder='Send a message'
                    value={messageText}
                    onChange={e => { setMessageText(e.target.value)}}
                ></textarea>
                <button className='message-send-button' onClick={handleMessageSendClick}>Send Message</button>
            </div>
        </>
    );
};

export default MessageUser;