import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAMessage } from '../../store/messages';

const MessageOnMatch = ({singlePerson, onClose}) => {
    const dispatch = useDispatch();

    const [messageText, setMessageText] = useState("");
    
    const handleMessageSendClick = (e) => {
        e.preventDefault();
        if (messageText) {
            dispatch(sendAMessage(singlePerson.id, messageText));
            setMessageText("");
            onClose()
        };
    };

    return (
        <>
            <div className='add-message-field'>
                <h1>It's A Match!</h1>
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

export default MessageOnMatch;