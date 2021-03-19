import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sendAMessage, fetchMessages, fetchMessageFeedMessages } from '../../store/messages';
import { Modal } from '../../context/ModalContext';
import MessageOnClick from '../MessageOnClick';
import WholeChatFeed from '../WholeChatFeed'
import './messages.css';


const Messages = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const potentialMatch = useSelector((state) => state.matches);
    const usersMessages = useSelector((state) => state.messages.message);
 
    
    const [showModal, setShowModal] = useState(false);
    const [personToMessage, setPersonToMessage] = useState(0);
    
    const onClose= () => {setShowModal(false)};

    const messageUser = (e) => {   
        console.log(e.target.id);
        setPersonToMessage(e.target.id) 
        // dispatch(fetchMessageFeedMessages(e.target.id))
        setShowModal(true);
    };

    useEffect(() => {
        dispatch(fetchMessageFeedMessages(personToMessage));
    }, [dispatch, personToMessage]);
    


    return usersMessages.length ?
        usersMessages.map((eachPersonWhoHasMessaged) => {
            const userToMessage = eachPersonWhoHasMessaged
            return (
                <>
                    <div className='message-feed-container'>
                    <div key={eachPersonWhoHasMessaged.id} className='message-element'>
                        {<img src={eachPersonWhoHasMessaged.messageSender.profilePhotoUrl} alt="" className='profile-photo'/>}
                    </div>
                    <div className='message-element'>
                        {<h2>{eachPersonWhoHasMessaged.messageSender.firstName}: </h2> }
                    </div>
                    <div>
                        <div className='message-element'>
                            <h2>{eachPersonWhoHasMessaged.content}</h2>
                            <button onClick={messageUser} id={eachPersonWhoHasMessaged.id}>
                                Hello
                            </button>
                        </div>
                    </div>
                    </div>
                    <div>
                    {showModal && (
                        <Modal onClose={onClose} >
                            <MessageOnClick personToMessage={personToMessage} onClose={onClose}/>
                        </Modal>
                    )}
                    </div>
                    <div>
                            <WholeChatFeed eachPersonWhoHasMessaged={eachPersonWhoHasMessaged} onClose={onClose}/>
                    </div>
                </>
            );
        }) :
            <>
                <h1>No messages</h1>
            </>  
};

export default Messages;