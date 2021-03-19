import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Modal } from '../../context/ModalContext';
import MessageOnMatch from '../MessageOnMatch';
import { matchUsers, userToBeSeen, getSeenUsers } from '../../store/matches';

import './Match.css';


function MatchCard() {
    const dispatch = useDispatch();
    
    const potentialMatch = useSelector((state) => state.matches.matches);
    const usersWhoLikeCurrentUser = useSelector((state) => state.matches.otherUserMatched);
    const matchedUser = useSelector((state) => state.matched.matchedUsers);
    const seenUsersFromStore = useSelector((state) => state.matches.seenUsers);
    // const seenUsersFromStored = useSelector((state) => state.matches.seenUsers.seenUserIds);
    
    
    const [showModal, setShowModal] = useState(false);
    const [seenUser, setSeenUser] = useState(0);


    const onClose= () => {setShowModal(false)};

    const arrayOfIds= [];
    const arrayOfMatchedIds = [];

    const usersArrayToMap = Object.values(matchedUser);
    const usersSeenToMap = Object.values(seenUsersFromStore);

    const flattenNestedArray = usersSeenToMap.flat()


    potentialMatch.map((eachId) => {arrayOfIds.push(eachId.id)});
    usersArrayToMap.map((eachId) => {arrayOfMatchedIds.push(eachId.id)});
    
    
    const removedDuplicates = arrayOfIds.filter(values => !flattenNestedArray.includes(values));
    const randomNum = Math.floor(Math.random() * removedDuplicates.length)
    

    const randomizerFilter = potentialMatch.filter((oneMatch) => oneMatch.id == removedDuplicates[randomNum]); 

    const matchUser = (e) => {

        dispatch(matchUsers(e.target.id));
        setSeenUser(e.target.id);
        dispatch(userToBeSeen(e.target.id))
        .then(() => {dispatch(getSeenUsers())})
        usersWhoLikeCurrentUser.filter((eachId) => {
            if (eachId.id == e.target.id) {
                setShowModal(true);
            }
        });
    };
    
    const passUser = (e) => {
        setSeenUser(e.target.id);
        dispatch(userToBeSeen(e.target.id))
        .then(() => {dispatch(getSeenUsers())})
    };
    

   
      
    return randomizerFilter.length ?
        randomizerFilter.map((singlePerson) => {
            if(singlePerson.id) {
                return(
                    <div key={singlePerson.last_name}>
                        <div className='whole-container' key={singlePerson.first_name}>
                            <div className='match-card-top'>
                                <PersonOutlineIcon />
                                <h1 className='match-card'>{singlePerson.firstName}</h1>
                                <img src={singlePerson.profilePhotoUrl} className='match-card-pic'/>
                                <h2>{singlePerson.bio}</h2>
                                <ChatBubbleIcon />
                            </div>
                            <button onClick={matchUser}
                            id={singlePerson.id}
                            > Match</button>
                            <button onClick={passUser}
                            id={singlePerson.id}
                            >Pass</button>
                            <div>
                                {showModal && (
                                    <Modal onClose={onClose}>
                                        <MessageOnMatch singlePerson={singlePerson} onClose={onClose}/>
                                    </Modal>
                                )}
                            </div>
                        </div>   
                    </div>
                );
            } }
        ) :
        <h1>No available matches</h1>
}

export default MatchCard