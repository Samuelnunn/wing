import React, { useState } from 'react';
import { useSelector } from "react-redux";
import MessageOnClick from '../MessageOnClick';
import ReadAndUnread from './ReadAndUnread';
import './messages.css';


const Messages = ({messageUser, showChat, personToMessage}) => {

    const usersMessages = useSelector((state) => state.messages.message);

    const [showChatWindow, setShowChatWindow] = useState(false);
    const [iconToggle, setIconToggle] = useState(null);
    
    const onClose= () => {setIconToggle(false)};
    
    return usersMessages.length ?
        <div className='all-users-messages-container' key={usersMessages.id}>
            <div className='border-sizer'>    
                {usersMessages.map((eachPersonWhoHasMessaged) => {
                    return (
                        <div className='each-message'  onClick={messageUser} id={eachPersonWhoHasMessaged.messageSenderId}>
                            <div key={eachPersonWhoHasMessaged.createdAt} id={eachPersonWhoHasMessaged.messageSenderId} className='message-element'>
                                {<img src={eachPersonWhoHasMessaged.messageSender.profilePhotoUrl} id={eachPersonWhoHasMessaged.messageSenderId}alt="" className='profile-photo'/>}
                                {<h2 className='each-name' id={eachPersonWhoHasMessaged.messageSenderId}>{eachPersonWhoHasMessaged.messageSender.firstName}: </h2> }
                                <p className='each-massage-to-user' messageUser={messageUser}  id={eachPersonWhoHasMessaged.messageSenderId} >{eachPersonWhoHasMessaged.content}</p>                            
                                {<ReadAndUnread personToMessage={personToMessage}  eachPersonWhoHasMessaged={eachPersonWhoHasMessaged} id={eachPersonWhoHasMessaged.messageSenderId} showChat={showChat} className='read-unread' />}
                                {showChatWindow && <MessageOnClick personToMessage={eachPersonWhoHasMessaged.messageSender} onClick={messageUser} onClose={onClose}/>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div> 
       :
        <div className='no-message-container'>
            <h1 className='no-message-text'>No messages</h1>
        </div> 
};

export default Messages;