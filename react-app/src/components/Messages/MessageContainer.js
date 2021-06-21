import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sendAMessage, fetchMessages, fetchMessageFeedMessages } from '../../store/messages';
import Messages from './index'
import MessageOnClick from '../MessageOnClick';
import './messages.css';
import wing from './w-logo.png'


const MessagesContainer = () => {
    const dispatch = useDispatch();
    
    const usersMessages = useSelector((state) => state.messages.message);
    const usersMessageFeed = useSelector((state) => state.messages.messagefeed);
    
    const [showChat, setShowChat] = useState(false);
    const [personToMessage, setPersonToMessage] = useState(0);
    const [messageText, setMessageText] = useState("");
    
    const messageUser = async (e) => {   
        dispatch(fetchMessages())
        dispatch(fetchMessageFeedMessages(e.target.id))
        .then(() =>  setPersonToMessage(e.target.id));
        setShowChat(true);
    };

    const handleMessageSendClick = (e) => {
        e.preventDefault();
        if (messageText) {
            dispatch(sendAMessage(personToMessage, messageText));
            dispatch(fetchMessageFeedMessages(personToMessage));
            setMessageText("")
        };
    };


    useEffect(() => {
        dispatch(fetchMessageFeedMessages(personToMessage));
    }, [dispatch, messageText]);


    return usersMessages.length ?
        <div className='whole-message-component'>    
            <Messages showChat={showChat} personToMessage={personToMessage} messageUser={messageUser}/>
            <div className='current-messages-container'>
                {!showChat && <img src={wing} className='wing-logo-message'/>}
                {showChat && <div className='message-on-click-container'>
                    <MessageOnClick messageFeed={usersMessageFeed} />
                    <div className='message-input-button'>
                        <div className='message-input-container'>
                            <textarea
                                id='message-message-text-area' 
                                className='message-text-area' 
                                placeholder='Send a message'
                                value={messageText}
                                onChange={e => { setMessageText(e.target.value)}}
                            ></textarea>
                        </div>
                        <button className='message-send-button'
                        onClick={handleMessageSendClick}>Send Message</button>
                    </div> 
                </div>}
            </div>
        </div>
            :
            <div className='no-message-container'>
                <h1 className='no-message-text'>No messages</h1>
            </div> 
};

export default MessagesContainer;