import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sendAMessage, fetchMessages, fetchMessageFeedMessages, setMessageFeedForUser } from '../../store/messages';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import './messages.css';



const ReadAndUnread = ({eachPersonWhoHasMessaged, showChat}) => {
    const dispatch = useDispatch();
    const readChecker = useSelector((state) => state.messages.message);

    const [readCheck, setReadCheck] = useState(eachPersonWhoHasMessaged.read)
   

    useEffect(() => {
            dispatch(fetchMessages())

    }, [])

    
    useEffect(() => { 
        setReadCheck(eachPersonWhoHasMessaged.read);
    }, [ dispatch, showChat, eachPersonWhoHasMessaged.read, readCheck]);
    
    return !readCheck || showChat?
            <MailIcon className='message-icons'  id={eachPersonWhoHasMessaged.messageSenderId}/>
        : <DraftsIcon className='message-icons'id={eachPersonWhoHasMessaged.messageSenderId}/>
};

export default ReadAndUnread;