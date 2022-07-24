import React, { useState, useEffect } from 'react';
import MessageService from "../../services/message.service";
import { useAppContext } from "../../contexts/app-context";
import classes from "./conversation.module.scss";
import { PROFILE_PICTURE } from "../../constants/assets.js";
import { displayMsg } from "../../helpers/toasts.js";

export const Conversation = ({selected}) => {
    const { appState } = useAppContext();
    const [ messages, setMessages ] = useState([]);
    const [ currInput, setCurrInput ] = useState("");

    const sendMessage = async () => {
        let res = await MessageService.send(selected.userId, currInput);
        if( res !== true){
            displayMsg("An error occurred, could not send this message", "error");
        }else{
            setCurrInput("");
        }
    };

    useEffect(()=>{
        // appState.eventSource.addEventListener('new_message', (e) => {
        //      setMessages([...messages, e])
        // })
        return () => {
            setMessages([]);
            setCurrInput("");
            //Remove eventListener
        }
    }, [selected]);

    return (
        <div className={classes.conversation}>

            <div className={classes.header}>
                <h4>{selected.firstName} {selected.lastName}</h4>
            </div>

            <div className={classes.messagesContainer}>

            </div>

            <div className={classes.input}>
                <input
                    value={currInput} 
                    onChange={e=>setCurrInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>

        </div>
    )
};