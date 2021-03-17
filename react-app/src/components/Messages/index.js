import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sendAMessage, fetchMessages } from '../../store/messages';
import { Modal } from '../../context/ModalContext';
import MessageOnClick from '../MessageOnClick';
import WholeChatFeed from '../WholeChatFeed'
import './messages.css';


const Messages = ({loaded}) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const potentialMatch = useSelector((state) => state.matches);
    const usersMessages = useSelector((state) => state.messages.message);
    console.log(usersMessages)
    
    const [showModal, setShowModal] = useState(false);
    const [personToMessage, setPersonToMessage] = useState({});
    const onClose= () => {setShowModal(false)};

    const messageUser = (e) => {    
        const myFilter = usersMessages.filter((eachUser) => {
            if (eachUser.messageSender.id == e.target.id) {
                setPersonToMessage(eachUser)
            } 
        })
        setShowModal(true);
    };


    return usersMessages.length ?
        usersMessages.map(eachPersonWhoHasMessaged => {
            const myFilter = usersMessages.filter((eachUser) => {
                if (eachUser.messageSenderId == eachPersonWhoHasMessaged.messageSenderId) {
                return eachUser;
            }});
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
                            {/* <button onClick={messageUser} id={eachPersonWhoHasMessaged.id}>
                                Hello
                            </button> */}
                        </div>
                    </div>
                    </div>
                    <div>
                    {/* {showModal && (
                        <Modal onClose={onClose}>
                            <MessageOnClick eachPersonWhoHasMessaged={eachPersonWhoHasMessaged} onClose={onClose}/>
                        </Modal>
                    )}
                    </div> */}
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