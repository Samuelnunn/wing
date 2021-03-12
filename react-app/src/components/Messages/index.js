import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sendAMessage, fetchMessages } from '../../store/messages';
import { Modal } from '../../context/ModalContext';
import MessageOnClick from '../MessageOnClick';
import './messages.css';


const Messages = ({loaded}) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const potentialMatch = useSelector((state) => state.matches);
    const usersMessages = useSelector((state) => state.messages);
    
    const [messageText, setMessageText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [personToMessage, setPersonToMessage] = useState({})
    const onClose= () => {setShowModal(false)};

    const messageUser = async (e) => {    
        // console.log(e.target.id)
        const myFilter = usersMessages.filter((eachUser) => {
            if (eachUser.messageSender.id == e.target.id) {
                console.log(eachUser.messageSender.id)
                console.log(e.target.id)
                setPersonToMessage(eachUser)
            } 
        })
        console.log(myFilter)
        setShowModal(true);
    };
    const neededUser = usersMessages.map((eachUser) => eachUser)

    return (
        <>
            {loaded ?
                <>
                    { usersMessages && usersMessages.map(eachPersonWhoHasMessaged => {
                        return (
                            <>
                                <div key={eachPersonWhoHasMessaged.id}>
                                    {<img src={eachPersonWhoHasMessaged.messageSender.profilePhotoUrl} alt="" className='profile-photo'/>}
                                </div>
                                <div>
                                    {<p>{eachPersonWhoHasMessaged.messageSender.firstName}</p> }
                                </div>
                                <div>
                                    <div>
                                        <p>{eachPersonWhoHasMessaged.content}</p>
                                        <button onClick={messageUser} id={eachPersonWhoHasMessaged.id}>
                                            Hello
                                        </button>
                                    </div>
                                </div>
                                <div>
                                {/* {showModal && (
                                    <Modal onClose={onClose}> */}
                                        <MessageOnClick personToMessage={eachPersonWhoHasMessaged} onClose={onClose}/>
                                    {/* </Modal> */}
                                )};
                                </div>
                            </>
                        )
                    })}
                </>
                :
                <>
                    <h1>No messages</h1>
                </>
            }
        </>
    )

};

export default Messages;