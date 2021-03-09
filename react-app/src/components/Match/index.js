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
    const [seenUser, setSeenUser] = useState([]);

    if (potentialMatch ) {
    let ammountOfPotentialMatches = potentialMatch.length;
    // const { potentialUserRandomizer } = potentialMatch[Math.floor(Math.random() * potentialMatch.length)];
    // if (potentialUserRandomizer){
    // // console.log(potentialUserRandomizer.map(eachVal => {
    // //     console.log(eachVal)
    // // }))
    // }
    const userToMatch = potentialMatch[ammountOfPotentialMatches - 1]
    console.log(userToMatch)


    return ( 
        <>
            {potentialMatch && 
                <>
                {potentialMatch.map((eachValue) => {
                    return(
                     <>
                            <div className='whole-container' />
                            <div className='match-card-top'>
                                <PersonOutlineIcon />
                                <h1 className='match-card'>{potentialMatch.first_name}</h1>
                                <img src={potentialMatch.profile_photo_url} />
                                <ChatBubbleIcon />
                            </div>
                            <button onClick={seenUser.push(potentialMatch)}> weeeee </button>
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