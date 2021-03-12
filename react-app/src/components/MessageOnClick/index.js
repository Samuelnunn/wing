import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAMessage } from '../../store/messages';
import './messages-on-click.css';

const MessageOnClick = ({personToMessage, onClose}) => {
    const dispatch = useDispatch();
    console.log(personToMessage)
    const matchedUserToMessage = personToMessage
    const idToSend = matchedUserToMessage.messageSenderId
    // console.log(idToSend)
    // const otherUserName = personToMessage.messageSender
    const [messageText, setMessageText] = useState("");
    // console.log(otherUserName)
    const handleMessageSendClick = (e) => {
        e.preventDefault();
        if (messageText) {
            dispatch(sendAMessage(idToSend, messageText));
            setMessageText("");
            onClose();
        };
    };

    return (
        <>
            <div className='add-message-field'>
                <div>
                    <p>{personToMessage.id}</p>
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