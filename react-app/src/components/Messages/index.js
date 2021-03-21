import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sendAMessage, fetchMessages, fetchMessageFeedMessages, setMessageFeedForUser } from '../../store/messages';
import { Modal } from '../../context/ModalContext';
import MessageOnClick from '../MessageOnClick';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import './messages.css';
import MessageUser from '../MessageUser';


const Messages = () => {
    const dispatch = useDispatch();

    const usersMessages = useSelector((state) => state.messages.message);
    
    const [showModal, setShowModal] = useState(false);
    const [personToMessage, setPersonToMessage] = useState(0);
    const [messageText, setMessageText] = useState("");
    const [iconToggle, setIconToggle] = useState(false);

    const onClose= () => {setShowModal(false)};


    const messageUser = async (e) => {   
        await dispatch(fetchMessageFeedMessages(e.target.id))
        .then(() =>  setPersonToMessage(e.target.id))
        setShowModal(true)
    };
    const hiddenToggle = function (){

    }

    const handleMessageSendClick = (e) => {
        e.preventDefault();
        if (messageText) {
            dispatch(sendAMessage(personToMessage, messageText));
            dispatch(fetchMessageFeedMessages(personToMessage));
            setMessageText("");
            setIconToggle(true)
        };
    };
    useEffect(() => {
    }, [dispatch, fetchMessages, messageText])

    return usersMessages.length ?
        usersMessages.map((eachPersonWhoHasMessaged) => {
            return (
                <>
                    <div className='all-users-messages-container'>
                        <div key={eachPersonWhoHasMessaged.createdAt} className='message-element'>
                            {<img src={eachPersonWhoHasMessaged.messageSender.profilePhotoUrl} alt="" className='profile-photo'/>}
                        </div>
                        <div className='message-element'>
                            {<h2>{eachPersonWhoHasMessaged.messageSender.firstName}: </h2> }
                        </div>
                        <div>
                            <div className='message-element'>
                                <h2 onClick={messageUser} id={eachPersonWhoHasMessaged.messageSenderId}>{eachPersonWhoHasMessaged.content}</h2>
                                {showModal && (
                                <Modal onClose={onClose} >
                                    <MessageOnClick personToMessage={personToMessage} onClose={onClose}/> {personToMessage}
                                        <textarea 
                                        className='message-text-area' 
                                        placeholder='Send a message'
                                        value={messageText}
                                        onChange={e => { setMessageText(e.target.value)}}
                                        ></textarea>
                                        <button className='message-send-button' onClick={handleMessageSendClick}>Send Message</button>
                                </Modal>
                                )}
                                <MailIcon hidden={iconToggle}/>
                                <button onClick={messageUser} id={eachPersonWhoHasMessaged.messageSenderId}>
                                    Hello 
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }) :
            <>
                <h1>No messages</h1>
            </> 
};

export default Messages;