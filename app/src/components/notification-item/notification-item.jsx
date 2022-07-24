import React from 'react';
import classes from "./notification-item.module.scss";
import {NOTIFICATION_TYPES, SUB_FRIENDSHIP_TYPES} from '../../constants/base.js';
import { PROFILE_PICTURE } from "../../constants/assets.js";
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import InvitationService from '../../services/invitation.service';
import { displayMsg } from "../../helpers/toasts.js";

const formatDate = givenDate => format(new Date(givenDate), 'HH:mm dd/MM/yy');

const FriendNotification = ({data}) => {
    const profileUrl = `/user/${data.senderId}`;

    const acceptInvitation = async () => {
        let res = await InvitationService.acceptInvitation(data.senderId);
        if(res){
            displayMsg("Invitation accepted!", "success");
        }else{
            displayMsg("An error occurred, could not accept this invitation.", "error");
        }
    };

    const refuseInvitation = async () => {
        let res = await InvitationService.refuseInvitation(data.senderId);
        if(res){
            displayMsg("Invitation refused", "success");
        }else{
            displayMsg("An error occurred, could not refuse this invitation.", "error");
        }
    };

    const renderContent = () => {
        
        switch(data.subType){
            case SUB_FRIENDSHIP_TYPES.ACCEPTED:
                return <p><Link to={profileUrl}>{data.senderId}</Link> has accepted your friend invitation!</p>;
            case SUB_FRIENDSHIP_TYPES.RECEIVED:
                return (
                    <>
                        <p><Link to={profileUrl}>{data.senderId}</Link> has sent you a friend invitation!</p>
                        <div className={classes.resBtns}>
                            <button onClick={acceptInvitation} className={"btn green"}>Accept</button>
                            <button onClick={refuseInvitation} className={"btn red"}>Refuse</button>
                        </div>
                    </>
                );
        }
    }
    
    return(
        <div className={classes.notificationContent}>
            <Link to={profileUrl} className={classes.picture}>
                <img src={PROFILE_PICTURE} alt="user profile picture"/>
            </Link>
            <div className={classes.content}>
                {renderContent()}
                <p className={classes.date}>{formatDate(data.createdAt)}</p>
            </div>
        </div>
    )
}


export default function NotificationItem({data}){
    switch(data.type){
        case NOTIFICATION_TYPES.FRIENDSHIP:
            return <FriendNotification data={data}/>

        // case NOTIFICATION_TYPES.MESSAGE:
        //     return <MessageNotitication data={data}/>

        default:
            return null;
    }

}