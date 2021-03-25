import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sendAMessage, fetchMessages, fetchMessageFeedMessages, setMessageFeedForUser } from '../../store/messages';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import MessageOnClick from '../MessageOnClick';
import ReadAndUnread from './ReadAndUnread';
import './messages.css';



const Messages = ({messageUser}) => {
    const dispatch = useDispatch();
    
    
    const usersMessages = useSelector((state) => state.messages.message);

    const [showChat, setShowChat] = useState(false);
  
    const [personToMessage, setPersonToMessage] = useState(0);
    const [messageText, setMessageText] = useState("");
    const [iconToggle, setIconToggle] = useState(null);

    const onClose= () => {setIconToggle(false)};


    // const handleMessageSendClick = (e) => {
    //     e.preventDefault();
    //     if (messageText) {
    //         dispatch(sendAMessage(personToMessage, messageText));
    //         dispatch(fetchMessageFeedMessages(personToMessage));
    //         setMessageText("")
    //     };
    // };

    useEffect(() => {
    }, [dispatch, fetchMessages, messageText]);

    useEffect(() => {
        usersMessages.filter((eachUser) => {
            setIconToggle(eachUser.read) 
        });
    }, [dispatch, iconToggle]);

    return usersMessages.length ?
        <div className='all-users-messages-container' key={usersMessages.id}>
            <div className='border-sizer'>    
            {usersMessages.map((eachPersonWhoHasMessaged) => {
                console.log(eachPersonWhoHasMessaged)
                    return (
                        <div className='each-message'  onClick={messageUser} id={eachPersonWhoHasMessaged.messageSenderId}>
                            <div key={eachPersonWhoHasMessaged.createdAt} id={eachPersonWhoHasMessaged.messageSenderId} className='message-element'>
                                {<img src={eachPersonWhoHasMessaged.messageSender.profilePhotoUrl} id={eachPersonWhoHasMessaged.messageSenderId}alt="" className='profile-photo'/>}
                                {<h2 className='each-name' id={eachPersonWhoHasMessaged.messageSenderId}>{eachPersonWhoHasMessaged.messageSender.firstName}: </h2> }
                                <p className='each-massage-to-user' messageUser={messageUser}  id={eachPersonWhoHasMessaged.messageSenderId} >{eachPersonWhoHasMessaged.content}</p>                            
                                {/* {!eachPersonWhoHasMessaged.read && <MailIcon/> }
                                {eachPersonWhoHasMessaged.read && <DraftsIcon/>} */}
                                {<ReadAndUnread setPersonToMessage={setPersonToMessage}  eachPersonWhoHasMessaged={eachPersonWhoHasMessaged} id={eachPersonWhoHasMessaged.messageSenderId} showChat={showChat} className='read-unread' />}
                                {showChat && <MessageOnClick personToMessage={eachPersonWhoHasMessaged.messageSender} onClick={messageUser} onClose={onClose}/>}
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