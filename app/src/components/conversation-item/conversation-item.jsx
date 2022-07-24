import React, { useState, useEffect } from 'react';
import { PROFILE_PICTURE } from "../../constants/assets.js";
import classes from "./conversation-item.module.scss";

export const ConversationItem = ({data, onClick, newMsg, selected}) => {
    return(
        <div onClick={onClick} className={`${classes.conversationItem} ${data.friend.userId === selected ? classes.selected : "" }`}>
            <div className={classes.picture_container}>
                <img src={PROFILE_PICTURE} alt="friend picture"/>
            </div>
            <div className={classes.data}>
                <h4>{data.friend.firstName} {data.friend.lastName}</h4>
                <p>{newMsg ? newMsg : (data.lastMessage ? data.lastMessage.content.slice(0, 20) : "No message")}</p>
            </div>
        </div>
    )
}