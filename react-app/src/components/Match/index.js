import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderTwoToneIcon from '@material-ui/icons/FavoriteBorderTwoTone';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
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
    // const randomNum = Math.floor(Math.random() * removedDuplicates.length);
    

    const randomizerFilter = potentialMatch.filter((oneMatch) => oneMatch.id == removedDuplicates[0]); 

    const matchUser = async (e) => {
        console.log(e.target.id) 
        if(e.target.id){
        usersWhoLikeCurrentUser.filter((eachId) => {
            if (eachId.id == e.target.id) {
                setShowModal(true);
                // onClose()
            }
        });
        dispatch(matchUsers(e.target.id));
        dispatch(userToBeSeen(e.target.id))
        .then(() => {dispatch(getSeenUsers())});
        setSeenUser(e.target.id);
        } else{
            onClose()
        }
    };

    const passUser = (e) => {
        console.log(e.target.id)
        if(e.target.id){
        setSeenUser(e.target.id);
        dispatch(userToBeSeen(e.target.id))
        .then(() => {dispatch(getSeenUsers())});
        } else {
            onClose()
        }
    };
    

      
    return randomizerFilter.length ?
        randomizerFilter.map((singlePerson) => {
            if(singlePerson.id) {
                return(
                    <div key={singlePerson.last_name} className='whole-match-container'>
                    <div className='elements-in-container' key={singlePerson.first_name}>
                        <img src={singlePerson.profilePhotoUrl} className='match-card-pic'/>
                        <h1 className='match-card-name-age'>{singlePerson.firstName}, {singlePerson.age}</h1>
                        <p className='bio'>{singlePerson.bio}</p>    
                        <FavoriteBorderTwoToneIcon className='match-button'onClick={matchUser}
                            id={singlePerson.id} />
                        <ClearTwoToneIcon className='pass-button' id={singlePerson.id} onClick={passUser}/>
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
            <div className='no-match'>
                <h1 className='no-match-text'>No available matches</h1>
            </div>
}

export default MatchCard