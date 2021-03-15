import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAMessage } from '../../store/messages';


const WholeChatFeed = ({eachPersonWhoHasMessaged}) => {
    const dispatch = useDispatch();
    console.log(eachPersonWhoHasMessaged)
    const matchedUserToMessage = eachPersonWhoHasMessaged
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
        };
    };

    return (

        <>
            <div className='add-message-field'>
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

export default WholeChatFeed;