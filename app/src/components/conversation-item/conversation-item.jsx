import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'
import { PROFILE_PICTURE } from "../../constants/assets.js";
import classes from "./conversation-item.module.scss";

export const ConversationItem = ({data, onClick, newMsg, selected}) => {
    
    const formatDate = givenDate => format(new Date(givenDate), 'HH:mm dd/MM/yyyy');

    const msgContent = newMsg ? newMsg.content.slice(0, 20)+"..." : (data.lastMessage ? data.lastMessage.content.slice(0, 20)+"..." : "No message");
    const msgDate = newMsg ? formatDate(newMsg.createdAt) : (data.lastMessage ? formatDate(data.lastMessage.createdAt) : "Unknown");
    
    return(
        <div onClick={onClick} className={`${classes.conversationItem} ${data.friend.userId === selected ? classes.selected : "" }`}>
            <div className={classes.picture_container}>
                <img src={PROFILE_PICTURE} alt="friend picture"/>
            </div>
            <div className={classes.data}>
                <h4>{data.friend.firstName} {data.friend.lastName}</h4>
                <div className={classes.msgData}>
                    <p className={classes.content}>{msgContent}</p>
                    <p className={classes.date}>{msgDate}</p>
                </div>
            </div>
        </div>
    )
}