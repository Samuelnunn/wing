import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import './messages.css';



const ReadAndUnread = ({eachPersonWhoHasMessaged, iconToggle}) => {
    const dispatch = useDispatch();
    const readChecker = useSelector((state) => state.messages.message);

    const [readCheck, setReadCheck] = useState(eachPersonWhoHasMessaged.read)

    useEffect(() => { 
        setReadCheck(eachPersonWhoHasMessaged.read);
    }, [ iconToggle, eachPersonWhoHasMessaged.read]);
    
    return !iconToggle  && !readCheck?
            <MailIcon className='message-icons'/>
        : <DraftsIcon className='message-icons'/>
};

export default ReadAndUnread;