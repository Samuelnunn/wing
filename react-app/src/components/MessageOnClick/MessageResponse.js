import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendAMessage, fetchMessageFeedMessages } from '../../store/messages';
import './messages-on-click.css';

const MessageOnClick = ({personToMessage, onClose}) => {
    const dispatch = useDispatch();

    return (
        <div className='add-message-field'>
            <div>
                {/* <p>{personToMessage}</p> */}
                <h1>{personToMessage}</h1>
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
    );
};

export default MessageOnClick;