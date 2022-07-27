import React, { useEffect, useState } from "react";
import InvitationService from '../../services/invitation.service';
import { FRIEND_STATUS, REPORT_TYPES } from "../../constants/base";
import { useAppContext } from "../../contexts/app-context";
import { displayMsg } from "../../helpers/toasts";

export default function InviteButton({userId, loading}){
    const { appState } = useAppContext();
    const [ friendshipStatus , setFriendshipStatus ] = useState(null);

    const getFriendshipStatus = async () => {
        try{
            let res = await InvitationService.getFriendshipStatus(userId);
            if(res !== false){
                setFriendshipStatus(res.message);
            }
        }catch(e){
            console.error(e);
        }
    };

    const sendInvitation = async e => {
        e.preventDefault();
        e.stopPropagation();

        try{
            let res = await InvitationService.send(userId);
            if(res !== true) throw new Error();

            setFriendshipStatus(FRIEND_STATUS.CREATED);
            displayMsg("Invitation sent");
        }catch(e){
            displayMsg("An error occurred, could not accept this invitation.", "error");
        }
        
    };

    const removeFriend = async e => {
        e.preventDefault();
        e.stopPropagation();
        let res = await InvitationService.removeFriend(userId);
        if(res !== true){
            displayMsg("An error occurred, could not remove this user from friends.", "error");
        }else{
            displayMsg("User removed from friends");
            setFriendshipStatus(null);
        }
    }
    
    useEffect(()=>{
        console.log(userId)
        if(!loading && userId){
            getFriendshipStatus();
        }
    }, [loading, userId]);

    if( appState.auth.id == userId ) return null;
    
    switch(friendshipStatus){
        case FRIEND_STATUS.CREATED:
            return <button className="btn">Request sent</button>

        case FRIEND_STATUS.AWAITING:
            return <button className="btn" >Awaiting your answer</button>

        case FRIEND_STATUS.ACCEPTED:
            return <button className="btn red" onClick={removeFriend}>Remove from friends</button>
        
        default:
            return <button className="btn green" onClick={sendInvitation}>Add to friend</button>
    }

}