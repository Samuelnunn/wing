import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sendAMessage, fetchMessages, fetchMessageFeedMessages, setMessageFeedForUser } from '../../store/messages';
import { Modal } from '../../context/ModalContext';
import MessageOnClick from '../MessageOnClick';
import ReadAndUnread from './ReadAndUnread';
import './messages.css';


const Messages = () => {
    const dispatch = useDispatch();
    
    const usersMessages = useSelector((state) => state.messages.message);

    const [showModal, setShowModal] = useState(false);
    const [personToMessage, setPersonToMessage] = useState(0);
    const [messageText, setMessageText] = useState("");
    const [iconToggle, setIconToggle] = useState();

    const onClose= () => {setShowModal(false)};

    const messageUser = async (e) => {   
        usersMessages.filter((eachUser) => {
            if(e.target.id == eachUser.messageSenderId){
                setIconToggle(eachUser.read);
            }
        });
        await dispatch(fetchMessageFeedMessages(e.target.id))
        .then(() =>  setPersonToMessage(e.target.id));
        setShowModal(true);
    };

    const handleMessageSendClick = (e) => {
        e.preventDefault();
        if (messageText) {
            dispatch(sendAMessage(personToMessage, messageText));
            dispatch(fetchMessageFeedMessages(personToMessage));
            setMessageText("")
            // onClose()
        };
    };

    useEffect(() => {
    }, [dispatch, fetchMessages, messageText]);

    useEffect(() => {
        usersMessages.filter((eachUser) => {
            setIconToggle(eachUser.read) 
        });
    }, [dispatch, iconToggle]);

    return usersMessages.length ?
        <div className='all-users-messages-container'>    
            {usersMessages.map((eachPersonWhoHasMessaged) => {
                    return (
                        <div className='each-message'  onClick={messageUser} id={eachPersonWhoHasMessaged.messageSenderId}>
                            <div key={eachPersonWhoHasMessaged.createdAt} className='message-element'>
                                {<img src={eachPersonWhoHasMessaged.messageSender.profilePhotoUrl} alt="" className='profile-photo'/>}
                                {<h2 className='each-name'>{eachPersonWhoHasMessaged.messageSender.firstName}: </h2> }
                                <p className='each-massage-to-user'  id={eachPersonWhoHasMessaged.messageSenderId} >{eachPersonWhoHasMessaged.content}</p>
                                    {showModal && (
                                    <Modal onClose={onClose} >
                                        <MessageOnClick personToMessage={personToMessage} onClose={onClose}/>
                                        <div className='message-input-button'>
                                            <div className='message-input-container'>
                                                <textarea 
                                                    className='message-text-area' 
                                                    placeholder='Send a message'
                                                    value={messageText}
                                                    onChange={e => { setMessageText(e.target.value)}}
                                                ></textarea>
                                            </div>
                                            <button className='message-send-button' onClick={handleMessageSendClick}>Send Message</button>
                                        </div>
                                    </Modal>
                                    )}
                                    <ReadAndUnread iconToggle={iconToggle} eachPersonWhoHasMessaged={eachPersonWhoHasMessaged}/>
                            </div>
                        </div>
                    );
            })} 
        </div> :
                <div className='no-message-container'>
                    <h1 className='no-message-text'>No messages</h1>
                </div> 
};

export default Messages;