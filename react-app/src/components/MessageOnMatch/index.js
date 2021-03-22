import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAMessage } from '../../store/messages';
import './MessageOnMatch.css'

// const MessageOnMatch = ({singlePerson, onClose}) => {
//     const dispatch = useDispatch();

//     const [messageText, setMessageText] = useState("");
    
//     const handleMessageSendClick = (e) => {
//         e.preventDefault();
//         if (messageText) {
//             dispatch(sendAMessage(singlePerson.id, messageText));
//             setMessageText("");
//             onClose()
//         };
//     };
//     console.log(singlePerson)
//     return (
//         <>
//             <div className='add-message-field'>
//                 <h1>It's A Match!</h1>
//                 {<img src={singlePerson.profilePhotoUrl} alt="" className='profile-photo'/>}

//                 <textarea 
//                     className='message-text-area' 
//                     placeholder='Send a message'
//                     value={messageText}
//                     onChange={e => { setMessageText(e.target.value)}}
//                 ></textarea>
//                 <button className='message-send-button' onClick={handleMessageSendClick}>Send Message</button>
//             </div>
//         </>
//     );
// };
const MessageOnMatch = () => {
    return (
        <div className='message-on-match'>
            <h1> You've matched your person!</h1>  
        </div>
    );
};

export default MessageOnMatch;