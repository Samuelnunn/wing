import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Modal } from '../../context/ModalContext';
import MessageOnMatch from '../MessageOnMatch';
import { matchUsers } from '../../store/matches';
import './Match.css';


function MatchCard() {
    const dispatch = useDispatch();
    
    const user = useSelector((state) => state.session.user);
    const potentialMatch = useSelector((state) => state.matches.matches);
    const matchedUser = useSelector((state) => state.matched.matchedUser);
    console.log(matchedUser)
    const [showModal, setShowModal] = useState(false);
    const [seenUser, setSeenUser] = useState([]);
  
    const onClose= () => {setShowModal(false)};

    const arrayOfIds= [];
    const arrayOfMatchedIds = [];
    
    potentialMatch.map((eachId) => {arrayOfIds.push(eachId.id)});
    matchedUser.map((eachId) => {arrayOfMatchedIds.push(eachId.id)});
    
    const idRandomizer = arrayOfIds[Math.floor(Math.random() * arrayOfIds.length)];
    const idFilter = potentialMatch.filter((oneMatch) => oneMatch.id == idRandomizer);

    const matchUser = async (e) => {
        dispatch(matchUsers(e.target.id));
        setSeenUser(e.target.id);
        arrayOfMatchedIds.filter((eachId) => {
            console.log(e.target.id);
            console.log(eachId);
            if (eachId == e.target.id) {
                console.log('Match!!!');
                setShowModal(true);
            }
        });
    };
    
    function refreshPage() {
        window.location.reload(false);
      }
      

    if (potentialMatch) {
        return ( 
            <>
                {potentialMatch && 
                    <>
                        {idFilter.map((singlePerson) => {
                            if(singlePerson.id !== seenUser) {
                                return(
                                    <div key={singlePerson.last_name}>
                                        <div className='whole-container' key={singlePerson.first_name}>
                                            <div className='match-card-top'>
                                                <PersonOutlineIcon />
                                                <h1 className='match-card'>{singlePerson.first_name}</h1>
                                                <img src={singlePerson.profile_photo_url} className='match-card-pic'/>
                                                <h2>{singlePerson.bio}</h2>
                                                <ChatBubbleIcon />
                                            </div>
                                            <button onClick={matchUser}
                                            id={singlePerson.id}
                                            > Match</button>
                                            <button onClick={refreshPage}
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
                                )
                            }
                        })}
                    </>
                }
            </>
        )
    } else {
        return (
            <>
                <h1>No available matches</h1>
            </>
        )
    }
}

export default MatchCard