import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from '../../store/messages';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import './messages.css';



const ReadAndUnread = ({eachPersonWhoHasMessaged, showChat, personToMessage}) => {
    const dispatch = useDispatch();

    const [readCheck, setReadCheck] = useState(eachPersonWhoHasMessaged.read);
   
    useEffect(() => {
            dispatch(fetchMessages());
    }, [dispatch, showChat, personToMessage]);
    
    useEffect(() => { 
        setReadCheck(eachPersonWhoHasMessaged.read);
    }, [ dispatch, eachPersonWhoHasMessaged, readCheck]);
    
    return !readCheck?
            <MailIcon className='message-icons'  id={eachPersonWhoHasMessaged.messageSenderId}/>
        : <DraftsIcon className='message-icons'id={eachPersonWhoHasMessaged.messageSenderId}/>
};

export default ReadAndUnread;