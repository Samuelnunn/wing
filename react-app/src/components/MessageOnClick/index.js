import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './messages-on-click.css';

const MessageOnClick = () => {
    const divRef = useRef(null);
    
    const personToMessage = useSelector((state) => state.messages.messagefeed)
    
    useEffect(() => {
        if(divRef !== null)
        {divRef.current.scrollIntoView({ block: "end", behavior: 'auto' });}
    }, [divRef, personToMessage]);

    return personToMessage ?
        <div className='message-feed-container'>
            <div className='scroll-controll'  ref={divRef} >  
        {personToMessage.map((eachMessage) => {
            return( 
               <div ref={divRef} key={eachMessage.id}>
                    <div className='each-user-message'>
                        <div className='profile-photo-element'>
                            <img src={eachMessage.messageSender.profilePhotoUrl} alt="" className='profile-photo'/>
                        </div>
                        <div className='user-name'>
                            <h2>{eachMessage.messageSender.firstName}: </h2> 
                        </div>
                        <div className='message-text-element'>
                            {<p>{eachMessage.content}</p> }
                        </div>
                    </div>
                </div>
        )})}
            </div> 
        </div>
            :
            <>
                <h1>Trouble loading! Please refresh the page</h1>
            </>
};

export default MessageOnClick;