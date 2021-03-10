import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {matchUsers, getPotentialMatches} from '../../store/matches'
import './Match.css'


function MatchCard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const potentialMatch = useSelector((state) => state.matches);
    const neededUser = useSelector((state) => Object.values(state.matches));
    const [seenUser, setSeenUser] = useState([]);

    const arrayOfIds= [];
    const myRandomIdHelper = potentialMatch.map(eachid => {
        arrayOfIds.push(eachid.id);
    })
    const idRanxomizer = arrayOfIds[Math.floor(Math.random() * arrayOfIds.length)];
    const idFilter = potentialMatch.filter((oneMatch) => oneMatch.id == idRanxomizer);

    const matchUser = async (e) => {
        console.log(e.target.id)
        dispatch(matchUsers(e.target.id))
        setSeenUser(e.target.id)
    }
    console.log(seenUser)
    if (potentialMatch ) {
        return ( 
            <>
                {potentialMatch && 
                    <>
                    {idFilter.map((singlePerson) => {
                        if(singlePerson.id !== seenUser) {
                        return(
                         <>
                                <div className='whole-container' key={singlePerson.first_name}/>
                                <div className='match-card-top'>
                                    <PersonOutlineIcon />
                                    <h1 className='match-card'>{singlePerson.first_name}</h1>
                                    <img src={singlePerson.profile_photo_url} />
                                    <ChatBubbleIcon />
                                </div>
                                {}
                                <button onClick={matchUser}
                                id={singlePerson.id}
                                > Match</button>
                                <div>
                                    <p>
                                        yes
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        no
                                    </p>
                                </div>
                        </>
                        )
                        }
                        })}
                    </>
                }
            </>)
    } else {
        return (
            <>
                <h1>No available matches</h1>
            </>
        )
    }
}

export default MatchCard